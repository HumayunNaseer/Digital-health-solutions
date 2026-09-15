import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Workflow,
  RefreshCw,
  Check,
  Plus,
  Layers3,
  ShieldCheck,
  Plug,
  Code2,
} from "lucide-react";
import { studies, faqs, profile } from "../content/site";
import { ActionLink, Eyebrow, ContactBanner } from "./Layout";
import {
  CareWorkspace,
  CareJourney,
  TenantVisual,
  AssessmentVisual,
} from "./ProductVisuals";

export function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <Eyebrow>HEALTHCARE TECHNOLOGY & PRODUCT CONSULTING</Eyebrow>
            <h1>
              Healthcare technology, <br /> built around <br />{" "}
              <em>the way care works.</em>
            </h1>
            <p className="hero-description">
              I help healthcare founders and care organizations turn complex
              workflows into thoughtful digital products.
            </p>
            <p className="hero-support">
              From assessments and appointments to connected teams and
              better-informed families.
            </p>
            <div className="hero-actions">
              <ActionLink>Discuss your healthcare product</ActionLink>
              <a className="text-link" href="#work">
                Explore the work <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
            <div className="hero-signature">
              <img
                src="/images/humayun-naseer.jpg"
                alt=""
                width="40"
                height="40"
              />
              <span>
                Hi, I’m Humayun.
                <small>Your product thinking & engineering partner.</small>
              </span>
            </div>
          </div>
          <CareWorkspace />
        </div>
      </section>
      <div className="experience-strip">
        <div className="container experience-inner">
          <p>
            SELECTED EXPERIENCE IN <br />{" "}
            <strong>healthcare & neurodevelopment</strong>
          </p>
          <a href="/work/neuronest/" className="wordmark wordmark-neuronest">
            neuro<span>nest</span>
          </a>
          <a href="/work/learnme/" className="wordmark wordmark-learnme">
            Learn<span>Me</span>
            <span className="wordmark-dot" aria-hidden="true" />
          </a>
          <a href="/work/reactneuro/" className="wordmark wordmark-react">
            REACT<span>NEURO</span>
          </a>
          <span className="experience-caption">
            Product experience. <br /> A healthcare perspective.
          </span>
        </div>
      </div>
      <section className="section workflow-section">
        <div className="container">
          <div className="section-intro split-intro">
            <div>
              <Eyebrow>THE WORKFLOW COMES FIRST</Eyebrow>
              <h2>
                Care is connected. <br />{" "}
                <em>Your technology should be, too.</em>
              </h2>
            </div>
            <p>
              When appointments, assessments, and communication live in separate
              places, the handoffs become harder. I help shape products around
              the people, decisions, and next steps that connect them.
            </p>
          </div>
          <CareJourney />
          <p className="journey-caption">
            A simplified care journey. The right product starts with
            understanding yours.
          </p>
        </div>
      </section>
      <section className="section work-section" id="work">
        <div className="container">
          <div className="section-intro section-intro-inline">
            <div>
              <Eyebrow>SELECTED HEALTHCARE WORK</Eyebrow>
              <h2>
                Experience with the <br /> <em>complexity behind care.</em>
              </h2>
            </div>
            <p>
              Three perspectives on building <br /> technology for healthcare.
            </p>
          </div>
          <article className="flagship">
            <div className="flagship-copy">
              <div className="feature-label">
                <span>01 / FEATURED EXPERIENCE</span>
                <span>2026</span>
              </div>
              <h3>NeuroNest</h3>
              <p className="flagship-headline">
                One care journey. <br /> Many people working together.
              </p>
              <p className="flagship-description">
                Assessments, therapy coordination, and family engagement across
                a multi-role healthcare platform.
              </p>
              <div className="tag-list">
                <span>Care coordination</span>
                <span>Assessments</span>
                <span>Family engagement</span>
              </div>
              <a href="/work/neuronest/" className="case-link light-link">
                Explore the case study{" "}
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
            </div>
            <div className="flagship-visual">
              <CareWorkspace compact />
            </div>
          </article>
          <div className="secondary-studies">
            {studies.slice(1).map((study, i) => (
              <article
                className={`study-card study-${study.tone}`}
                key={study.slug}
              >
                <a
                  className="study-graphic-link"
                  href={`/work/${study.slug}/`}
                  aria-label={`Explore the ${study.name} case study`}
                >
                  {study.slug === "learnme" ? (
                    <TenantVisual />
                  ) : (
                    <AssessmentVisual />
                  )}
                </a>
                <div className="study-card-copy">
                  <span className="study-category">
                    0{i + 2} /{" "}
                    {study.slug === "learnme"
                      ? "NEURODEVELOPMENT"
                      : "BRAIN HEALTH"}
                  </span>
                  <h3>
                    <a href={`/work/${study.slug}/`}>
                      {study.name}
                      <ArrowUpRight size={24} aria-hidden="true" />
                    </a>
                  </h3>
                  <p>{study.short}</p>
                  <a className="text-link" href={`/work/${study.slug}/`}>
                    Read the case study{" "}
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section solutions-section" id="solutions">
        <div className="container">
          <div className="section-intro split-intro">
            <div>
              <Eyebrow>HOW I CAN HELP</Eyebrow>
              <h2>
                A useful next step. <br /> <em>At any product stage.</em>
              </h2>
            </div>
            <p>
              Whether you’re starting with an idea or improving a platform
              already in use, the work begins with what your people need.
            </p>
          </div>
          <div className="service-grid">
            {[
              {
                icon: Compass,
                number: "01",
                title: "Shape & build your MVP",
                text: "Turn a healthcare idea into a focused, achievable first product.",
                items: [
                  "Workflow & product discovery",
                  "Scope, prototypes & architecture",
                  "MVP development & delivery",
                ],
                label: "For the idea ready to take shape",
              },
              {
                icon: Workflow,
                number: "02",
                title: "Connect care & operations",
                text: "Bring the people and processes around care into a coherent experience.",
                items: [
                  "Patient & parent portals",
                  "Assessments, scheduling & reporting",
                  "Clinician & coordinator workspaces",
                ],
                label: "For the workflow that could work better",
              },
              {
                icon: RefreshCw,
                number: "03",
                title: "Evolve your platform",
                text: "Move an existing healthcare product forward with considered improvements.",
                items: [
                  "Product & architecture review",
                  "Integrations & workflow improvements",
                  "Performance & maintainable growth",
                ],
                label: "For the product with more to do",
              },
            ].map((service) => (
              <article className="service" key={service.number}>
                <div className="service-top">
                  <service.icon
                    size={27}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span>{service.number}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>
                      <Check size={15} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={`/contact/?interest=${encodeURIComponent(service.title)}`}
                >
                  {service.label}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section approach-section" id="approach">
        <div className="container approach-grid">
          <div className="approach-intro">
            <Eyebrow>A CLEAR WAY OF WORKING</Eyebrow>
            <h2>
              Thoughtful decisions. <br /> <em>Visible progress.</em>
            </h2>
            <p>
              Good healthcare software starts with listening. I work with you to
              understand the context, make the scope clear, and keep the product
              moving in reviewable steps.
            </p>
            <ActionLink secondary>Talk through your next step</ActionLink>
          </div>
          <div className="process-list">
            {[
              [
                "Understand the workflow",
                "The people, the pain points, and what a better experience needs to make possible.",
                "Workflow & problem map",
              ],
              [
                "Define the right first step",
                "Agree on priorities, product scope, and the technical choices that support them.",
                "A practical delivery plan",
              ],
              [
                "Build, share, and refine",
                "Work in demonstrable increments, with feedback from the people closest to the product.",
                "Reviewable product increments",
              ],
              [
                "Launch with a clear handover",
                "Prepare the product for use, document the essentials, and agree on what comes next.",
                "Launch & handover plan",
              ],
            ].map(([title, desc, deliverable], i) => (
              <div className="process-step" key={title}>
                <span className="process-number">0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <span className="process-deliverable">
                    <ArrowRight size={13} aria-hidden="true" />
                    {deliverable}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section partner-section" id="about">
        <div className="container partner-grid">
          <div className="portrait-composition">
            <div className="portrait-label">THE PERSON BEHIND THE WORK</div>
            <img
              src="/images/humayun-naseer.jpg"
              alt="Humayun Naseer, healthcare technology partner"
              width="700"
              height="700"
              loading="lazy"
            />
            <div className="portrait-caption">
              <strong>Humayun Naseer</strong>
              <span>Product thinking. Hands-on delivery.</span>
            </div>
          </div>
          <div className="partner-copy">
            <Eyebrow>YOUR HEALTHCARE TECHNOLOGY PARTNER</Eyebrow>
            <h2>
              A real person. <br /> <em>Invested in your product.</em>
            </h2>
            <p className="large-copy">
              I bring an engineer’s attention to detail and a product partner’s
              curiosity about how care actually works.
            </p>
            <p>
              My background spans Ruby on Rails and React development with
              international product teams. Work across NeuroNest, LearnMe, and
              ReactNeuro has given me experience in the practical complexity of
              healthcare and neurodevelopment products.
            </p>
            <p>
              That experience shapes how I approach your project: understand the
              people, clarify the workflow, and build a foundation that can
              evolve.
            </p>
            <div className="partner-principles">
              <span>
                <Check size={16} />
                Direct collaboration
              </span>
              <span>
                <Check size={16} />
                Clear technical thinking
              </span>
              <span>
                <Check size={16} />
                Care for the details
              </span>
            </div>
            <a
              className="text-link"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              More about my background{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      <section className="section capabilities-section">
        <div className="container">
          <div className="section-intro split-intro">
            <div>
              <Eyebrow>THE ENGINEERING BEHIND THE EXPERIENCE</Eyebrow>
              <h2>
                Built for the workflow. <br /> <em>Ready for what’s next.</em>
              </h2>
            </div>
            <p>
              Technology choices serve the product. Here are the capabilities I
              bring to designing and delivering healthcare solutions.
            </p>
          </div>
          <div className="capability-list">
            {[
              {
                icon: Code2,
                title: "Thoughtful product experiences",
                copy: "Portals and workspaces shaped around their users.",
                tech: "React · TypeScript · JavaScript",
              },
              {
                icon: Layers3,
                title: "A maintainable product foundation",
                copy: "Business logic, data models, and multi-tenant applications.",
                tech: "Ruby on Rails · PostgreSQL · AWS",
              },
              {
                icon: Plug,
                title: "Connected services & communication",
                copy: "Integrations that fit into a wider product workflow.",
                tech: "REST APIs · WebSockets · Stripe · Zoom",
              },
              {
                icon: ShieldCheck,
                title: "Considered architecture & assistance",
                copy: "Access boundaries, evolving requirements, and scoped AI assistance.",
                tech: "Role-based workflows · AI / LLM integrations",
              },
            ].map((item) => (
              <div className="capability-row" key={item.title}>
                <item.icon size={24} strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
                <span>{item.tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section faq-section">
        <div className="container faq-grid">
          <div>
            <Eyebrow>A FEW USEFUL ANSWERS</Eyebrow>
            <h2>
              Before we <br /> <em>start talking.</em>
            </h2>
            <p>
              Have something else in mind? <br />{" "}
              <a href="/contact/" className="text-link">
                Let’s discuss it <ArrowUpRight size={16} />
              </a>
            </p>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <Plus size={18} aria-hidden="true" />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <ContactBanner />
    </>
  );
}
