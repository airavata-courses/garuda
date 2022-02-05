package com.garuda.dataextractor.utils;

import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.concurrent.Callable;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;

public class DownloadFromS3 implements Callable<String> {

	private String key_name;

	// Hard-coded bucket name and region
	private static final String bucketName = "noaa-nexrad-level2";
	private static final Regions bucketRegion = Regions.US_EAST_1;

	// folder to store downloaded files
	private static final String tempFolder = "./temp";

	public DownloadFromS3(String key_name) {
		this.key_name = key_name;
	}

	@Override
	public String call() throws Exception {
		// TODO Auto-generated method stub
		return downloadFromS3(this.key_name);
	}

	private static String downloadFromS3(String key_name) throws Exception {
		System.out.format("Downloading %s from S3 bucket %s...\n", key_name, bucketName);

		// generate file name
		String[] fileNameToken = key_name.split("/");
		String shortName = fileNameToken[fileNameToken.length - 1];

		Files.createDirectories(Paths.get(tempFolder));

		// output file
		File op = new File(tempFolder + "/" + shortName);
		if (op.exists()) {
			return shortName;
		}

		final AmazonS3 s3 = AmazonS3ClientBuilder.standard().withRegion(bucketRegion).build();
		S3Object o = s3.getObject(bucketName, key_name);
		S3ObjectInputStream s3is = o.getObjectContent();

		FileOutputStream fos = new FileOutputStream(op);
		byte[] read_buf = new byte[1024];
		int read_len = 0;
		while ((read_len = s3is.read(read_buf)) > 0) {
			fos.write(read_buf, 0, read_len);
		}
		s3is.close();
		fos.close();
		return shortName;
	}

}
