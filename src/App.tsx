import { useEffect } from "react";
import { Header, Footer, Eyebrow, ActionLink } from "./components/Layout";
import { Home } from "./components/Home";
import { CaseStudy } from "./components/CaseStudy";
import { Contact } from "./components/Contact";
import { Privacy } from "./components/Privacy";
import { studies, pageInfo } from "./content/site";

export function normalizePath(path: string) {
  return path === "/" ? "/" : `/${path.split("/").filter(Boolean).join("/")}/`;
}

export function getPageMeta(path: string) {
  const normalized = normalizePath(path);
  const study = studies.find((item) => normalized === `/work/${item.slug}/`);
  return study
    ? {
        title: `${study.name} Case Study — Humayun Naseer`,
        description: study.short,
      }
    : pageInfo[normalized as keyof typeof pageInfo] || {
        title: "Page Not Found — Humayun Naseer",
        description:
          "Find healthcare case studies or discuss your product with Humayun Naseer.",
      };
}

export function App({ path = "/" }: { path?: string }) {
  const normalized = normalizePath(path);
  const study = studies.find((item) => normalized === `/work/${item.slug}/`);
  useEffect(() => {
    const meta = getPageMeta(normalized);
    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", meta.description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", meta.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", meta.description);
  }, [normalized]);
  return (
    <>
      <Header path={normalized} />
      <main id="main" tabIndex={-1}>
        {normalized === "/" ? (
          <Home />
        ) : study ? (
          <CaseStudy study={study} />
        ) : normalized === "/contact/" ? (
          <Contact />
        ) : normalized === "/privacy/" ? (
          <Privacy />
        ) : (
          <section className="not-found">
            <Eyebrow>404 / A DIFFERENT PATH</Eyebrow>
            <h1>
              Let’s get you
              <br />
              <em>back to the right place.</em>
            </h1>
            <p>
              This page isn’t here. Explore the healthcare work or get in touch
              about your product.
            </p>
            <ActionLink href="/">Back to the homepage</ActionLink>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
