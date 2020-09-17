module.exports = {
    title: "MIT CityScope",
    tagline: "Urban Modelling & Simulation",
    url: "https://www.media.mit.edu/projects/cityscope/overview/",
    baseUrl: "/",
    onBrokenLinks: "throw",
    favicon: "img/favicon.ico",
    organizationName: "MIT City Science", // Usually your GitHub org/user name.
    projectName: "MIT CityScope", // Usually your repo name.
    themeConfig: {
        navbar: {
            title: "MIT CityScope",
            logo: {
                alt: "Logo",
                src: "img/ML_logo.png",
            },
            items: [
                {
                    to: "docs/",
                    activeBasePath: "docs",
                    label: "Docs",
                    position: "left",
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
            style: "dark",
            copyright: `Copyright © ${new Date().getFullYear()} CityScope, MIT City Science`,
        },
    },
    presets: [
        [
            "@docusaurus/preset-classic",
            {
                docs: {
                    sidebarPath: require.resolve("./sidebars.js"),
                    editUrl: "https://github.com/CityScope/cityscope.github.io",
                },
                theme: {
                    customCss: require.resolve("./src/css/custom.css"),
                },
            },
        ],
    ],
};
