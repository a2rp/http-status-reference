import { useState } from "react";
import { FiCheck, FiChevronDown, FiCopy } from "react-icons/fi";
import styles from "./styles.module.css";

const StatusCard = ({ status, expanded, onToggle }) => {
    const [copyState, setCopyState] = useState("idle");
    const detailId = `status-detail-${status.code}`;

    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(String(status.code));
            setCopyState("copied");
            window.setTimeout(() => setCopyState("idle"), 1500);
        } catch {
            setCopyState("failed");
            window.setTimeout(() => setCopyState("idle"), 2000);
        }
    };

    return (
        <article className={`${styles.card} ${styles[status.category]} ${expanded ? styles.expanded : ""}`}>
            <div className={styles.cardTop}>
                <span className={styles.code}>{status.code}</span>
                {status.common && <span className={styles.common}>Common</span>}
                <button className={styles.copyButton} type="button" onClick={copyCode} aria-label={`Copy status code ${status.code}`} title={`Copy ${status.code}`}>
                    {copyState === "copied" ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
                    <span>{copyState === "copied" ? "Copied" : copyState === "failed" ? "Unavailable" : "Copy"}</span>
                </button>
            </div>
            <h3 className={styles.title}>{status.title}</h3>
            <p className={styles.summary}>{status.summary}</p>
            <button className={styles.detailsToggle} type="button" aria-expanded={expanded} aria-controls={detailId} onClick={onToggle}>
                <span>{expanded ? "Hide details" : "When it appears"}</span>
                <FiChevronDown aria-hidden="true" />
            </button>
            <div className={styles.details} id={detailId} hidden={!expanded}>
                <p className={styles.when}>{status.when}</p>
                <p className={styles.nextLabel}>What to check next</p>
                <p className={styles.next}>{status.next}</p>
                {status.header && <p className={styles.headerNote}>{status.header}</p>}
            </div>
        </article>
    );
};

export default StatusCard;
