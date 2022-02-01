package consumer;

import java.io.IOException;
import java.util.List;

import com.garuda.dataextractor.extactor.NexradFetcher;
import com.rabbitmq.client.CancelCallback;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;
import com.rabbitmq.client.Delivery;

public class Worker {

	private final static String queue_name = "offload_request";

	public static void main(String args[]) {
		System.out.println("Stating a consumer of queue_worker....");
		try {
			ConnectionFactory factory = new ConnectionFactory();
			com.rabbitmq.client.Connection conn = factory.newConnection();
			Channel channel = conn.createChannel();
			channel.queueDeclare(queue_name, false, false, false, null);
			channel.basicConsume(queue_name, true, new DeliverCallback() {
				@Override
				public void handle(String consumerTag, Delivery message) throws IOException {
					// TODO Auto-generated method stub
					System.out.println(new String(message.getBody(), "utf-8"));
					NexradFetcher nf = new NexradFetcher();
					List<String> response = nf.getNexradData("KABR", "2007", "01", "01", "000000", "002000", "Reflectivity");
					System.out.println("fetch data complete...");
					// TODO: post JSON to db_writer
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
		}

	}
}
