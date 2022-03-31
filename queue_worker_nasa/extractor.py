import numpy as np
from netCDF4 import Dataset

# function to extract data
def extract_data(urls, property):
    data = []
    for url in urls:
        nc = Dataset('./files/' + url,'r')
        object = {}
        object['lat'] = nc.variables['lat'][:].tolist()
        object['lng'] = nc.variables['lon'][:].tolist()
        if(property == 'T'):
            object[property] = nc.variables[property][0][0].tolist()
        data.append(object)
    return data