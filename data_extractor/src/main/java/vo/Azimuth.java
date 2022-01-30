package vo;

import ucar.ma2.Array;
import ucar.nc2.dataset.NetcdfDataset;
import utils.ExtractVariable;

public class Azimuth {

	private String variable = "azimuthR";
	private String spec = "0:0, :";
	public float[] azimuth;

	/**
	 * Constructor for setting Azimuth from dataset, uses azimuthR
	 * 
	 * @param dataset NetcdfDataset to extract data from
	 */
	public Azimuth(NetcdfDataset dataset) {
		try {
			Array az = ExtractVariable.getVariableData(dataset, variable, spec);
			this.azimuth = ((float[]) az.reduce().copyTo1DJavaArray());
		} catch (Exception error) {
			System.out.println(error.getMessage());
		}
	}
}
