package extractor;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import ucar.nc2.dataset.NetcdfDataset;
import vo.Reflectivity;

public class ExtractData {

	private String getReflextivity(NetcdfDataset ncd) {
		Reflectivity rf = new Reflectivity(ncd);
		Gson gson = new GsonBuilder().serializeSpecialFloatingPointValues().create();
		String json = gson.toJson(rf);
		return json;
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
