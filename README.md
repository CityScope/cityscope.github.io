# Welcome to CityScope! 
Cityscope is a set of interconnected tools aimed to provide urban modeling and simulation solutions with an emphasis on UI/UX. 

### Cityscope schema of tools
Although each solution may require a different setup or combination of tools, the main Cityscope schema is composed by 4 main modules. Each module can be built with one or more systems.   
![alt text](/docs/Cityscope_schema.png)
* **Scanner:** This module is composed by hardware and software. It scans with a webcam the position of the buildings from a model.
* **Server**: It stores the data read by the scanner. Data can be accessed via API. You can read more in the [CS_CityIO_Backend](https://github.com/CityScope/CS_CityIO_Backend)
* **Model**: Depending on the solution, the nature of the model may vary. The most common is agent-based-model computed with the Gama software.
* **GUI**: The client software displays the output of the model. It projects the result of the model on the table with the helo of a projection. The tools used can vary depending on the nature. (Tools commonly used are processing, Grasshoper, Unity...)

### Ready to build your own CityScope platform? 

- The [page](https://cityscope.github.io) serves overview of the CityScope platform
- The [wiki](https://github.com/CityScope/cityscope.github.io/wiki) is for high level documentation
- Some examples for previous CS deployments here: https://www.media.mit.edu/projects/cityscope/overview/

--- 
#### As a starting point, it is important to identify what kind of CityScope project you had in mind. 

For example, if you wish to build a table with Lego grid scanning and project back a visualization onto the table, the following repos will serve you:
- [building the table's hardware and installation](https://github.com/CityScope/cityscope.github.io/tree/master/CS_Hardware)
- [projection mapping]( https://github.com/CityScope/CS_prjmapJS) [for web apps, the next two repos has PM internally]
- scanning and analyzing lego grids:
    - In Rhino/Grasshopper: https://github.com/CityScope/CS_Rhino_Grasshopper_Template
    - in Unity3d: https://github.com/CityScope/CS_CityScope_Unity
    - In Javascript [WIP]: https://github.com/CityScope/CS_cityscopeJS
connecting scanned Legos to visualization or 3rd party tools for analysis: https://github.com/CityScope/CS_CityIO_Backend

----

### We'd appreciate to get your feedback, here or through git issues/pull requests. 

![alt text](/docs/cs_an.jpg)
