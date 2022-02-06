# Base image
FROM maven:3.6.3-jdk-11

# LABEL about the custom image
LABEL maintainer="garuda"
LABEL version="1.0"
LABEL description="This is a custom docker image for the queue_worker and data_extractor services in the garuda project assignment 1"


COPY data_extractor /main/data_extractor/
COPY queue_worker /main/queue_worker/

WORKDIR /main/data_extractor

RUN mvn test
RUN mvn clean
RUN mvn assembly:single
RUN mvn install

WORKDIR /main/queue_worker
RUN mvn clean
RUN mvn compile assembly:single

EXPOSE 80 5000 3001 27017 5672 4369 15672

CMD [ "java", "-jar", "/main/queue_worker/target/queue_worker-1.0.0-jar-with-dependencies.jar"]