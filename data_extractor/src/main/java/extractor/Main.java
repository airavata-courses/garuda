package extractor;

import java.io.IOException;
import java.util.List;

public class Main {

	public List<String> getNexradData(String stationID, String year, String month, String date, String start,
			String end, String property) throws IOException {

		// download data
		List<String> offline_data = DataDownloader.downloadNexradData(stationID, year, month, date, start, end);

		// transform data
		List<String> netCDF_FileList = FileTransformer.convertBinaryToNetCDF(offline_data);

		// extract data
		List<String> result = ExtractData.extractData(netCDF_FileList, property);

		// return extracted data
		return result;
	}

	public static void main(String[] args) {
		Main test = new Main();
		try {
			System.out.println(test.getNexradData("FOP1", "2022", "01", "26", "130000", "140000", "Reflectivity"));
		} catch (Exception error) {
			error.printStackTrace();
		}
	}

}