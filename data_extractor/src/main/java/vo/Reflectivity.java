package vo;

import ucar.ma2.Array;
import ucar.nc2.dataset.NetcdfDataset;
import utils.ExtractVariable;

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

	public Reflectivity(NetcdfDataset dataset) {
		try {
			Array rv = ExtractVariable.getVariableData(dataset, variable, spec);
			this.reflexivity = ((float[][]) rv.reduce().copyToNDJavaArray());
			this.distance = new Distance(dataset);
			this.azimuth = new Azimuth(dataset);
		} catch (Exception error) {
			System.out.println(error.getMessage());
		}

	}
}
