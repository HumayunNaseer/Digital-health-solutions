import { profile } from "../content/site";

export type Inquiry = {
  name: string;
  email: string;
  organization: string;
  stage: string;
  message: string;
};
export type InquiryErrors = Partial<Record<keyof Inquiry, string>>;

export function validateInquiry(data: Inquiry): InquiryErrors {
  const errors: InquiryErrors = {};
  if (!data.name.trim()) errors.name = "Please enter your name.";
  if (!data.email.trim()) errors.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
    errors.email = "Enter a valid email address, such as you@company.com.";
  if (data.message.trim().length < 15)
    errors.message =
      "Please share a little more about your product or problem (at least 15 characters).";
  return errors;
}

const settings = {
  // Public browser identifiers shared with P-F. Environment overrides remain
  // available so deployment can use a separate service or template later.
  service: import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_fqryn1f",
  template: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_iv84aow",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "Eh62kWt5YZ2OW467Y",
};
export const hasFormDelivery = Boolean(
  settings.service && settings.template && settings.publicKey,
);

export function emailDraftUrl(data: Inquiry) {
  const subject = data.organization.trim()
    ? `Healthcare product inquiry — ${data.organization.trim()}`
    : "Healthcare product inquiry";
  const body = [
    `Hi Humayun,`,
    "",
    data.message.trim(),
    "",
    `Name: ${data.name.trim()}`,
    `Email: ${data.email.trim()}`,
    data.organization.trim() ? `Organization: ${data.organization.trim()}` : "",
    data.stage ? `Project interest: ${data.stage}` : "",
  ].join("\n");
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export async function deliverInquiry(data: Inquiry) {
  if (!hasFormDelivery)
    throw new Error("Email delivery has not been configured.");
  const { default: emailjs } = await import("@emailjs/browser");
  const subject = data.organization.trim()
    ? `Healthcare product inquiry — ${data.organization.trim()}`
    : "Healthcare product inquiry";
  await emailjs.send(
    settings.service,
    settings.template,
    {
      name: data.name.trim(),
      email: data.email.trim(),
      reply_to: data.email.trim(),
      subject,
      // Keep the existing template usable until the formatted template is saved.
      message: [
        "PROJECT DESCRIPTION",
        data.message.trim(),
        "",
        "ORGANIZATION / WEBSITE",
        data.organization.trim() || "Not provided",
        "",
        "PROJECT INTEREST",
        data.stage || "Not selected",
      ].join("\n"),
      inquiry_message: data.message.trim(),
      organization: data.organization.trim() || "Not provided",
      project_interest: data.stage || "Not selected",
      source: "Healthcare portfolio",
      time: new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Karachi",
      }).format(new Date()) + " (PKT)",
    },
    { publicKey: settings.publicKey },
  );
}
