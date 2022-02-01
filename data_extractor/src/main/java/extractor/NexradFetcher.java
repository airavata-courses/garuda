package extractor;

import java.io.IOException;
import java.util.List;

public class NexradFetcher {

	/**
	 * Function to extract NEXRAD data from AWS S3 bucket
	 * 
	 * @param stationID - Radar station short code
	 * @param year      - Year in YYYY
	 * @param month     - Month in MM
	 * @param date      - Date in DD
	 * @param start     - Time start window in hhmmss
	 * @param end       - Time end window in hhmmss
	 * @param property  - Property to fetch
	 * @return List of JSON string
	 * @throws IOException
	 */
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
		
		System.out.println("This is data_extactor package which extracts NEXRAD data from AWS S3...");
		
//		NexradFetcher test = new NexradFetcher();
//		try {
//			System.out.println(test.getNexradData("FOP1", "2022", "01", "26", "135000", "140000", "Reflectivity"));
//		} catch (Exception error) {
//			error.printStackTrace();
//		}
	}

}