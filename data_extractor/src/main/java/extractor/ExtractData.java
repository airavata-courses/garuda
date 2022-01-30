package extractor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.google.gson.Gson;

import ucar.ma2.Array;
import ucar.nc2.Variable;
import ucar.nc2.dataset.NetcdfDataset;
import vo.Reflectivity;

public class ExtractData {

	private static final HashMap<String, String> specSheet = new HashMap<String, String>();
	static {
		specSheet.put("Reflectivity", "0:0, :, :");
		specSheet.put("distanceR", ":");
		specSheet.put("azimuthR", "0:0, :");
	}

	private static final HashMap<String, List<String>> dependencies = new HashMap<String, List<String>>();
	static {
		dependencies.put("Reflectivity", new ArrayList<String>());
		dependencies.get("Reflectivity").add("azimuthR");
		dependencies.get("Reflectivity").add("distanceR");
		dependencies.get("Reflectivity").add("Reflectivity");
	}

	private String getVariableData(NetcdfDataset dataset, String variable) throws Exception {
		Variable varData = dataset.findVariable(variable);
		if (varData == null) {
			throw new Exception("Error in fetching variable from dataset");
		} else {
			// spec is string specifying a range of data, eg. ":,0:2"
			String spec = specSheet.getOrDefault(variable, ":");
			Array data = varData.read(spec);
			return data.toString();
		}
	}

	private String getReflextivity(NetcdfDataset ncd) {
		Reflectivity rf = new Reflectivity();
		try {
			rf.azimuth = getVariableData(ncd, "azimuthR");
			rf.distance = getVariableData(ncd, "distanceR");
			rf.reflexitivity = getVariableData(ncd, "Reflectivity");
			Gson gson = new Gson();
			String json = gson.toJson(rf);
			return json;
		} catch (Exception err) {
			return "";
		}
	}

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
			} catch (Exception err) {
				// ignore exception for now
			}
		}
		return extracted_data;
	}

}
