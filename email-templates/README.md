# Activate the formatted inquiry email

The application sends structured fields; the email layout is saved in EmailJS.

1. Open Email Templates in the EmailJS dashboard.
2. The current template is `template_iv84aow`, shared with P-F. Prefer duplicating it for this healthcare portfolio so P-F retains its current email design.
3. Open the template content's HTML/code editor and paste `healthcare-inquiry.html`.
4. Set Subject to `{{subject}}`, To Email to `humayunnaseer5@gmail.com`, From Name to `Healthcare portfolio`, and Reply To to `{{email}}`. Keep the configured service's sender address; the visitor is the reply recipient.
5. Save. If you duplicated the template, set `VITE_EMAILJS_TEMPLATE_ID` to the new ID in `.env.local`, restart development, and rebuild before deploying. The production build must use this override too.
6. Preview with synthetic sample values, then submit a test inquiry and confirm the reply address and layout in your inbox.

Variables: `name`, `email`, `subject`, `organization`, `project_interest`, `inquiry_message`, `time`, `source`. The existing `message` and `reply_to` fields remain available for older templates. Double-brace variables escape visitor text. Do not replace them with unescaped triple braces.

The design uses inline styles, table layout, system fonts, and no external images. The green cross brand mark is drawn with colored table cells so it does not depend on remote images or SVG support. The header and signature use Mohammad Humayun Naseer — Senior Product Engineer. Actual rendering can vary between email clients.

## Sender's automatic reply

The confirmation email sent back to the visitor is separate from the inbox inquiry layout. To update it, open `template_iv84aow` in EmailJS and inspect its Auto-Reply configuration. Replace the auto-reply content with `healthcare-auto-reply.html`. If it uses a linked auto-reply template, edit that linked template instead. Set the recipient to `{{email}}`, subject to `Thank you for your inquiry`, and Reply To to `humayunnaseer5@gmail.com`. Save and test with a new submission; previously received emails do not change.

This change is made in EmailJS and does not require a website rebuild. Because the sending template is shared with P-F, its auto-reply changes may affect P-F as well.
