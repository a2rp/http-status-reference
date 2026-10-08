import { FiArrowDownRight, FiArrowRight, FiCheckCircle, FiCompass, FiLayers } from "react-icons/fi";
import StatusLibrary from "./components/statusLibrary/index.jsx";
import SiteHeader from "./components/siteHeader/index.jsx";
import SiteFooter from "./components/siteFooter/index.jsx";
import BackToTop from "./components/backToTop/index.jsx";
import { statusCodes } from "./data/statusCodes.js";
import styles from "./App.module.css";

const App = () => (
    <div className={styles.appShell} id="top">
        <SiteHeader />
        <section className={styles.hero} aria-labelledby="hero-title">
            <div className={styles.heroInner}>
                <div className={styles.heroCopy}>
                    <p className={styles.heroLabel}><FiCompass aria-hidden="true" /> HTTP field guide</p>
                    <h1 id="hero-title">A status code is a clue.<br /><span>Know what to do next.</span></h1>
                    <p className={styles.heroDescription}>Look up the response, understand why it happens, and find a practical next step. Clear explanations for the codes you meet in APIs and on the web.</p>
                    <a className={styles.startLink} href="#reference">Browse status codes <FiArrowRight aria-hidden="true" /></a>
                    <div className={styles.heroStats}>
                        <div><strong>{statusCodes.length}</strong><span>codes explained</span></div>
                        <span className={styles.statsDivider} aria-hidden="true" />
                        <div><strong>5</strong><span>status classes</span></div>
                        <span className={styles.statsDivider} aria-hidden="true" />
                        <div><strong><FiCheckCircle aria-hidden="true" /></strong><span>no sign-in needed</span></div>
                    </div>
                </div>
                <div className={styles.heroVisual} aria-label="HTTP response status classes" role="img">
                    <div className={styles.visualTop}><span><FiLayers aria-hidden="true" /> Response map</span><span>100-599</span></div>
                    <div className={[styles.rangeRow, styles.rangeInfo].join(" ")}><span>1xx</span><div><strong>Informational</strong><small>request in progress</small></div><FiArrowDownRight aria-hidden="true" /></div>
                    <div className={[styles.rangeRow, styles.rangeSuccess].join(" ")}><span>2xx</span><div><strong>Success</strong><small>request understood</small></div><FiArrowDownRight aria-hidden="true" /></div>
                    <div className={[styles.rangeRow, styles.rangeRedirect].join(" ")}><span>3xx</span><div><strong>Redirect</strong><small>look somewhere else</small></div><FiArrowDownRight aria-hidden="true" /></div>
                    <div className={[styles.rangeRow, styles.rangeClient].join(" ")}><span>4xx</span><div><strong>Client error</strong><small>check the request</small></div><FiArrowDownRight aria-hidden="true" /></div>
                    <div className={[styles.rangeRow, styles.rangeServer].join(" ")}><span>5xx</span><div><strong>Server error</strong><small>check the service</small></div><FiCheckCircle aria-hidden="true" /></div>
                    <p className={styles.visualFoot}>One class can contain many different causes.</p>
                </div>
            </div>
            <div className={styles.heroBottom}><span>Start with the first digit</span><a href="#reference" aria-label="Scroll to the status code reference"><FiArrowDownRight aria-hidden="true" /></a></div>
        </section>
        <section className={styles.intro} aria-label="How to use the reference">
            <span className={styles.introNumber}>01</span>
            <p><strong>Search a code or describe the problem.</strong> Each result gives the standard meaning, a common situation, and a suggested next check. Expand any entry for more detail.</p>
            <span className={styles.introNote}>Concise by design</span>
        </section>
        <StatusLibrary />
        <aside className={styles.sourceNote}>
            <div><span className={styles.sourceMark}>i</span><p><strong>About these descriptions</strong><br />Status names and semantics follow HTTP standards. The suggested next step is general guidance; each service may add its own rules and response details.</p></div>
            <a href="https://www.rfc-editor.org/rfc/rfc9110.html" target="_blank" rel="noreferrer">Read RFC 9110 <FiArrowRight aria-hidden="true" /></a>
        </aside>
        <SiteFooter />
        <BackToTop />
    </div>
);

export default App;
