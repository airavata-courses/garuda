package extractor;



import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
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
	
	private static void downloadNexradData() {
//		String station, String yyyy, String mm, String dd

        try {
            AmazonS3 s3Client = new AmazonS3Client();

            System.out.println("Listing objects");

            // maxKeys is set to 2 to demonstrate the use of
            // ListObjectsV2Result.getNextContinuationToken()
            ListObjectsV2Request req = new ListObjectsV2Request().withBucketName(bucketName).withPrefix("2022/01/26/FOP1/").withMaxKeys(2);
            ListObjectsV2Result result;

            do {
                result = s3Client.listObjectsV2(req);

                for (S3ObjectSummary objectSummary : result.getObjectSummaries()) {
                    System.out.printf(" - %s (size: %d)\n", objectSummary.getKey(), objectSummary.getSize());
                }
                // If there are more than maxKeys keys in the bucket, get a continuation token
                // and list the next objects.
                String token = result.getNextContinuationToken();
                System.out.println("Next Continuation Token: " + token);
                req.setContinuationToken(token);
            } while (result.isTruncated());
        } catch (AmazonServiceException e) {
            // The call was transmitted successfully, but Amazon S3 couldn't process 
            // it, so it returned an error response.
            e.printStackTrace();
        } catch (SdkClientException e) {
            // Amazon S3 couldn't be contacted for a response, or the client
            // couldn't parse the response from Amazon S3.
            e.printStackTrace();
        }
    }
	
	private boolean downloadFromS3(String bucket_name, String key_name) throws Exception {
		System.out.format("Downloading %s from S3 bucket %s...\n", key_name, bucket_name);
		final AmazonS3 s3 = AmazonS3ClientBuilder.standard().withRegion(bucketRegion).build();
	    S3Object o = s3.getObject(bucket_name, key_name);
	    S3ObjectInputStream s3is = o.getObjectContent();
	    Files.createDirectories(Paths.get(tempFolder));
	    String[] fileNameToken = key_name.split("/");
	    String shortName = fileNameToken[fileNameToken.length - 1];
	    FileOutputStream fos = new FileOutputStream(new File(tempFolder + "/" + shortName));
	    byte[] read_buf = new byte[1024];
	    int read_len = 0;
	    while ((read_len = s3is.read(read_buf)) > 0) {
	        fos.write(read_buf, 0, read_len);
	    }
	    s3is.close();
	    fos.close();
		return true;
	}
	
	public static void main(String args[]) throws Exception {
		DataDownloader dd = new DataDownloader();
		System.out.println(dd.downloadFromS3(bucketName, "2022/01/26/FOP1/FOP120220126_000904_V06"));
	}
}
