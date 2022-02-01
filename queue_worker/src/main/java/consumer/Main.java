package consumer;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

import com.rabbitmq.client.CancelCallback;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;
import com.rabbitmq.client.Delivery;

public class Main {
	
	public static void main(String args[]) throws IOException, TimeoutException {
		System.out.println("hello");
		
		ConnectionFactory factory = new ConnectionFactory();
		
		com.rabbitmq.client.Connection conn = factory.newConnection();
		Channel channel = conn.createChannel();
		channel.queueDeclare("offload_request", false, false, false, null);
		channel.basicConsume("offload_request", true, new DeliverCallback() {
			
			@Override
			public void handle(String consumerTag, Delivery message) throws IOException {
				// TODO Auto-generated method stub
				System.out.println(new String(message.getBody(), "utf-8"));
				// TODO: call data_extractor method
				
				
				// TODO: post json to db_writer
			}
		}, new CancelCallback() {
			
			@Override
			public void handle(String consumerTag) throws IOException {
				// TODO Auto-generated method stub
				
			}
		});
	}
}
