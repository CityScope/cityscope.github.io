---
sidebar_position: 4
---

The aim of this interface is to enable user modules to access information about the grids created in CityIO, calculate Key Performance Indicators (KPIs), and then transmit them to the user interfaces.

Brix can be utilized as Middleware to facilitate interaction with this interface.

## Message Flow

The subsequent subsections provide descriptions of the various data exchanges that can occur between CityIO and the User-Defined modules.

## Initial connection

To add a user-defined module to a project, the interface `/module` can initiate a WebSocket channel. Once the connection is established, the module can send a SUBSCRIBE request to CityIO to acquire grid information. After receiving the grid details, the module should calculate the indicator and then send the information back to CityIO.

![Initial Connection](/img/cityio/wm/initialcon.png)

## Module recalculation

Upon receiving a GEOGRIDATA_UPDATE message from CityIO, the module should recalculate the indicator and send the updated information back to CityIO.

![Grid Update](/img/cityio/wm/calc.png)
