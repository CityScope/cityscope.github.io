import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";
import ThreeScene from "./ThreeScene";

function Home() {
    const context = useDocusaurusContext();
    const { siteConfig = {} } = context;
    return (
        <Layout
            title={`${siteConfig.title}`}
            description="MIT CityScope project"
        >
            <div className="container">
                <div className={(styles.buttons, "fixedCenterPosition")}>
                    <Link
                        className={clsx(
                            "button button--outline button--secondary button--lg",
                            styles.getStarted
                        )}
                        to={useBaseUrl("docs/")}
                    >
                        <h1 className="legotitle">
                            {siteConfig.title}
                        </h1>
                    </Link>
                </div>
            </div>
            <ThreeScene />
        </Layout>
    );
}

export default Home;
