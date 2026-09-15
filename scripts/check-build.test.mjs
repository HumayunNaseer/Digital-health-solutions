import test, { after } from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";
import { createServer } from "vite";

const routes = [
  "/",
  "/work/neuronest/",
  "/work/learnme/",
  "/work/reactneuro/",
  "/contact/",
  "/privacy/",
  "/404/",
];
const htmlFor = (route) =>
  readFile(resolve("dist", `.${route}`, "index.html"), "utf8");
let server;
after(async () => {
  if (server) await server.close();
});

test("every public route ships its own content and unique metadata", async () => {
  const titles = new Set();
  for (const route of routes) {
    const html = await htmlFor(route);
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title, `Missing title on ${route}`);
    assert.ok(!titles.has(title), `Repeated title on ${route}`);
    titles.add(title);
    assert.equal(
      (html.match(/<h1[ >]/g) || []).length,
      1,
      `One h1 on ${route}`,
    );
    assert.match(html, /<main[^>]+id="main"/);
    assert.doesNotMatch(html, /<!--app-html-->|\/src\/main\.tsx|maximum-scale/);
    assert.ok(
      /<meta\s+name="description"\s+content="[^"]+"/.test(html),
      `Missing description on ${route}`,
    );
    const ogTitle = html.match(
      /<meta\s+property="og:title"\s+content="([^"]+)"/,
    )?.[1];
    assert.equal(ogTitle, title, `Sharing title must match ${route}`);
    if (route.startsWith("/work/"))
      assert.notEqual(
        html.match(/<meta\s+name="description"\s+content="([^"]+)"/)?.[1],
        (await htmlFor("/")).match(
          /<meta\s+name="description"\s+content="([^"]+)"/,
        )?.[1],
        `Case description must be specific to ${route}`,
      );
  }
});

test("local navigation and asset links resolve within the built site", async () => {
  for (const route of routes) {
    const html = await htmlFor(route);
    const links = [...html.matchAll(/(?:href|src)="(\/[^" ]*)"/g)].map(
      (match) => match[1],
    );
    for (const link of links) {
      const target = new URL(
        link.replaceAll("&amp;", "&"),
        "https://portfolio.test",
      );
      const targetPath = target.pathname;
      if (targetPath.includes("."))
        await access(resolve("dist", `.${targetPath}`));
      else {
        const normalized = targetPath.endsWith("/")
          ? targetPath
          : `${targetPath}/`;
        assert.ok(
          routes.includes(normalized),
          `${route} links to missing route ${link}`,
        );
        if (target.hash)
          assert.ok(
            (await htmlFor(normalized)).includes(
              `id="${target.hash.slice(1)}"`,
            ),
            `Missing anchor ${link}`,
          );
      }
    }
  }
});

test("contact validation rejects incomplete inquiries and safely constructs drafts", async () => {
  server = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
  const { validateInquiry, emailDraftUrl } = await server.ssrLoadModule(
    "/src/lib/contact.ts",
  );
  const empty = {
    name: "",
    email: "",
    organization: "",
    stage: "",
    message: "",
  };
  assert.deepEqual(Object.keys(validateInquiry(empty)).sort(), [
    "email",
    "message",
    "name",
  ]);
  const valid = {
    name: "Test Person",
    email: "test@example.com",
    organization: "Clinic & Co",
    stage: "Planning an MVP",
    message:
      "We want to coordinate appointments across our care team.\nDo you support multi-role workflows?",
  };
  assert.deepEqual(validateInquiry(valid), {});
  assert.ok(validateInquiry({ ...valid, email: "invalid@address" }).email);
  const draft = new URL(emailDraftUrl(valid));
  assert.equal(draft.protocol, "mailto:");
  assert.equal(draft.pathname, "humayunnaseer5@gmail.com");
  assert.equal(
    draft.searchParams.get("subject"),
    "Healthcare product inquiry — Clinic & Co",
  );
  assert.ok(draft.searchParams.get("body").includes(valid.message));
  assert.ok(draft.searchParams.get("body").includes(valid.email));
  assert.equal([...draft.searchParams.keys()].length, 2);
});

test("core text and action colors have sufficient contrast", () => {
  const luminance = (hex) => {
    const channels = hex
      .match(/[a-f\d]{2}/gi)
      .map((value) => parseInt(value, 16) / 255)
      .map((value) =>
        value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
      );
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };
  for (const [fg, bg] of [
    ["173e3b", "f8f7f3"],
    ["52665f", "f8f7f3"],
    ["ffffff", "216c5b"],
    ["c2d4c8", "173e3b"],
    ["52665f", "e5ede7"],
  ]) {
    const values = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
    const ratio = (values[0] + 0.05) / (values[1] + 0.05);
    assert.ok(ratio >= 4.5, `${fg} on ${bg}: ${ratio.toFixed(2)}:1`);
  }
});
