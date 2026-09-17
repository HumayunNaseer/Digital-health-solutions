import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Mail, Loader2, LockKeyhole, ChevronDown, ChevronUp } from "lucide-react";
import * as Select from "@radix-ui/react-select";
import { Eyebrow } from "./Layout";
import { profile } from "../content/site";
import { sitePath } from "../lib/site-path";
import {
  Inquiry,
  InquiryErrors,
  validateInquiry,
  emailDraftUrl,
  deliverInquiry,
  hasFormDelivery,
} from "../lib/contact";

const initial: Inquiry = {
  name: "",
  email: "",
  organization: "",
  stage: "",
  message: "",
};
const projectInterests = [
  "An idea I’d like to explore",
  "Planning or building an MVP",
  "Improving an existing product",
  "Looking for technical guidance",
  "AI assistant or workflow automation",
];
const fieldNames: Record<keyof Inquiry, string> = {
  name: "Your name",
  email: "Email address",
  organization: "Organization",
  stage: "Project interest",
  message: "What would you like to build or improve?",
};

export function Contact() {
  const [copyStatus, setCopyStatus] = useState("");
  async function copyText(kind: "email" | "inquiry") {
    const text = kind === "email" ? profile.email :
      `To: ${profile.email}\nSubject: Healthcare product inquiry\n\n${new URL(emailDraftUrl(data)).searchParams.get("body") || ""}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus(kind === "email" ? "Email address copied." : "Inquiry copied. Paste it into your email service and send when ready.");
    } catch {
      setCopyStatus("Copy is unavailable in this browser. You can select and copy the email address and your message manually.");
    }
  }
  const [data, setData] = useState<Inquiry>(initial);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "sent" | "draft" | "error"
  >("idle");
  const [draftUrl, setDraftUrl] = useState("");
  const errorRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(0);
  useEffect(() => {
    const interest = new URLSearchParams(window.location.search).get(
      "interest",
    );
    if (interest)
      setData((prev) => ({
        ...prev,
        message: `I’d like to discuss ${interest.slice(0, 250)}.\n\n`,
      }));
  }, []);
  useEffect(() => {
    if (Object.keys(errors).length > 0 && submitted) errorRef.current?.focus();
  }, [submitted]);
  useEffect(() => {
    if (status === "sent" || status === "error" || status === "draft")
      statusRef.current?.focus();
  }, [status]);
  function update(field: keyof Inquiry, value: string) {
    setCopyStatus("");
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (status !== "loading") setStatus("idle");
  }
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (status === "loading") return;
    const validation = validateInquiry(data);
    setErrors(validation);
    setSubmitted((value) => value + 1);
    if (Object.keys(validation).length) return;
    if (!hasFormDelivery) {
      const url = emailDraftUrl(data);
      setDraftUrl(url);
      setStatus("draft");
      window.location.href = url;
      return;
    }
    setStatus("loading");
    try {
      await deliverInquiry(data);
      setStatus("sent");
      setData(initial);
    } catch {
      setStatus("error");
    }
  }
  const errorEntries = Object.entries(errors).filter(([, message]) =>
    Boolean(message),
  );
  return (
    <section className="contact-page">
      <div className="container contact-page-grid">
        <div className="contact-intro">
          <Eyebrow>LET’S TALK ABOUT YOUR PRODUCT</Eyebrow>
          <h1>
            Good things start <br /> with a <em>conversation.</em>
          </h1>
          <p>
            Tell me about the people you’re building for, the workflow you want
            to improve, or the idea you’d like to make real.
          </p>
          <div className="conversation-outline">
            <h2>We can start with</h2>
            <ul>
              <li>
                <Check size={16} aria-hidden="true" />A healthcare product idea
                or MVP
              </li>
              <li>
                <Check size={16} aria-hidden="true" />A care or operational
                workflow
              </li>
              <li>
                <Check size={16} aria-hidden="true" />
                Your existing platform’s next chapter
              </li>
            </ul>
          </div>
          <p>
            You don’t need a finished brief. A little context is enough to start
            finding a useful next step.
          </p>
          <div className="contact-person">
            <img
              src={sitePath("/images/humayun-naseer.jpg")}
              alt=""
              width="55"
              height="55"
            />
            <div>
              <strong>You’ll be talking directly with me.</strong>
              <a href={`mailto:${profile.email}`}>
                {profile.email}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <div>
          <form
            onSubmit={submit}
            noValidate
            className="consultation-form"
            aria-label="Healthcare product inquiry"
          >
            <div className="form-heading">
              <h2>A little about your project.</h2>
              <p>Fields marked with * are required.</p>
            </div>
            {errorEntries.length > 0 && (
              <div
                className="form-error-summary"
                ref={errorRef}
                tabIndex={-1}
                role="alert"
              >
                <h3>Please check the following</h3>
                <ul>
                  {errorEntries.map(([key, value]) => (
                    <li key={key}>
                      <a
                        href={`#${key}`}
                        onClick={(event) => {
                          event.preventDefault();
                          document.getElementById(key)?.focus();
                        }}
                      >
                        {value}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {(status === "sent" ||
              status === "draft" ||
              status === "error") && (
              <div
                className={`form-status ${status === "error" ? "is-error" : ""}`}
                role="status"
                tabIndex={-1}
                ref={statusRef}
              >
                {status === "sent" ? (
                  <>
                    <strong>Thank you. Your inquiry has been sent.</strong>I’ll
                    review your message and get back to you by email.
                  </>
                ) : status === "draft" ? (
                  <>
                    <strong>Your email draft is ready.</strong>Send it from your
                    email app to complete your inquiry. Nothing has been sent by
                    this website. <br />{" "}
                    <a href={draftUrl}>Open the draft again</a> ·{" "}
                    <a href={`mailto:${profile.email}`}>Email me directly</a>
                  </>
                ) : (
                  <>
                    <strong>Your message couldn’t be sent.</strong>Your details
                    are still here. Please try again or{" "}
                    <a href={`mailto:${profile.email}`}>email me directly</a>.
                  </>
                )}
              </div>
            )}
            <div className="form-row">
              {(["name", "email"] as const).map((field) => (
                <div className="form-field" key={field}>
                  <label htmlFor={field}>{fieldNames[field]} *</label>
                  <input
                    id={field}
                    name={field}
                    type={field === "email" ? "email" : "text"}
                    autoComplete={field === "email" ? "email" : "name"}
                    placeholder={
                      field === "email" ? "you@company.com" : "Your name"
                    }
                    required
                    maxLength={field === "name" ? 100 : 254}
                    value={data[field]}
                    disabled={status === "loading"}
                    onChange={(e) => update(field, e.target.value)}
                    aria-invalid={Boolean(errors[field])}
                    aria-describedby={
                      errors[field] ? `${field}-error` : undefined
                    }
                  />
                  {errors[field] && (
                    <p className="field-error" id={`${field}-error`}>
                      {errors[field]}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="form-field">
              <label htmlFor="organization">
                Organization or website <span>optional</span>
              </label>
              <input
                id="organization"
                name="organization"
                autoComplete="organization"
                value={data.organization}
                maxLength={200}
                disabled={status === "loading"}
                placeholder="Your company or clinic"
                onChange={(e) => update("organization", e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="stage">
                What would you like help with? <span>optional</span>
              </label>
              <Select.Root
                name="stage"
                value={data.stage}
                disabled={status === "loading"}
                onValueChange={(value) => update("stage", value)}
              >
                <Select.Trigger id="stage" className="project-select-trigger">
                  <Select.Value placeholder="Select a project interest" />
                  <Select.Icon><ChevronDown size={17} aria-hidden="true" /></Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="project-select-menu" position="popper" sideOffset={8} collisionPadding={16}>
                    <Select.ScrollUpButton className="project-select-scroll"><ChevronUp size={16} aria-hidden="true" /></Select.ScrollUpButton>
                    <Select.Viewport className="project-select-viewport">
                      {projectInterests.map((interest) => (
                        <Select.Item key={interest} value={interest} className="project-select-option">
                          <Select.ItemText>{interest}</Select.ItemText>
                          <Select.ItemIndicator className="project-select-check"><Check size={16} aria-hidden="true" /></Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                    <Select.ScrollDownButton className="project-select-scroll"><ChevronDown size={16} aria-hidden="true" /></Select.ScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
            <div className="form-field">
              <label htmlFor="message">{fieldNames.message} *</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={data.message}
                maxLength={hasFormDelivery ? 5000 : 1200}
                required
                disabled={status === "loading"}
                onChange={(e) => update("message", e.target.value)}
                placeholder="A little about your idea, users, or current challenge…"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={`message-hint${errors.message ? " message-error" : ""}`}
              />
              {errors.message && (
                <p className="field-error" id="message-error">
                  {errors.message}
                </p>
              )}
              <p className="field-hint" id="message-hint">
                Business inquiries only. Please don’t include patient details or
                sensitive health information.
              </p>
            </div>
            <button
              className="button button-primary form-submit"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  Sending inquiry <Loader2 size={17} aria-hidden="true" />
                </>
              ) : hasFormDelivery ? (
                <>
                  Send your inquiry{" "}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </>
              ) : (
                <>
                  Continue by email <Mail size={17} aria-hidden="true" />
                </>
              )}
            </button>
            <div className="contact-copy-actions" aria-label="Copy contact details">
              <button type="button" onClick={() => copyText("email")}>Copy email address</button>
              <button type="button" onClick={() => copyText("inquiry")}>Copy inquiry</button>
            </div>
            <p className="copy-status" role="status" aria-live="polite">{copyStatus}</p>
            <p className="form-note">
              {hasFormDelivery
                ? "Your inquiry goes directly to my inbox."
                : "Your email app opens with a draft for you to review and send."}{" "}
              <br /> Read how your information is handled in the{" "}
              <a href={sitePath("/privacy/")}>privacy notice</a>.
            </p>
          </form>
          <p className="contact-reassurance">
            <LockKeyhole size={15} aria-hidden="true" />
            Your initial message helps us understand the project and decide on a
            useful next step.
          </p>
        </div>
      </div>
    </section>
  );
}
