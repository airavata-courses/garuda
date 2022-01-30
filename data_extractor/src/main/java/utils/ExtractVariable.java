package utils;

import ucar.ma2.Array;
import ucar.nc2.Variable;
import ucar.nc2.dataset.NetcdfDataset;

public class ExtractVariable {
	
	public static Array getVariableData(NetcdfDataset dataset, String variable, String spec) throws Exception {
		Variable varData = dataset.findVariable(variable);
		if (varData == null) {
			throw new Exception("Error in fetching variable from dataset");
		} else {
			// spec is string specifying a range of data, eg. ":,0:2"
			Array data = varData.read(spec);
			return data;
		}
	}
}
