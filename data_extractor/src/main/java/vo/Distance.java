package vo;

import ucar.ma2.Array;
import ucar.nc2.dataset.NetcdfDataset;
import utils.ExtractVariable;

public class Distance {

	private String variable = "distanceR";
	private String spec = ":";

	public float[] distance;

	public Distance(NetcdfDataset dataset) {
		try {
			Array dist = ExtractVariable.getVariableData(dataset, variable, spec);
			this.distance = ((float[]) dist.copyTo1DJavaArray());
		} catch (Exception error) {
			System.out.println(error.getMessage());
		}
	}
}
