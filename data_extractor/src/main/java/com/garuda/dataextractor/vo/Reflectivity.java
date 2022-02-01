package com.garuda.dataextractor.vo;

import com.garuda.dataextractor.utils.ExtractVariable;

import ucar.ma2.Array;
import ucar.nc2.dataset.NetcdfDataset;

public class Reflectivity {

	private String variable = "Reflectivity";
	private String spec = "0:0, :, :";

	public String stationName;
	public String stationID;
	public String stationLatitute;
	public String stationLongitude;

	public Distance distance;
	public Azimuth azimuth;
	public float[][] reflexivity;

	/**
	 * Constructor for setting Reflextivity properties
	 * 
	 * @param dataset NetcdfDataset to extract data from
	 */
	public Reflectivity(NetcdfDataset dataset) {
		try {
			Array rv = ExtractVariable.getVariableData(dataset, variable, spec);
			this.stationLatitute = dataset.findGlobalAttribute("StationLatitude").getValue(0).toString();
			this.stationLongitude = dataset.findGlobalAttribute("StationLongitude").getValue(0).toString();
			this.stationName = dataset.findGlobalAttribute("StationName").getValue(0).toString();
			this.stationID = dataset.findGlobalAttribute("Station").getValue(0).toString();
			this.reflexivity = ((float[][]) rv.reduce().copyToNDJavaArray());
			this.distance = new Distance(dataset);
			this.azimuth = new Azimuth(dataset);
		} catch (Exception error) {
			System.out.println(error.getMessage());
		}

	}
}
