package com.garuda.dataextractor.extactor;

import java.util.ArrayList;
import java.util.List;

import com.garuda.dataextractor.vo.Reflectivity;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import ucar.nc2.dataset.NetcdfDataset;

public class ExtractData {

	private String getReflextivity(NetcdfDataset ncd) {
		Reflectivity rf = new Reflectivity(ncd);
		Gson gson = new GsonBuilder().serializeSpecialFloatingPointValues().create();
		String json = gson.toJson(rf);
		return json;
	}

	/**
	 * Function to Extract data from .nc files
	 * 
	 * @param netCDF_FilesList - List of files to fetch data from
	 * @param variable         - variable to fetch from dataset
	 * @return List of JSON extracted data from each data set
	 */
	public static List<String> extractData(List<String> netCDF_FilesList, String variable) {
		// TODO: extract dependent variables -> reflextiviy -> distance and azimuth
		List<String> extracted_data = new ArrayList<String>();
		ExtractData ed = new ExtractData();
		for (String files : netCDF_FilesList) {
			try {
				NetcdfDataset ncd = NetcdfDataset.openDataset(files);
				if (variable.equals("Reflectivity")) {
					extracted_data.add(ed.getReflextivity(ncd));
				}
				ncd.close();
			} catch (Exception err) {
				// ignore exception for now
			}
		}
		return extracted_data;
	}

}
