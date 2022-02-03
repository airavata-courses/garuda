package com.garuda.queueworker.consumer;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

import com.google.gson.Gson;

public class PostData {
	private final static HttpClient httpClient = HttpClient.newBuilder().version(HttpClient.Version.HTTP_2).build();

	private final static String data_writer_url = "http://localhost:3001/data_writer";

	public static void sendPost(List<String> data) throws Exception {

		HttpRequest request = HttpRequest.newBuilder().POST(buildFormDataFromMap(data)).uri(URI.create(data_writer_url))
				.header("Content-Type", "application/json").build();

		HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

		// print status code
		System.out.println(response.statusCode());

		// print response body
		System.out.println(response.body());
	}

	private static HttpRequest.BodyPublisher buildFormDataFromMap(List<String> data) {
		Gson gson = new Gson();
		String body = gson.toJson(data);
		return HttpRequest.BodyPublishers.ofString(body);
	}
}
