import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <main className={clsx("dark", styles.darkMain)}>
        <div className="container">
          <h1 className="dark__title">{siteConfig.tagline}</h1>
          <p className="dark__subtitle">{siteConfig.title}</p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/intro"
            >
              start ⏱️
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
