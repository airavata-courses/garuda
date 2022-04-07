import sys
import json
import urllib3
import certifi
import requests
from time import sleep
from http.cookiejar import CookieJar
import urllib.request
from urllib.parse import urlencode


# Create a urllib PoolManager instance to make requests.
http = urllib3.PoolManager(cert_reqs='CERT_REQUIRED', ca_certs=certifi.where())
# Set the URL for the GES DISC subset service endpoint
url = 'https://disc.gsfc.nasa.gov/service/subset/jsonwsp'


# This method POSTs formatted JSON WSP requests to the GES DISC endpoint URL
# It is created for convenience since this task will be repeated more than once
def get_http_data(request):
    hdrs = {'Content-Type': 'application/json',
            'Accept': 'application/json'}
    data = json.dumps(request)
    r = http.request('POST', url, body=data, headers=hdrs)
    response = json.loads(r.data)
    # Check for errors
    if response['type'] == 'jsonwsp/fault':
        print('API Error: faulty %s request' % response['methodname'])
        sys.exit(1)
    return response


def download_nasa_data(variable="T", minlon=-180, maxlon=180, minlat=-90, maxlat=-45, begTime='2021-01-01', endTime='2021-01-05', begHour='00:00', endHour='00:00'):

    # Define the parameters for the data subset
    product = 'M2I3NPASM_V5.12.4'
    # variable for extracting data
    varNames = [variable]

    # Subset only the mandatory pressure levels (units are hPa)
    # 1000 925 850 700 500 400 300 250 200 150 100 70 50 30 20 10 7 5 3 2 1
    dimName = 'lev'
    dimVals = [1]
    # dimVals = [1,4,7,13,17,19,21,22,23,24,25,26,27,29,30,31,32,33,35,36,37]
    # Construct the list of dimension name:value pairs to specify the desired subset
    dimSlice = []
    for i in range(len(dimVals)):
        dimSlice.append({'dimensionId': dimName, 'dimensionValue': dimVals[i]})

    # Construct JSON WSP request for API method: subset
    subset_request = {
        'methodname': 'subset',
        'type': 'jsonwsp/request',
        'version': '1.0',
        'args': {
            'role': 'subset',
            'start': begTime,
            'end': endTime,
            'box': [minlon, minlat, maxlon, maxlat],
            'crop': True,
            'data': [{'datasetId': product,
                      'variable': varNames[0],
                      'slice': dimSlice
                      }]
        }
    }

    # Submit the subset request to the GES DISC Server
    response = get_http_data(subset_request)
    # Report the JobID and initial status
    myJobId = response['result']['jobId']
    print('Job ID: '+myJobId)
    print('Job status: '+response['result']['Status'])

    # Construct JSON WSP request for API method: GetStatus
    status_request = {
        'methodname': 'GetStatus',
        'version': '1.0',
        'type': 'jsonwsp/request',
        'args': {'jobId': myJobId}
    }

    # Check on the job status after a brief nap
    while response['result']['Status'] in ['Accepted', 'Running']:
        sleep(5)
        response = get_http_data(status_request)
        status = response['result']['Status']
        percent = response['result']['PercentCompleted']
        print('Job status: %s (%d%c complete)' % (status, percent, '%'))
    if response['result']['Status'] == 'Succeeded':
        print('Job Finished:  %s' % response['result']['message'])
    else:
        print('Job Failed: %s' % response['fault']['code'])
        sys.exit(1)

    # Construct JSON WSP request for API method: GetResult
    batchsize = 20
    results_request = {
        'methodname': 'GetResult',
        'version': '1.0',
        'type': 'jsonwsp/request',
        'args': {
            'jobId': myJobId,
            'count': batchsize,
            'startIndex': 0
        }
    }

    # Retrieve the results in JSON in multiple batches
    # Initialize variables, then submit the first GetResults request
    # Add the results from this batch to the list and increment the count
    results = []
    count = 0
    response = get_http_data(results_request)
    count = count + response['result']['itemsPerPage']
    results.extend(response['result']['items'])

    # Increment the startIndex and keep asking for more results until we have them all
    total = response['result']['totalResults']
    while count < total:
        results_request['args']['startIndex'] += batchsize
        response = get_http_data(results_request)
        count = count + response['result']['itemsPerPage']
        results.extend(response['result']['items'])

    # Check on the bookkeeping
    print('Retrieved %d out of %d expected items' % (len(results), total))

    # Sort the results into documents and URLs

    docs = []
    urls = []
    for item in results:
        try:
            if item['start'] and item['end']:
                urls.append(item)
        except:
            docs.append(item)
    # Print out the documentation links, but do not download them
    # print('\nDocumentation:')
    # for item in docs : print(item['label']+': '+item['link'])

    downloaded_files = []

    # Use the requests library to submit the HTTP_Services URLs and write out the results.
    print('\nHTTP_services output:')
    for item in urls:
        try:
            URL = item['link']
            result = requests.get(URL)
            result.raise_for_status()
            outfn = item['label']
            f = open('./files/' + outfn, 'wb')
            f.write(result.content)
            f.close()
            print(outfn, " is downloaded ")
            downloaded_files.append(item['label'])
        except Exception as ex:
            print(str(ex))
            print('Error! Status code is %d for this URL:\n%s' %
                  (result.status.code, URL))
            print(
                'Help for downloading data is at https://disc.gsfc.nasa.gov/data-access')

    print('Downloading is done and find the downloaded files in your current working directory')

    return downloaded_files
