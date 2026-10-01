// Run: node src/lib/format.test.ts
import assert from "node:assert";
import { duration, t } from "./format.ts";

assert.equal(duration("2023-07-01", "2024-07-01"), "1 yr 1 mo");
assert.equal(duration("2022-09-01", "2023-06-01"), "10 mo");
assert.equal(duration("2024-01-01", "2024-12-01"), "1 yr");
assert.equal(t({ id: "a", en: "x" }), "x");
assert.equal(t({ id: "a" }), "a");
assert.equal(t(null), "");
console.log("ok");
