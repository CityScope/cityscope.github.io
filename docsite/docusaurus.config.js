module.exports = {
    title: "Here We Build CityScope",
    tagline: "Urban Modelling & Simulation",
    url: "https://cityscope.media.mit.edu",
    baseUrl: "/",
    onBrokenLinks: "throw",
    favicon: "img/favicon.ico",
    organizationName: "CityScope", // Usually your GitHub org/user name.
    projectName: "cityscope.github.io", // Usually your repo name.
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
            logo: {
                alt: "Logo",
                src: "img/ML_logo_sml.png",
                href: "https://github.com/CityScope",
            },
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
