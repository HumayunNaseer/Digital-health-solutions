import { ArrowUpRight, ChevronRight } from "lucide-react";
import { Study, studies } from "../content/site";
import { ContactBanner, Eyebrow } from "./Layout";
import { sitePath } from "../lib/site-path";
import {
  CareWorkspace,
  TenantVisual,
  AssessmentVisual,
} from "./ProductVisuals";

export function CaseStudy({ study }: { study: Study }) {
  return (
    <>
      <section className="case-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href={sitePath("/")}>Home</a>
            <ChevronRight size={13} aria-hidden="true" />
            <a href={sitePath("/#work")}>Selected work</a>
            <ChevronRight size={13} aria-hidden="true" />
            <span aria-current="page">{study.name}</span>
          </nav>
          <div className="case-hero-grid">
            <div>
              <Eyebrow>
                {study.name} / {study.category}
              </Eyebrow>
              <h1>{study.title}</h1>
              <p className="case-hero-intro">{study.intro}</p>
            </div>
            <dl className="case-facts">
              <div>
                <dt>Product</dt>
                <dd>{study.name}</dd>
              </div>
              <div>
                <dt>My role</dt>
                <dd>{study.role}</dd>
              </div>
              <div>
                <dt>Experience period</dt>
                <dd>{study.period}</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>
                  {study.focus ??
                    (study.slug === "learnme"
                      ? "Neurodevelopment"
                      : "Brain health")}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
      <div className="container">
        <div className={`case-cover case-cover-${study.tone}`}>
          {study.slug === "neuronest" ? (
            <CareWorkspace compact />
          ) : study.slug === "learnme" ? (
            <TenantVisual />
          ) : (
            <AssessmentVisual />
          )}
        </div>
      </div>
      <article
        className="container case-body"
        aria-label={`${study.name} case study`}
      >
        <section className="case-section">
          <h2>01 / The healthcare challenge</h2>
          <div>
            <h3>
              {study.slug === "neuronest"
                ? "Different responsibilities. Shared context."
                : study.slug === "learnme"
                  ? "A specialized product needs a considered foundation."
                  : "Connecting specialized information with everyday use."}
            </h3>
            <p>{study.challenge}</p>
            <div className="role-pills" aria-label="Product audiences">
              {study.users.map((user) => (
                <span key={user}>{user}</span>
              ))}
            </div>
          </div>
        </section>
        <section className="case-section">
          <h2>02 / Product capabilities</h2>
          <div>
            <div className="case-capabilities">
              {study.capabilities.map((capability, i) => (
                <div className="case-capability" key={capability.title}>
                  <span>0{i + 1}</span>
                  <h3>{capability.title}</h3>
                  <p>{capability.text}</p>
                </div>
              ))}
            </div>
            {study.link && (
              <p className="case-source">
                Product context is based on the{" "}
                <a href={study.link} target="_blank" rel="noreferrer">
                  official REACT Neuro website{" "}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
                .
              </p>
            )}
          </div>
        </section>
        <section className="case-section">
          <h2>03 / My contribution</h2>
          <div>
            <h3>{study.role}</h3>
            <p>{study.contribution}</p>
            {study.delivered && (
              <div className="delivered-work">
                <h3>Selected work I delivered</h3>
                <dl>{study.delivered.map((item) => <div key={item.title}><dt>{item.title}</dt><dd>{item.detail}</dd></div>)}</dl>
              </div>
            )}
          </div>
        </section>
        <section className="case-section">
          <h2>04 / Engineering perspective</h2>
          <div>
            <h3>Technical decisions follow the product.</h3>
            <p>{study.architecture}</p>
            <div className="role-pills" aria-label="Relevant technology">
              {study.technology.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </div>
        </section>
        <section className="case-section">
          <h2>05 / What this experience brings</h2>
          <div className="case-takeaway">
            <p>{study.takeaway}</p>
            <a
              className="case-link"
              href={sitePath(`/contact/?interest=${encodeURIComponent(study.name + " — related healthcare product")}`)}
            >
              Discuss a similar product{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </section>
        <aside className="related-work">
          <p>EXPLORE MORE HEALTHCARE EXPERIENCE</p>
          <div>
            {studies
              .filter((item) => item.slug !== study.slug)
              .map((item) => (
                <a
                  className="text-link"
                  href={sitePath(`/work/${item.slug}/`)}
                  key={item.slug}
                >
                  {item.name}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ))}
          </div>
        </aside>
      </article>
      <ContactBanner />
    </>
  );
}
