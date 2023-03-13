# Docker Socket API TypeScript/JavaScript Library

This is a TypeScript/NodeJS library that provides an easy-to-use interface for integrating with the Docker socket.
The library is designed to make it easy for developers to interact with the Docker API from within their TypeScript/JavaScript applications.

The main advantage of this library is the simple interface and typings it provides.

## Usage

### Inspect a Container

To inspect a container, you can use the following code snippet:

```typescript
import type { DockerContainerI, DockerInspect, DockerInspectI } from "@jbuncle/docker-api-js";

// set the container ID you want to inspect
const containerId: string = '<my-container>';

// create a new instance of the DockerSocket class
const dockerSocket: DockerSocket = new DockerSocket();

// create a new instance of the DockerInspect class, passing the DockerSocket instance
const dockerInspect: DockerInspect = new DockerInspect(dockerSocket);

// use the DockerInspect instance to inspect the container with the specified ID
const inspectInfo: DockerInspectI = await dockerInspect.inspect(containerId);

// log the inspect info object
console.log(inspectInfo);
```

### Bind to Events

To bind to Docker events, you can use the following code snippet:

```typescript
// specify the path to the Docker socket file
const socketPath: string = `/var/run/docker.sock`;

// create a new instance of the DockerSocket class, passing the path to the Docker socket file
const dockerSocket: DockerSocket = new DockerSocket(socketPath);

// create a new instance of the DockerEvents class, passing the DockerSocket instance
const dockerEvents: DockerEvents = new DockerEvents(dockerSocket);

// specify the options for filtering the events
const eventsOptions: DockerEventOptionsI = {
    filters: {
        event: [`start`, `stop`],
        type: [`container`],
    }
};

// use the DockerEvents instance to connect to the Docker socket and receive events
dockerEvents.connect((data: DockerEventI)=>{
     console.log(data);
}, (e: Error): void => {
    console.error(e);
}, eventsOptions);
```

The connect method takes a callback function that will be called whenever a Docker event is received.
The callback function will be passed an object representing the event.
It also takes an error callback function that will be called if there is an error while connecting to the Docker socket.
Finally, it takes an options object that can be used to filter the events that you receive by specifying the type of 
event and the type of object being monitored.
