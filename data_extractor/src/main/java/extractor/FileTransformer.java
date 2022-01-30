package extractor;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import ucar.nc2.NetcdfFile;

@SuppressWarnings("deprecation")
public class FileTransformer {

	private static final String filePath = "./netcdfs/";

	public static List<String> convertBinaryToNetCDF(List<String> inputFile) {
		List<String> netCDF_FileList = new ArrayList<String>();
		
		for (String input: inputFile) {
			try {
				String output = filePath + input + ".nc";
			    NetcdfFile ncfileIn = ucar.nc2.NetcdfFile.open(input, null);
			    NetcdfFile ncfileOut = ucar.nc2.FileWriter.writeToFile(ncfileIn, output, false, false, null);
			    ncfileIn.close();
			    ncfileOut.close();
			    netCDF_FileList.add(output);
			} catch(Exception error) {
				error.printStackTrace();
			}
		}
		return netCDF_FileList;
	}
}
