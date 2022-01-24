package extractor;

import java.io.IOException;
import java.util.Arrays;

import ucar.ma2.Array;
import ucar.nc2.Variable;
import ucar.nc2.dataset.NetcdfDataset;
import ucar.nc2.dataset.NetcdfDatasets;
import ucar.nc2.write.Ncdump;

public class Main {
	
	public static void main(String[] args) throws IOException {
		System.out.println("hello world");
//		String s3_link = "cdms3://s3.amazonaws.com/noaa-nexrad-level2?1991/06/05/KTLX/KTLX19910605_162126.gz";
		String input_file = "/home/pranav/Projects/coursework/sping2022/CSCI-B649/datatest/KAMA20210405_001800_V06.nc";
		try (NetcdfDataset ncd = NetcdfDatasets.openDataset(input_file)) {
			System.out.println("opened data set");
			System.out.println("file type desc :" + ncd.getFileTypeDescription());

			// extract variables;
//			System.out.println(ncd.findVariable("azimuthR"));
			Variable v = ncd.findVariable("azimuthR");
			if (v == null)
				return;
			try {
				// sectionSpec is string specifying a range of data, eg ":,1:2,0:3"
				Array data = v.read("0:0,:"); // sweep zero
				System.out.println(Arrays.toString(data.getShape()));
				String arrayStr = Ncdump.printArray(data, "azimuthR", null);
				System.out.println(arrayStr);

			} catch (Exception e) {
//				  logger.log(yourReadVarErrorMsgTxt, e);
				System.err.println("error getting variable data: " + e);

			}

			Variable dist = ncd.findVariable("distanceR");
			if (dist == null)
				return;
			try {
				// sectionSpec is string specifying a range of data, eg ":,1:2,0:3"
				Array data = dist.read(":"); // sweep zero
				System.out.println(Arrays.toString(data.getShape()));
				String arrayStr = Ncdump.printArray(data, "distanceR", null);
				System.out.println(arrayStr);

			} catch (Exception e) {
//				  logger.log(yourReadVarErrorMsgTxt, e);
				System.err.println("error getting variable data: " + e);

			}

			Variable reflectivity = ncd.findVariable("Reflectivity");
			if (reflectivity == null)
				return;
			try {
				// sectionSpec is string specifying a range of data, eg ":,1:2,0:3"
				Array data = reflectivity.read("0:0, :, :"); // sweep zero
				System.out.println(Arrays.toString(data.getShape()));
//				String arrayStr = Ncdump.printArray(data, "Reflectivity", null);
//				System.out.println(arrayStr);

			} catch (Exception e) {
//				  logger.log(yourReadVarErrorMsgTxt, e);
				System.err.println("error getting variable data: " + e);

			}

			ncd.close();
		} catch (Exception err) {
			System.err.println("error in opening dataset: " + err);
		}
	}

}