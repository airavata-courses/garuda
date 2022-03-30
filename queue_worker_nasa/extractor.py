import numpy as np
from netCDF4 import Dataset

def extract_data(urls):
    data = []
    for url in urls:
        nc = Dataset('./files/' + url,'r')
        object = {}
        object['temperature'] = nc.variables['T'][0][0].tolist()
        object['lat'] = nc.variables['lat'][:].tolist()
        object['lng'] = nc.variables['lon'][:].tolist()
        data.append(object)
    return data