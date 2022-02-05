package com.garuda.dataextractor.extactor;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.ThreadPoolExecutor;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ListObjectsV2Request;
import com.amazonaws.services.s3.model.ListObjectsV2Result;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.garuda.dataextractor.utils.DownloadFromS3;

public class DataDownloader {

	// Hard-coded bucket name and region
	private static final String bucketName = "noaa-nexrad-level2";

	/**
	 * Function to download NEXRAD dataset from S3.
	 * 
	 * @param stationID - RADAR station short code
	 * @param year      - YEAR in YYYY
	 * @param month     - MONTH in MM
	 * @param date      - DATE in DD
	 * @param start     - start time window in hhmmss
	 * @param end       - end time window in hhmmss
	 * @return List of path of downloaded files
	 */
	public static List<String> downloadNexradData(String stationID, String year, String month, String date,
			String start, String end) {
		List<String> downloaded_files = new ArrayList<String>();
		DataDownloader dd = new DataDownloader();
		List<String> fileList = dd.getFileListFromS3(stationID, date, month, year, start, end);

		ThreadPoolExecutor executor = (ThreadPoolExecutor) Executors.newFixedThreadPool(2);

		List<Future<String>> resultList = new ArrayList<>();

		for (String file : fileList) {
			DownloadFromS3 dfs = new DownloadFromS3(file);
			Future<String> result = executor.submit(dfs);
			resultList.add(result);
		}

		for (Future<String> future : resultList) {
			try {
				downloaded_files.add(future.get());
			} catch (InterruptedException | ExecutionException e) {
				e.printStackTrace();
			}
		}

		// shut down the executor service now
		executor.shutdown();

		return downloaded_files;
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
