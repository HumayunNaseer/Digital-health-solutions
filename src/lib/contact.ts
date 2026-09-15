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
  service: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  template: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
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
    data.stage ? `Product stage: ${data.stage}` : "",
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
      message: `${data.message.trim()}\n\nOrganization: ${data.organization || "Not provided"}\nProduct stage: ${data.stage || "Not provided"}`,
      time: new Date().toISOString(),
    },
    { publicKey: settings.publicKey },
  );
}
