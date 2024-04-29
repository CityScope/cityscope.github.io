---
sidebar_position: 1
---

Welcome to the documentation of the **CityScope WS Software**.

:::warning[Warning]

This documentation and the software it describes are works in progress. The content of the documentation or the software may change without prior notice.

:::

## Getting Started

CityScope Beta features an architecture that is similar to the previous version, consisting of three core components:

- [CityIO](https://github.com/CityScope/CS_CityIO_WS/):
  - Enables the communication between the different components of the system.
  - Saves the projects to access them seamlessly in all the components.
  - Rebuilt to allow real-time communication, using WebSockets.
- [CityScopeJS](https://github.com/CityScope/CS_cityscopeJS/):
  - User interface to interact with the CityScope projects.
  - Rebuilt to use CityIO Websockets.
  - New user experience.
- [Brix](https://github.com/CityScope/CS_Brix_WS/):
  - Python library to ease the creation of CityScope modules.
  - Handles the communication with CityIO.

The image below illustrates the components currently available in the CityScope Beta Software architecture. Additional components can be incorporated as required in the future.

![CityIO Websockets](/img/CityScopeJS_arch-fbcfe17353a25c81f7465768449446e7.jpg)
