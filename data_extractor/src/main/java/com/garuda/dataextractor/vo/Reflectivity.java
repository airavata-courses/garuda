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

	public double[][] latitude;
	public double[][] longitude;

	/**
	 * Constructor for setting Reflectivity properties
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

			// TODO: change scale factor of reflectivity

			// setting latitude and longitude of points from distance and azimuth
			setLatLng();

		} catch (Exception error) {
			System.out.println(error.getMessage());
		}

	}

	/**
	 * Function set latitude and longitude
	 */
	private void setLatLng() {
		this.latitude = new double[this.azimuth.azimuth.length][this.distance.distance.length];
		this.longitude = new double[this.azimuth.azimuth.length][this.distance.distance.length];
		double lat = Double.parseDouble(this.stationLatitute);
		double lng = Double.parseDouble(this.stationLongitude);

		for (int i = 0; i < this.azimuth.azimuth.length; i++) {
			for (int j = 0; j < this.distance.distance.length; j++) {
				double[] latlng = findLatLng(lat, lng, distance.distance[j], azimuth.azimuth[i]);
				this.latitude[i][j] = latlng[0];
				this.longitude[i][j] = latlng[1];
			}
		}

	}

	/**
	 * Function to find latitude and longitude from a point with distance and angle
	 * @param latitude - latitude of station
	 * @param longitude - longitude of station
	 * @param distanceInMetres - distance in meter from station
	 * @param bearing - angle 
	 * @return
	 */
	private double[] findLatLng(double latitude, double longitude, float distanceInMetres, float bearing) {
		double brngRad = Math.toRadians(bearing);
		double latRad = Math.toRadians(latitude);
		double lonRad = Math.toRadians(longitude);
		int earthRadiusInMetres = 6371000;
		double distFrac = distanceInMetres / earthRadiusInMetres;
		double latitudeResult = Math.asin(
				Math.sin(latRad) * Math.cos(distFrac) + Math.cos(latRad) * Math.sin(distFrac) * Math.cos(brngRad));
		double a = Math.atan2(Math.sin(brngRad) * Math.sin(distFrac) * Math.cos(latRad),
				Math.cos(distFrac) - Math.sin(latRad) * Math.sin(latitudeResult));
		double longitudeResult = (lonRad + a + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
		return new double[] { Math.toDegrees(latitudeResult), Math.toDegrees(longitudeResult) };
	}
}
