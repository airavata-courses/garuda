package extractor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import ucar.ma2.Array;
import ucar.nc2.Variable;
import ucar.nc2.dataset.NetcdfDataset;

public class ExtractData {

	private static final HashMap<String, String> specSheet = new HashMap<String, String>();
	static {
		specSheet.put("Reflectivity", "0:0, :, :");
		specSheet.put("distanceR", ":");
		specSheet.put("azimuthR", "0:0,:");
	}

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
		System.out.print(data.toString());
		return "";
	}

	public static List<String> extractData(List<String> netCDF_FilesList, String variable) {
		// TODO: extract dependent variables -> reflextiviy -> distance and azimuth
		ExtractData ed = new ExtractData();
		String spec = specSheet.getOrDefault(variable, ":");
		List<String> extracted_data = new ArrayList<String>();
		for (String files : netCDF_FilesList) {
			try {
				NetcdfDataset ncd = NetcdfDataset.openDataset(files);
				// if opened get variable data
				extracted_data.add(ed.convertDataToJSON(ed.getVariableData(ncd, variable, spec)));
			} catch (Exception err) {
				// ignore exception for now
			}
		}
		return extracted_data;
	}

}
