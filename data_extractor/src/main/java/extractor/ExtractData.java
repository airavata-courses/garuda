package extractor;

import java.util.ArrayList;
import java.util.List;

import ucar.ma2.Array;
import ucar.nc2.Variable;
import ucar.nc2.dataset.NetcdfDataset;
import ucar.nc2.dataset.NetcdfDatasets;

public class ExtractData {

	private Array getVariableData(NetcdfDataset dataset, String variable, String spec) throws Exception {
		Variable varData = dataset.findVariable(variable);
		if (varData == null) {
			throw new Exception("Error in fetching variable from dataset");
		} else {
			// spec is string specifying a range of data, eg. ":,0:2"
			Array data = varData.read(spec);
			return data;
		}
	}

	// TODO: complete this function to convert ma2.Array to JSON
	private String convertDataToJSON(Array data) {
		return null;
	}

	private List<String> getAllFileData(String[] input, String variable, String spec) {
		List<String> result = new ArrayList();
		for (int i = 0; i < input.length; i++) {
			try {
				NetcdfDataset ncd = NetcdfDatasets.openDataset(input[i]);
				// if opened get variable data
				result.add(convertDataToJSON(getVariableData(ncd, variable, spec)));
			} catch (Exception err) {
				// ignore exception for now
			}
		}
		return result;
	}

}
