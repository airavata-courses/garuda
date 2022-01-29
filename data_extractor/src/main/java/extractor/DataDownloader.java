package extractor;

import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ListObjectsV2Request;
import com.amazonaws.services.s3.model.ListObjectsV2Result;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.services.s3.model.S3ObjectSummary;

public class DataDownloader {

	private static final String bucketName = "noaa-nexrad-level2";
	private static final Regions bucketRegion = Regions.US_EAST_1;
	private static final String tempFolder = "./temp";

	public static List<String> downloadNexradData(String stationID, String year, String month, String date, String start,
			String end) {
		List<String> downloaded_files = new ArrayList<String>();
		DataDownloader dd = new DataDownloader();
		List<String> fileList = dd.getFileListFromS3(stationID, date, month, year, start, end);
		for (String file : fileList) {
			try {
				downloaded_files.add(dd.downloadFromS3(file));
			} catch (Exception error) {
				error.printStackTrace();
				// ignore exception
			}
		}
		return downloaded_files;
	}

	private String downloadFromS3(String key_name) throws Exception {
		System.out.format("Downloading %s from S3 bucket %s...\n", key_name, bucketName);
		final AmazonS3 s3 = AmazonS3ClientBuilder.standard().withRegion(bucketRegion).build();
		S3Object o = s3.getObject(bucketName, key_name);
		S3ObjectInputStream s3is = o.getObjectContent();
		Files.createDirectories(Paths.get(tempFolder));
		String[] fileNameToken = key_name.split("/");
		String shortName = fileNameToken[fileNameToken.length - 1];
		// TODO: check if file already present, if present ignore.
		FileOutputStream fos = new FileOutputStream(new File(tempFolder + "/" + shortName));
		byte[] read_buf = new byte[1024];
		int read_len = 0;
		while ((read_len = s3is.read(read_buf)) > 0) {
			fos.write(read_buf, 0, read_len);
		}
		s3is.close();
		fos.close();
		return tempFolder + "/" + shortName;
	}

	private List<String> getFileListFromS3(String stationID, String dd, String mm, String yyyy, String start,
			String end) {
		List<String> fileList = new ArrayList<String>();
		@SuppressWarnings("deprecation")
		AmazonS3 s3Client = new AmazonS3Client();
		String prefix = yyyy + "/" + mm + "/" + dd + "/" + stationID + "/";
		ListObjectsV2Request req = new ListObjectsV2Request().withBucketName(bucketName).withPrefix(prefix);
		ListObjectsV2Result result;
		result = s3Client.listObjectsV2(req);
		for (S3ObjectSummary objectSummary : result.getObjectSummaries()) {
			System.out.printf(" - %s (size: %d)\n", objectSummary.getKey(), objectSummary.getSize());
			String key = objectSummary.getKey();
			String[] tokens = key.split("_");
			String hhmmss = tokens[1];
			if (hhmmss.compareTo(start) >= 0 && hhmmss.compareTo(end) <= 0) {
				fileList.add(objectSummary.getKey());
			}
		}
		return fileList;
	}
}
