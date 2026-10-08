import { FiArrowDown, FiGithub } from "react-icons/fi";
import styles from "./styles.module.css";

const SiteHeader = () => (
    <header className={styles.header}>
        <a className={styles.brand} href="#top" aria-label="HTTP Status Reference home">
            <span className={styles.brandMark}>H</span>
            <span>status<span className={styles.brandAccent}>.guide</span></span>
        </a>
        <nav className={styles.navigation} aria-label="Main navigation">
            <a href="#reference">Reference</a>
            <a href="#status-classes">Status classes <FiArrowDown aria-hidden="true" /></a>
        </nav>
        <a className={styles.repository} href="https://github.com/a2rp/http-status-reference" target="_blank" rel="noreferrer">
            <FiGithub aria-hidden="true" /> <span>Repository</span>
        </a>
    </header>
);

export default SiteHeader;
