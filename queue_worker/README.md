# Queue_Worker

## Project Source Code for Queue Worker

Create a consumer which listens messages from a Rabbitmq queue, and processs the request.
The project consumes data_extractor package to fetch formatted NEXRAD data. 
It pushes the extracted to and API endpoint

### Requirements
1. Java 11 or above
2. Apache Maven
   * Resource to install Apache Maven : https://maven.apache.org/install.html

### Building for source

Clone garuda project

```sh
git clone git@github.com:airavata-courses/garuda.git
```

Change directory into garuda/queue_worker
```sh
cd garuda/queue_worker/
```

Clean
```sh
mvn clean
```

Compile source code and build package using maven

```sh
mvn compile assembly:single
```

JAR file is generated at folder : /target
```sh
cd target/
```

> Note: JAR file built : queue_worker-1.0.0-jar-with-dependencies.jar


Run project
```sh
java -jar queue_worker-1.0.0-jar-with-dependencies.jar

```


