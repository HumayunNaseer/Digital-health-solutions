import { useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  CheckCheck,
  ClipboardList,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Plus,
  Users,
  ArrowRight,
  Building2,
  Layers3,
  Brain,
  CircleCheck,
  ChevronRight,
} from "lucide-react";
import { BrandMark } from "./Layout";

const demoViews = {
  coordinator: {
    label: "Care coordinator",
    title: "A clearer view of the day.",
    subtitle: "Care overview",
    rows: [
      ["09:00", "Initial assessment", "Assessment team", "Ready"],
      ["10:30", "Therapy appointment", "Therapy team", "Scheduled"],
      ["14:00", "Family check-in", "Care coordinator", "Scheduled"],
    ],
    note: "The next step, shared.",
    text: "An appointment update is ready for the family.",
  },
  therapist: {
    label: "Therapist",
    title: "More context. Better handoffs.",
    subtitle: "Therapist workspace",
    rows: [
      ["09:00", "Review care context", "Assessment summary", "Ready"],
      ["10:30", "Therapy session", "Appointment details", "Scheduled"],
      ["11:30", "Session follow-up", "Care team update", "Planned"],
    ],
    note: "Keep the team connected.",
    text: "A session update is ready for coordinator review.",
  },
  family: {
    label: "Parent",
    title: "A little more clarity.",
    subtitle: "Family workspace",
    rows: [
      ["09:00", "Your next appointment", "Appointment details", "Ready"],
      ["10:30", "Care team message", "Family communication", "New"],
      ["14:00", "Upcoming check-in", "Care coordinator", "Scheduled"],
    ],
    note: "A care team within reach.",
    text: "Your appointment details and next steps, together.",
  },
};

