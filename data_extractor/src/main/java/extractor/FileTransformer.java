package extractor;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import ucar.nc2.NetcdfFile;

@SuppressWarnings("deprecation")
public class FileTransformer {

	// folder to get downloaded files from
	private static final String tempFolder = "./temp";

	// folder to store .nc files
	private static final String filePath = "./netcdfs";

	/**
	 * Function to convert .gz / octet file to .nc format
	 * 
	 * @param inputFile - List path of input files
	 * @return List of path of output files
	 * @throws IOException
	 */
	public static List<String> convertBinaryToNetCDF(List<String> inputFile) throws IOException {
		List<String> netCDF_FileList = new ArrayList<String>();
		Files.createDirectories(Paths.get(filePath));
		for (String input : inputFile) {
			try {
				String output = filePath + "/" + input + ".nc";
				// TODO: fix error while tranforming FOP120220126_135821_V06_MDM
				NetcdfFile ncfileIn = ucar.nc2.NetcdfFile.open(tempFolder + "/" + input, null);
				NetcdfFile ncfileOut = ucar.nc2.FileWriter.writeToFile(ncfileIn, output, false, false, null);
				ncfileIn.close();
				ncfileOut.close();
				netCDF_FileList.add(output);
			} catch (Exception error) {
				System.out.println(error.getMessage());
			}
		}
		return netCDF_FileList;
	}
}
