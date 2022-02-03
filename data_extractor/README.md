# Data_Extactor

## Project Source Code for Data_Extractor

A maven project which creates a JAR file which can be used to extract NEXRAD data from AWS S3

### JAVADOCS
[data extractor javadocs](https://courses.airavata.org/garuda/data_extractor/index.html)

### Requirements
1. Java 11 or above
2. Apache Maven
   * Resource to install Apache Maven : https://maven.apache.org/install.html

### Building for source

Clone garuda project

```sh
git clone git@github.com:airavata-courses/garuda.git
```

Change directory into garuda/data_extractor
```sh
cd garuda/data_extractor/
```

Clean build
```sh
mvn clean
```

Compile source code and build package using maven
```sh
mvn assembly:single
```

Install package
```sh
mvn install
```

JAR file is generated at folder : /target
```sh
cd target/
```
> Note: JAR file built : data_extractor-0.0.1-SNAPSHOT-jar-with-dependencies.jar


