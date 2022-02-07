FROM maven:3.8.4-jdk-11

WORKDIR /data_extractor
COPY ./data_extractor .
RUN mvn clean
RUN mvn assembly:single
RUN mvn install

WORKDIR /queue_worker
COPY ./queue_worker .
RUN mvn clean
RUN mvn compile assembly:single
WORKDIR /queue_worker/target
CMD ["java", "-jar", "queue_worker-1.0.0-jar-with-dependencies.jar"]
