import { Eyebrow } from "./Layout";
import { profile } from "../content/site";
import { hasFormDelivery } from "../lib/contact";

export function Privacy() {
  return (
    <div className="container">
      <article className="privacy-page">
        <Eyebrow>YOUR INFORMATION</Eyebrow>
        <h1>Privacy, in plain language.</h1>
        <p className="updated">Last updated: 17 September 2026</p>
        <p>
          This portfolio introduces my healthcare technology work and lets you
          contact me about a business project.
        </p>
        <h2>When you get in touch</h2>
        <p>
          The inquiry form asks for your name, email address, and a description
          of your project. Organization and project interest are optional. I use
          information you send to understand your inquiry and respond.
        </p>
        {hasFormDelivery ? (
          <p>
            Form inquiries are delivered through EmailJS. When you submit, the
            information you enter is shared with EmailJS and the configured
            email service for delivery to my inbox. You can also contact me
            directly using your own email service.
          </p>
        ) : (
          <p>
            The form prepares an email draft in your own email app. This website
            does not send or store the draft. You choose whether to send it;
            your email provider handles that transmission. The information stays
            in the page while you fill out the form and is not saved by this
            site when you leave.
          </p>
        )}
        <p>The copy buttons place the email address or your inquiry on your clipboard when you choose to use them. Copying does not send your inquiry.</p>
        <h2>Keep patient information out of inquiries</h2>
        <p>
          This is a business portfolio, not a patient portal or a place to
          request clinical care. Please do not include medical records, patient
          identifiers, or other sensitive health information in an inquiry.
        </p>
        <h2>Website information</h2>
        <p>
          This application does not use advertising trackers, behavioral
          analytics, or browser storage. Fonts and the portfolio portrait are
          served with the site. The hosting service may process ordinary request
          information to serve and operate the website.
        </p>
        <h2>Links to other websites</h2>
        <p>
          Links to LinkedIn and product websites take you to services with their
          own privacy practices. Illustrative product interfaces on this site
          use synthetic content and do not display patient records.
        </p>
        <h2>Questions or deletion requests</h2>
        <p>
          To ask about information you have sent me, or to request its deletion
          from my correspondence, email{" "}
          <a href={`mailto:${profile.email}`}>{profile.email}</a>.
        </p>
      </article>
    </div>
  );
}
