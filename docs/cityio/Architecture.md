---
sidebar_position: 2
---

## WebSockets: definition and use

WebSockets provide a way for two-way communication between a client and a server over a single, long-lived connection. This is different from the traditional HTTP request-response model, where each request opens a new connection (or reuses an existing connection in a limited way), and the server cannot send messages to the client unless explicitly requested. WebSockets allow the server to send messages to the client at any time, facilitating real-time data transfer and interactive applications.

In our scenario, CityIO is a message broker that collects, processes, and distributes urban data, and CityScopeJS is a web-based user interface that visualizes this data for analysis and decision-making.

Using WebSockets CityScopeJS establishes a WebSocket connection to CityIO when a user opens a project. This single connection stays open for the duration of the user's session. Whenever CityIO has new data or updates, it can immediately push this data to CityScopeJS over the WebSocket connection. CityScopeJS receives the data in real-time and updates the visualizations accordingly. This setup minimizes network overhead, reduces server load, and provides a seamless, real-time user experience.

## WebSockets Messages

The WebSocket messages exchanged between CityIO, the user interfaces (UIs), and the modules will adhere to the following structure, which is represented as a JSON schema:

```json
{
    "title": "websocket-message",
    "description": "Structure of the websocket messages",
    "type": "object",
    "properties": {
        "type":{
            "type": "string"
        },
        "content":{
            "type": "object"
        }
     }
}
```

- The property **type** will indicate what type of message is sending the entity.
- the property **content** will differ depending on the type of the message; should contain the information needed for the destination entity to process the message.

Upon reception of a message, the CityScope entity (CityIO, User Interfaces, or Modules) will follow the next steps:

- Parses the message as a JSON, using the previous schema.
- Reads the type property:
  - If the type is recognized, reads the content property and executes the proper action.
  - Otherwise, the message is discarted.

## HTTP API

CityIO features an HTTP API that enables users to access a wide range of information about various projects. The REST API is designed to maintain compatibility with the previous version of CityIO, ensuring that older modules can seamlessly communicate with this new component.

## Interfaces

The available interfaces, as previously mentioned, include the following:

- Websocket channel **/interface**: interface to exchange messages with interfaces.
- Websocket channel **/module**: interface to exchange messages with modules.
- Websocket channel **/module/core**: interface to exchange messages with core modules.
- API REST **/api**: HTTP interface to obtain information from CityIO.
