 the system is still heavily in rapid development, so
the specification is very flexible. At this point the main components of a cityscope table will be:

## Hardware
1. PC (preferably windows, since some software is win only)

2. [Table](https://github.com/CityScope/cityscope.github.io/tree/master/CS_Hardware)

    Not every deployment uses this table configuration, often times its just a table with the most important transparent top and grid, this is often made from acrylic and laser cut.

3. Legos

4. Projectors

5. [Webcam](https://www.amazon.com/gp/product/B006JH8T3S/ref=s9_acsd_top_hd_bw_bisR_c_x_1_w?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=merchandised-search-3&pf_rd_r=W90AXQB8TSWYBB1ZZXG5&pf_rd_t=101&pf_rd_p=0af85809-accb-5a70-bc4f-f9a8f374e48c&pf_rd_i=172511)

6. (Internet connection)

## Software
CityScope is composed of multiple software
1. Scanner (gets input from camera converts it to information that can be parsed through various simulation)
currently this functionality is provided using one of below:
  - Rhinoceros 3D (win only)
  - Unity game engine
  - Browser, JavaScript
2. Simulation / Visualization
this differs largely on what to simulate, or the research question on focus.
In fact, some CityScope table has multiple simulations and visualizations living together.
  - [Gama](http://gama-platform.org/) for agent based simulation
  - General Simulation and visualization 
    - Rhinoceros 3D / Grasshopper
    - Unity game engine