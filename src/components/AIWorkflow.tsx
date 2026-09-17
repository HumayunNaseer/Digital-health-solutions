import { BookOpen, MessageSquare, Workflow, Check, ArrowDown } from "lucide-react";
import { ActionLink, Eyebrow } from "./Layout";

const offerings = [
  { icon: MessageSquare, title: "AI assistants & chatbots", text: "Guide people through service questions and onboarding, with a clear handoff to your team." },
  { icon: BookOpen, title: "Knowledge assistants", text: "Help staff find answers in approved organizational documents, with sources they can review." },
  { icon: Workflow, title: "AI agents & automation", text: "Connect tools to carry out defined workflow tasks, with permissions and human approval built into the scope." },
];

export function AIWorkflow() {
  return (
    <section className="section ai-section" id="ai" aria-labelledby="ai-heading">
      <div className="container ai-grid">
        <div>
          <Eyebrow>APPLIED AI / HUMAN CONTEXT</Eyebrow>
          <h2 id="ai-heading">Useful intelligence.<br /><em>Thoughtfully integrated.</em></h2>
          <p className="ai-intro">I help you explore and build AI features around the work your people actually do—from a helpful first answer to a carefully coordinated next step.</p>
          <div className="ai-offerings">
            {offerings.map(({ icon: Icon, title, text }) => (
              <div className="ai-offering" key={title}>
                <Icon size={21} strokeWidth={1.6} aria-hidden="true" />
                <div><h3>{title}</h3><p>{text}</p></div>
              </div>
            ))}
          </div>
          <ActionLink href="/contact/?interest=AI%20assistant%20or%20workflow%20automation">Explore an AI use case</ActionLink>
        </div>
        <figure className="ai-example">
          <div className="ai-example-top"><span>WORKFLOW CONCEPT</span><span className="ai-example-status">Human review included</span></div>
          <h3>A request.<br />A considered next step.</h3>
          <p className="ai-example-intro">An example of a coordinator-assisted scheduling workflow.</p>
          <ol className="ai-steps">
            <li><span className="ai-step-number">01</span><div><span className="ai-step-label">THE REQUEST</span><p>“Find available times for a team introduction next week.”</p></div></li>
            <li><span className="ai-step-number">02</span><div><span className="ai-step-label">THE AGENT PROPOSES</span><p>Check permitted calendars, suggest suitable times, and prepare an invitation.</p><div className="ai-proposal"><span>Suggested time</span><strong>Tuesday · 10:00–10:20</strong><span>Draft invitation · not sent</span></div></div></li>
            <li><span className="ai-step-number ai-step-review"><Check size={17} aria-hidden="true" /></span><div><span className="ai-step-label">THE COORDINATOR DECIDES</span><p>Review the time and recipients. Approve or edit before anything is sent.</p></div></li>
          </ol>
          <div className="ai-example-footer"><ArrowDown size={15} aria-hidden="true" /><span>Defined scope. Visible actions. Human control.</span></div>
          <figcaption>Illustrative workflow with synthetic content. A proposed service example, not a live agent or client result.</figcaption>
        </figure>
      </div>
    </section>
  );
}
