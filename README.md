# Data Stream With Kafka Application

- This is a full-stack application with a Kafka-based backend service and a React frontend application. The backend is containerized using Docker, while the frontend can be started locally or through Docker.
  

## Documentation

- **Backend Service :** A Node.js server that interacts with Kafka.
- **Frontend Client :** A React application built with TypeScript.
- **Kafka :** A distributed streaming platform for handling real-time data.
- **Zookeeper :** Manages Kafka broker metadata and configuration.
- **Docker:** Containerized whole application in container with docker-compose.

  
## Run Locally


### Prerequisites

- **Docker**

- **Docker-compose**

- **Node.js (npm)**

Clone the project

```bash
  git clone https://github.com/satyam83soni/Kafka_stream.git
```

Go to the project directory

```bash
  cd Kafka_stream
```

Run server with docker

```bash
  docker-compose up --build -d
```

visit http://localhost:4173


## Tech Stack

**Client:** React,  TailwindCSS

**Server:** Node, Express , Kafka, Zookeeper , Mongodb

**Containerization:** Docker 


## API Reference


```http
  GET /stream
```

Starts the production of data and sending it through sockets

```http
  GET /stop
```

Stops the producer so no data is sent to client

```http
  GET /clear
```

Clear the whole databse collection for entries;



