---
sidebar_position: 3
---

The objective of this interface is to enable user interfaces to access information about the grids created in CityIO, as well as the Key Performance Indicators (KPIs) computed by the modules. Additionally, this interface will permit users to make changes to the grids.

This WebSocket interface is independent of the User Interface's implementation, making it possible to utilize this WebSocket channel in CityScopeJS, Tangible User Interfaces (TUIs), and any forthcoming UI proposals.

## Message Flow

The subsequent subsections detail the various data exchanges that can take place between CityIO and the User Interfaces.

## Initial connection

When a user interface seeks to establish a connection with CityIO to send and receive information from a project, it initiates a request to `/interface`, which will be upgraded to a WebSocket. Following this, the UI can designate the specific grid (project) it wishes to connect to, and as a result, the UI will receive the grid's data. Subsequently, the User Interface can request the list of scenarios associated with that project, as well as the list of available core modules.

![Initial Connection](/img/cityio/wui/initialcon.png)

## Grid Update

When the user interface needs to update the grid at the user's request, it can transmit the updated GEOGRIDDATA to CityIO via the WebSocket.

![Grid Update](/img/cityio/wui/gridupdate.png)

## Module Request

When the user interface intends to request the connection of a module based on a user's demand, it can send a MODULE_REQUEST message to CityIO.

![Module Request](/img/cityio/wui/modulerequest.png)

## Save Scenario

When the user interface aims to save the current state of the project as a scenario at a user's request, it can send a SEND_SCENARIO message to CityIO, including the name of the scenario and its description.

![Module Request](/img/cityio/wui/scenariosave.png)

## Delete and Restore Scenario

When the user interface seeks to delete or restore a scenario based on a user's request, it can send a MODIFY_SCENARIO message, with the property `isInBin` set to true or false, depending on whether the scenario should be placed in the bin or restored.

![Module Request](/img/cityio/wui/scenariodeleterestore.png)
