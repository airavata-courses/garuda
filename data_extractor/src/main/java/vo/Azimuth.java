package vo;

import ucar.ma2.Array;
import ucar.nc2.dataset.NetcdfDataset;
import utils.ExtractVariable;

public class Azimuth {

	private String variable = "azimuthR";
	private String spec = "0:0, :";
	public float[] azimuth;

	public Azimuth(NetcdfDataset dataset) {
		try {
			Array az = ExtractVariable.getVariableData(dataset, variable, spec);
			this.azimuth = ((float[]) az.reduce().copyTo1DJavaArray());
		} catch (Exception error) {
			System.out.println(error.getMessage());
		}
	}
}
