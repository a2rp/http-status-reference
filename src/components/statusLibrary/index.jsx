import { useMemo, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { filterStatusCodes, statusCategories, statusCodes } from "../../data/statusCodes.js";
import StatusCard from "./statusCard/index.jsx";
import styles from "./styles.module.css";

const StatusLibrary = () => {
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [expandedCode, setExpandedCode] = useState(null);
    const normalizedQuery = query.trim().toLowerCase();
    const visibleStatuses = useMemo(() => filterStatusCodes(statusCodes, normalizedQuery, activeCategory), [activeCategory, normalizedQuery]);

    const getCount = (categoryId) => categoryId === "all" ? statusCodes.length : statusCodes.filter(({ category }) => category === categoryId).length;

    return (
        <main className={styles.library} id="reference">
            <div className={styles.libraryHeading}>
                <div>
                    <p className={styles.sectionLabel}>The reference</p>
                    <h2>Find a response code</h2>
                </div>
                <p className={styles.resultCount} aria-live="polite">{visibleStatuses.length} of {statusCodes.length} codes</p>
            </div>
            <div className={styles.searchRow}>
                <label className={styles.searchBox}>
                    <FiSearch aria-hidden="true" />
                    <span className={styles.visuallyHidden}>Search status codes</span>
                    <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by code, name, or meaning..." />
                    {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><FiX aria-hidden="true" /></button>}
                </label>
                <p className={styles.searchHint}>Try “429”, “redirect”, or “authentication”</p>
            </div>
            <div className={styles.filters} id="status-classes" role="group" aria-label="Filter by status class">
                {statusCategories.map(({ id, label }) => (
                    <button key={id} className={`${styles.filter} ${activeCategory === id ? styles.activeFilter : ""}`} type="button" aria-pressed={activeCategory === id} onClick={() => setActiveCategory(id)}>
                        <span>{label}</span><span className={styles.filterCount}>{getCount(id)}</span>
                    </button>
                ))}
            </div>
            {visibleStatuses.length > 0 ? (
                <div className={styles.grid}>
                    {visibleStatuses.map((status) => (
                        <StatusCard key={status.code} status={status} expanded={expandedCode === status.code} onToggle={() => setExpandedCode(expandedCode === status.code ? null : status.code)} />
                    ))}
                </div>
            ) : (
                <div className={styles.emptyState}>
                    <span className={styles.emptyCode}>?</span>
                    <h3>No matching codes</h3>
                    <p>Try a different search or reset the filters to browse every response.</p>
                    <button type="button" onClick={() => { setQuery(""); setActiveCategory("all"); }}>Clear search and filters</button>
                </div>
            )}
            <p className={styles.referenceNote}>A status code gives a broad result. The response body and service documentation provide context for a specific API.</p>
        </main>
    );
};

export default StatusLibrary;
