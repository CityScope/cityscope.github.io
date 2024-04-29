---
sidebar_position: 1
---

The purpose of this section is to outline the architecture and interfaces of CityIOWS, an updated version of CityIO that utilizes WebSockets for communication with modules and user interfaces.

The diagram below illustrates the various components that interact with CityIOWS, including modules, core modules, and user interfaces. Communication among these components is facilitated through CityIO, serving as a broker. A WebSocket channel is established for each connection.

![CityIO Websockets](/img/cityio/arch.png)
