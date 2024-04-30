---
sidebar_position: 5
---

The objective of this interface is to facilitate the integration of core modules into the CityScope network.

## Message Flow

The following subsections will detail the various data exchanges that can take place between CityIO and the Core Modules.

## Initial connection

To integrate a core module into the CityScope network, the module can establish a connection via the `/module/core` endpoint. Upon successful connection, the module should send a CORE_MODULE_REGISTRATION message containing information to identify the module.

![Initial Connection](/img/cityio/wc/initialcon.png)

## Subscription request

When a user, through a user interface, wishes to connect a module to a project, they send a request to CityIO. This request is then forwarded to the core module as a SUBSCRIPTION_REQUEST message. If the module is available, the core module should respond by sending a SUBSCRIBE message to CityIO, including the identifier of the grid that requires the module's services. Upon receiving the grid information, the core module should calculate the necessary indicator and transmit this data back to CityIO.

![Subscription Request](/img/cityio/wc/subrequest.png)

## Subscription removal request

If a user wishes to disconnect a module from a project, they can send a module removal request to CityIO. This request will be forwarded to the Core Module as a SUBSCRIPTION_REMOVAL_REQUEST. Upon receiving this message, the Core Module should then UNSUBSCRIBE from the project.

![Subscription Removal Request](/img/cityio/wc/subremovalrequest.png)
