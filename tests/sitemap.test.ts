import sitemap from "../src/app/sitemap";
import { markdownAlternatePaths } from "../src/content/markdown-alternates";
import { assert, suite, test } from "./harness";

suite("sitemap and alternates");

const entries = sitemap();
const routes = new Set(entries.map((e) => e.url.replace(/^https:\/\/squarecampus\.com/, "")));

const REQUIRED = [
  "/",
  "/what-is-squarecampus/",
  "/pricing/",
  "/platform/",
  "/security/",
  "/aegis/",
  "/launch-partners/",
  "/launch-partners/higher-education/",
  "/school-management-system/",
  "/multi-campus-school-management-software/",
  "/compare/",
  "/faq/",
  "/about/",
  "/privacy-policy/",
  "/terms-of-service/",
  "/data-processing-addendum/",
  "/llms.txt",
];

test("every URL is absolute, canonical and in trailing-slash form", () => {
  for (const entry of entries) {
    assert.match(entry.url, /^https:\/\/squarecampus\.com\//);
    const path = entry.url.replace(/^https:\/\/squarecampus\.com/, "");
    if (!path.includes(".")) assert.ok(path.endsWith("/"), `${entry.url} lacks a trailing slash`);
  }
});

test("contains every required indexable page", () => {
  for (const route of REQUIRED) assert.ok(routes.has(route), `missing ${route}`);
});

test("every Markdown alternate belongs to an indexable page", () => {
  for (const path of markdownAlternatePaths) {
    const route = path === "/" ? "/" : `${path}/`;
    assert.ok(routes.has(route), `${path} has a Markdown alternate but is not in the sitemap`);
  }
});

test("does not list noindex or redirect routes", () => {
  for (const route of [
    "/hello/",
    "/careers/",
    "/press/",
    "/competitor-notice/",
    "/features/",
    "/contact-us/",
  ]) {
    assert.ok(!routes.has(route), `${route} must not be in the sitemap`);
  }
});
