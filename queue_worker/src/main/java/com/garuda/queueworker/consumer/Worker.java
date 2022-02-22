package com.garuda.queueworker.consumer;

import static com.garuda.queueworker.consumer.Constants.RABBITMQ_HOST;
import static com.garuda.queueworker.consumer.Constants.RABBITMQ_PASSWORD;
import static com.garuda.queueworker.consumer.Constants.RABBITMQ_PORT;
import static com.garuda.queueworker.consumer.Constants.RABBITMQ_QUEUE_NAME;
import static com.garuda.queueworker.consumer.Constants.RABBITMQ_USERNAME;
import static com.garuda.queueworker.consumer.Constants.RABBITMQ_VIRTUAL_HOST;

import java.io.IOException;
import java.util.List;

import org.json.JSONObject;

import com.garuda.dataextractor.extactor.NexradFetcher;
import com.rabbitmq.client.CancelCallback;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;
import com.rabbitmq.client.Delivery;

public class Worker {

	public static void main(String args[]) {
		System.out.println("Stating a consumer of queue_worker....");
		try {
			ConnectionFactory factory = new ConnectionFactory();
			factory.setUsername(RABBITMQ_USERNAME);
			factory.setPassword(RABBITMQ_PASSWORD);
			factory.setHost(RABBITMQ_HOST);
			factory.setVirtualHost(RABBITMQ_VIRTUAL_HOST);
			factory.setPort(RABBITMQ_PORT);
			com.rabbitmq.client.Connection conn = factory.newConnection();
			Channel channel = conn.createChannel();
			channel.queueDeclare(RABBITMQ_QUEUE_NAME, false, false, false, null);
			channel.basicConsume(RABBITMQ_QUEUE_NAME, true, new DeliverCallback() {
				@Override
				public void handle(String consumerTag, Delivery message) throws IOException {

					String request = new String(message.getBody(), "utf-8");

					System.out.println("recieved msg : " + request);

					// extract parameters from request
					JSONObject request_obj = new JSONObject(request);
					String requestID = request_obj.getString("requestID");
					String stationID = request_obj.getString("stationID");
					String year = request_obj.getString("year");
					String month = request_obj.getString("month");
					String date = request_obj.getString("date");
					String start_time = request_obj.getString("start_time");
					String end_time = request_obj.getString("end_time");
					String property = request_obj.getString("property");

					// fetch data
					NexradFetcher nf = new NexradFetcher();
					List<String> response = nf.getNexradData(stationID, year, month, date, start_time, end_time,
							property);
					System.out.println("fetch data complete...");

					for (String res : response) {
						// create response
						JSONObject final_response = new JSONObject();
						final_response.put("requestID", requestID);
						final_response.put("start_time", start_time);
						final_response.put("end_time", end_time);
						final_response.put("data", res);
						
						// post JSON to db_writer
						try {
							PostData.sendPost(final_response.toString());
						} catch (Exception error) {
							System.out.println("error in sending data.. :(");
							System.out.println(error.getMessage());
						}	
					}

				}
			}, new CancelCallback() {

				@Override
				public void handle(String consumerTag) throws IOException {
					// TODO Auto-generated method stub

				}
			});
		} catch (Exception error) {
			System.out.println("error in stating a consumer of service worker :(");
			System.out.println(error.getMessage());
			System.exit(1);
		}

	}
}
