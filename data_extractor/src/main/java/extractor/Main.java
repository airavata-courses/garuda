package extractor;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Main {

	public List<String> getNexradData(String stationID, String year, String month, String date, String start,
			String end, String property) {

		// download data
		List<String> offline_data = DataDownloader.downloadNexradData(stationID, year, month, date, start, end);

		// transform data
		List<String> netCDF_FileList = new ArrayList<String>();

		// extract data
		List<String> result = ExtractData.extractData(netCDF_FileList, property);

		// return extracted data
		return result;
	}

	public static void main(String[] args) throws IOException {
		Main test = new Main();
		System.out.println(test.getNexradData("FOP1", "2022", "01", "26", "130000", "140000", "Reflectivity"));
	}

}