import assert from "node:assert/strict";
import test from "node:test";
import { filterStatusCodes, statusCategories, statusCodes } from "./statusCodes.js";

test("status codes are unique valid three-digit HTTP codes", () => {
    const codes = statusCodes.map(({ code }) => code);
    assert.equal(new Set(codes).size, codes.length);
    assert.ok(codes.every((code) => Number.isInteger(code) && code >= 100 && code <= 599));
});

test("each entry has readable guidance and a category that matches its range", () => {
    const categoryForRange = { 1: "informational", 2: "success", 3: "redirection", 4: "clientError", 5: "serverError" };
    for (const entry of statusCodes) {
        assert.ok(entry.title && entry.summary && entry.when && entry.next, `Missing guidance for ${entry.code}`);
        assert.equal(entry.category, categoryForRange[Math.floor(entry.code / 100)]);
    }
});

test("category filters represent the five HTTP status classes", () => {
    assert.deepEqual(statusCategories.slice(1).map(({ id }) => id), ["informational", "success", "redirection", "clientError", "serverError"]);
});

test("rate limiting and temporary unavailability include retry guidance", () => {
    const rateLimit = statusCodes.find(({ code }) => code === 429);
    const unavailable = statusCodes.find(({ code }) => code === 503);
    assert.match(rateLimit.next, /Retry-After/);
    assert.match(unavailable.next, /Retry-After/);
});

test("legacy 418 entry is explicitly marked unused", () => {
    assert.match(statusCodes.find(({ code }) => code === 418).title, /Unused/);
});

test("search matches codes, names, and guidance without case sensitivity", () => {
    assert.deepEqual(filterStatusCodes(statusCodes, "429").map(({ code }) => code), [429]);
    assert.deepEqual(filterStatusCodes(statusCodes, "not found").map(({ code }) => code), [404]);
    assert.ok(filterStatusCodes(statusCodes, "RETRY-AFTER").some(({ code }) => code === 503));
});

test("class filters combine with the search query", () => {
    assert.deepEqual(filterStatusCodes(statusCodes, "", "success").map(({ code }) => code), [200, 201, 202, 204, 206]);
    assert.deepEqual(filterStatusCodes(statusCodes, "retry-after", "serverError").map(({ code }) => code), [503]);
});