export function CareWorkspace({ compact = false }: { compact?: boolean }) {
  const [role, setRole] = useState<keyof typeof demoViews>("coordinator");
  const view = demoViews[role];
  return (
    <figure className={`care-visual ${compact ? "care-visual-compact" : ""}`}>
      <div className="visual-orbit orbit-one" aria-hidden="true" />
      <div className="visual-orbit orbit-two" aria-hidden="true" />
      {!compact && (
        <div className="visual-overline">
          <span className="mini-rule" />
          DESIGNED AROUND THE PEOPLE IN CARE
        </div>
      )}
      <div className="workspace-frame">
        <div className="workspace-bar">
          <span className="workspace-logo">
            <BrandMark />
            Care workspace
          </span>
          <span className="workspace-avatar">HN</span>
        </div>
        <div className="workspace-body">
          <div className="workspace-rail" aria-hidden="true">
            <LayoutDashboard />
            <CalendarDays />
            <ClipboardList />
            <MessageSquare />
            <Users />
          </div>
          <div className="workspace-content">
            <div className="workspace-kicker">
              {view.subtitle}
              <span>EXAMPLE DAY</span>
            </div>
            <p className="workspace-title">{view.title}</p>
            <div className="workspace-summary">
              <div>
                <CalendarDays />
                <span>
                  Appointments<small>A shared schedule</small>
                </span>
              </div>
              <div>
                <ClipboardList />
                <span>
                  Assessments<small>Clear next steps</small>
                </span>
              </div>
            </div>
            <div className="schedule-heading">
              <span>Today’s care journey</span>
              <span aria-hidden="true">•••</span>
            </div>
            <div className="schedule-rows">
              {view.rows.map(([time, title, subtitle, status], i) => (
                <div className="schedule-row" key={title}>
                  <span className="schedule-time">{time}</span>
                  <span
                    className={`schedule-marker marker-${i}`}
                    aria-hidden="true"
                  />
                  <div className="schedule-detail">
                    <strong>{title}</strong>
                    <small>{subtitle}</small>
                  </div>
                  <span
                    className={`schedule-status ${i === 0 ? "status-ready" : ""}`}
                  >
                    {status}
                  </span>
                </div>
              ))}
            </div>
            <div className="workspace-message">
              <span className="message-icon">
                <MessageSquare size={17} />
              </span>
              <div>
                <strong>{view.note}</strong>
                <p>{view.text}</p>
              </div>
              <CheckCheck size={17} aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
      {!compact && (
        <>
          <div
            className="role-switch"
            role="group"
            aria-label="Explore illustrative care roles"
          >
            {Object.entries(demoViews).map(([key, item]) => (
              <button
                key={key}
                type="button"
                aria-pressed={role === key}
                onClick={() => setRole(key as keyof typeof demoViews)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <span className="sr-only" aria-live="polite">
            Showing the {view.label.toLowerCase()} illustrative workspace.
          </span>
          <div className="connected-note">
            <span className="connected-icon">
              <Users size={19} />
            </span>
            <div>
              Different roles.<strong>One connected journey.</strong>
            </div>
            <span className="people-stack" aria-hidden="true">
              <i>C</i>
              <i>T</i>
              <i>P</i>
            </span>
          </div>
        </>
      )}
      <figcaption>Illustrative workflow · Synthetic example content</figcaption>
    </figure>
  );
}

export function TenantVisual() {
  return (
    <figure className="tenant-visual">
      <div className="tenant-top">
        <span className="tenant-brand">
          <Layers3 size={21} /> LearnMe
        </span>
        <span className="tiny-label">PLATFORM STRUCTURE</span>
      </div>
      <div className="tenant-core">
        <Layers3 size={25} />
        <span>
          One shared foundation
          <small>Application · Data · Infrastructure</small>
        </span>
      </div>
      <div className="tenant-branches" aria-hidden="true">
        <span />
        <span />
      </div>
      <div className="tenant-workspaces">
        {["Organization A", "Organization B"].map((name) => (
          <div key={name}>
            <Building2 size={22} />
            <strong>{name}</strong>
            <span>Dedicated workspace</span>
            <div className="tenant-feature">
              <Users size={13} />
              Team context
            </div>
            <div className="tenant-feature">
              <FileText size={13} />
              Learning resources
            </div>
          </div>
        ))}
      </div>
      <figcaption>Concept architecture · Illustrative workspaces</figcaption>
    </figure>
  );
}

export function AssessmentVisual() {
  return (
    <figure className="assessment-visual">
      <div className="assessment-top">
        <span>
          <Brain size={21} />
          REACT Neuro
        </span>
        <span className="tiny-label">BRAIN HEALTH</span>
      </div>
      <div className="assessment-steps">
        <div className="assessment-node">
          <ClipboardList size={26} />
          <strong>Assessment</strong>
          <span>A structured experience</span>
        </div>
        <ArrowRight className="step-arrow" size={20} aria-hidden="true" />
        <div className="assessment-node">
          <FileText size={26} />
          <strong>Results</strong>
          <span>Information in context</span>
        </div>
      </div>
      <div className="assessment-share">
        <div className="share-symbol">
          <Users size={24} />
        </div>
        <div>
          <strong>A connected support network</strong>
          <span>Information to view and share</span>
        </div>
        <ArrowUpRight size={18} aria-hidden="true" />
      </div>
      <figcaption>
        Illustrative product context · Not a clinical result
      </figcaption>
    </figure>
  );
}

export function CareJourney() {
  const steps = [
    { icon: ClipboardList, name: "Assessment", who: "Understand the needs" },
    { icon: Users, name: "Coordination", who: "Connect the right people" },
    {
      icon: CalendarDays,
      name: "Appointment",
      who: "Make the next step clear",
    },
    {
      icon: MessageSquare,
      name: "Follow-through",
      who: "Keep everyone informed",
    },
  ];
  return (
    <div
      className="care-journey"
      aria-label="Illustrative connected care journey"
    >
      {steps.map((step, i) => (
        <div className="journey-step" key={step.name}>
          <div className="journey-icon">
            <step.icon size={24} aria-hidden="true" />
          </div>
          <span className="journey-number">0{i + 1}</span>
          <h3>{step.name}</h3>
          <p>{step.who}</p>
          {i < steps.length - 1 && (
            <ChevronRight
              className="journey-arrow"
              size={19}
              aria-hidden="true"
            />
          )}
        </div>
      ))}
    </div>
  );
}
