module.exports = {
  title: "Here We Build CityScope",
  tagline: "Urban Modelling & Simulation",
  url: "https://cityscope.media.mit.edu",
  baseUrl: "/",
  onBrokenLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: "CityScope", // Usually your GitHub org/user name.
  projectName: "cityscope.github.io", // Usually your repo name.
  deploymentBranch: "gh-pages",

  themeConfig: {
    navbar: {
      title: "MIT CityScope",
      logo: {
        alt: "Logo",
        src: "img/ML_logo.png",
      },
      items: [
        {
          href: "https://cityscope.media.mit.edu/CS_cityscopeJS",
          label: "CityScopeJS",
          position: "right",
          src: "img/",
        },
        {
          href: "https://github.com/CityScope",
          label: "GitHub",
          position: "right",
          src: "img/",
        },
      ],
    },
    footer: {
      logo: {
        alt: "Logo",
        src: "img/ML_logo_sml.png",
        href: "https://github.com/CityScope",
      },
      copyright: `CityScope, MIT City Science ${new Date().getFullYear()}`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.js",
          editUrl: "https://github.com/CityScope/cityscope.github.io/",
        },
      },
    ],
  ],
};
