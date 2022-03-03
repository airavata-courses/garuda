package com.garuda.queueworker.consumer;

public final class Constants {
	
	public static final String RABBITMQ_HOST = System.getenv().getOrDefault("RABBITMQ_HOST", "localhost");
	public static final int RABBITMQ_PORT = Integer.parseInt(System.getenv().getOrDefault("RABBITMQ_PORT", "5672"))	;
	public static final String RABBITMQ_USERNAME = System.getenv().getOrDefault("RABBITMQ_USERNAME", "guest");
	public static final String RABBITMQ_PASSWORD = System.getenv().getOrDefault("RABBITMQ_PASSWORD", "guest");
	public static final String RABBITMQ_VIRTUAL_HOST = System.getenv().getOrDefault("RABBITMQ_VIRTUAL_HOST", "/");
	public static final String RABBITMQ_QUEUE_NAME = System.getenv().getOrDefault("RABBITMQ_QUEUE_NAME", "offload_request");
	public static final String DB_MIDDLEWARE_WRITER_HOST = System.getenv().getOrDefault("DB_MIDDLEWARE_WRITER_HOST", "localhost");
	public static final String DB_MIDDLEWARE_WRITER_PORT = System.getenv().getOrDefault("DB_MIDDLEWARE_WRITER_PORT", "3001");
}