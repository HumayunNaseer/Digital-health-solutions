export const profile = {
  name: "Humayun Naseer",
  email: "humayunnaseer5@gmail.com",
  linkedin: "https://www.linkedin.com/in/humayun-naseer-rails/",
};

export type Study = {
  slug: string;
  name: string;
  category: string;
  title: string;
  short: string;
  period: string;
  role: string;
  focus?: string;
  intro: string;
  challenge: string;
  users: string[];
  capabilities: { title: string; text: string }[];
  contribution: string;
  delivered?: { title: string; detail: string }[];
  technology: string[];
  architecture: string;
  takeaway: string;
  link?: string;
  tone: "forest" | "sage" | "lavender";
};

export const studies: Study[] = [
  {
    slug: "neuronest",
    name: "NeuroNest",
    category: "NEURODEVELOPMENT & CONNECTED CARE",
    title: "One care journey. Many people working together.",
    short:
      "Connecting assessments, therapy coordination, and family engagement in a multi-role healthcare platform.",
    period: "2026 – Present",
    role: "Product & Engineering Lead",
    focus: "Connected neurodevelopmental care",
    tone: "forest",
    intro:
      "NeuroNest brings together autism and ADHD assessments, therapy, care coordination, and family engagement in one connected healthcare platform. I lead the product’s end-to-end technical delivery, translating clinical and operational requirements into scalable workflows for the professionals delivering care and the families navigating it.",
    challenge:
      "A care journey involves more than a scheduled appointment. Parents need clarity, therapists need context, psychologists need assessment information, and coordinators need to understand what happens next. Supporting those distinct responsibilities is a central product challenge.",
    users: [
      "Parents & families",
      "Therapists",
      "Psychologists",
      "Care coordinators",
    ],
    capabilities: [
      {
        title: "Assessments & appointments",
        text: "Workflows for organizing assessments and appointments within a broader care journey.",
      },
      {
        title: "Therapist & coordinator workspaces",
        text: "Distinct product experiences for the people supporting care, coordination, and administration.",
      },
      {
        title: "Family engagement",
        text: "Parent-facing communication and messaging that connect families with the care process.",
      },
      {
        title: "Reporting & shared context",
        text: "Reporting and multi-role operations to support the information needs of care teams.",
      },
    ],
    contribution:
      "As Product & Engineering Lead, I lead NeuroNest’s end-to-end technical delivery, translating clinical and operational requirements into scalable product workflows. My work connects assessments, therapy, care coordination, and family engagement, supporting the professionals delivering care and the families navigating it.",
    technology: ["Ruby on Rails", "React", "AWS"],
    architecture:
      "A multi-role platform makes the relationship between roles, information, and actions an essential design consideration. The right interface depends on who is using it and where they are in the workflow.",
    takeaway:
      "Experience with the complexity of coordinating healthcare roles—and translating that context into a product that supports an ongoing care journey.",
  },
  {
    slug: "learnme",
    name: "LearnMe",
    category: "NEURODEVELOPMENT & MULTI-TENANT PLATFORMS",
    title: "A thoughtful foundation for neurodevelopment learning.",
    short:
      "Full-stack architecture and multitenancy for a learning platform supporting children with autism.",
    period: "2023–2026",
    role: "Lead Product Engineer",
    focus: "Autism learning & multi-tenant healthcare technology",
    tone: "sage",
    intro:
      "LearnMe is a digital learning platform designed to support children with autism. As the sole engineer on the product, I took it from initial development through production launch, owning the application architecture, full-stack implementation, multi-tenant setup, and deployment. The platform was used across the USA and Africa, supporting dozens of children through structured learning experiences and helping care teams manage their work across multiple organizations.",
    challenge:
      "A specialized learning product needs a dependable foundation as it expands. Supporting multiple organizations introduces questions about workspace boundaries, maintainability, and how the application is operated.",
    users: ["Organizations", "Learning support teams", "Children with autism"],
    capabilities: [
      {
        title: "A specialized learning product",
        text: "Application development within the needs and context of a neurodevelopment-related platform.",
      },
      {
        title: "Multiple organization workspaces",
        text: "Multitenancy to support an application used across distinct organizational contexts.",
      },
      {
        title: "Connected frontend & backend",
        text: "A React interface supported by Ruby on Rails and PostgreSQL.",
      },
      {
        title: "Application operations",
        text: "Performance and deployment work with Passenger and Nginx.",
      },
    ],
    contribution:
      "As Lead Product Engineer and the sole engineer on LearnMe, I owned technical delivery from initial development through production launch. I translated the product’s learning and organizational needs into a working application, bringing together architecture, full-stack implementation, multitenancy, and deployment. This work supported a platform used across the USA and Africa, helping care teams manage structured learning experiences for dozens of children with autism.",
    delivered: [
      { title: "From initial build to production launch", detail: "Owned the application’s engineering delivery as the sole engineer, taking LearnMe from initial development to a live product used by care teams and children." },
      { title: "Application architecture & implementation", detail: "Designed and built the React frontend, Ruby on Rails application, and PostgreSQL data foundation to support structured learning experiences." },
      { title: "Multi-tenant organization workspaces", detail: "Implemented multiple organization workspaces within one shared application, enabling care teams to manage their work in their own organizational context." },
      { title: "Production deployment & optimization", detail: "Handled deployment and application optimization with Passenger and Nginx, completing the technical work needed to bring the platform into production." },
    ],
    technology: ["Ruby on Rails", "React", "PostgreSQL", "Passenger", "Nginx"],
    architecture:
      "Multitenancy was a central engineering responsibility. Organization boundaries need to remain understandable in the application model while shared infrastructure stays maintainable as the product evolves.",
    takeaway:
      "The multitenancy work enabled the application to support multiple organizational workspaces. It connected the needs of a specialized learning product with a shared application architecture.",
  },
  {
    slug: "reactneuro",
    name: "REACT Neuro",
    category: "BRAIN HEALTH & DIGITAL ASSESSMENTS",
    title: "Making complex brain-health information usable.",
    short:
      "Full-stack experience in a digital brain-health assessment product.",
    period: "2020–2022",
    role: "Full-Stack Developer",
    tone: "lavender",
    intro:
      "REACT Neuro is a digital brain-health platform. Its public product story connects assessments and digital biomarkers with ways to view and share brain-health information.",
    challenge:
      "Digital assessment products sit at the intersection of complex information and everyday use. The surrounding software needs to help people navigate the product and understand where information belongs in their journey.",
    users: [
      "People using assessments",
      "Healthcare professionals",
      "Families & support networks",
    ],
    capabilities: [
      {
        title: "Digital assessment context",
        text: "A product centered on brain-health assessments and digital biomarkers.",
      },
      {
        title: "Results & progress",
        text: "The public product describes ways to view and keep track of brain-health information.",
      },
      {
        title: "A connected support network",
        text: "The public product includes sharing results and progress with physicians and family members.",
      },
      {
        title: "Supporting application software",
        text: "Web application delivery within a specialized healthcare product environment.",
      },
    ],
    contribution:
      "I worked on ReactNeuro as a Full-Stack Developer between 2020 and 2022, with Ruby on Rails as part of my application-development work. Product-wide scientific methods, assessment algorithms, and VR capabilities belong to the wider product and team.",
    technology: ["Ruby on Rails", "Web application development"],
    architecture:
      "Healthcare products often bring several disciplines together. Clear application boundaries and close collaboration matter when software supports a specialized assessment experience.",
    takeaway:
      "Experience contributing software within a specialized brain-health product, alongside the wider context of assessments, results, and information sharing.",
    link: "https://reactneuro.com/",
  },
];

export const faqs = [
  {
    question: "Can you help if I only have an idea?",
    answer:
      "Yes. We can start by understanding your users, mapping the care or operational workflow, and defining a realistic first version. That gives us a clearer basis for scope and technical decisions.",
  },
  {
    question: "Can you work with our existing product or team?",
    answer:
      "Yes. My experience includes working with established applications and international product teams. An initial review helps identify the most useful improvements and how I can fit into your existing delivery process.",
  },
  {
    question: "What kinds of healthcare products are the best fit?",
    answer:
      "My strongest relevant experience is in neurodevelopment, therapy coordination, assessments, family engagement, and multi-role platforms. I also work with healthcare founders exploring related operational and product challenges.",
  },
  {
    question: "Can you connect payments, telehealth, or other services?",
    answer:
      "Integrations can be part of the engagement, including payments, video appointments, APIs, and AI-assisted workflows. We would first establish the use case, provider requirements, and how the integration fits your product.",
  },
  {
    question: "How do you approach sensitive information and access?",
    answer:
      "We discuss the information the product handles, the roles that need access, and the project’s security and compliance requirements early. Those requirements inform architecture, integration choices, and what needs specialist review.",
  },
  {
    question: "What happens after the first conversation?",
    answer:
      "We identify your goals, the people using the product, the current constraints, and a useful next step. Scope, delivery expectations, and any ongoing support are agreed around the engagement.",
  },
];

export const pageInfo = {
  "/": {
    title: "Humayun Naseer — AI-Native Healthcare Engineering Partner",
    description:
      "Healthcare software engineering with experience in autism and neurodevelopment. Explore my work and discuss AI assistants, agents, and connected care workflows.",
  },
  "/contact/": {
    title: "Discuss Your Healthcare Product — Humayun Naseer",
    description:
      "Tell me about your healthcare idea, care workflow, or existing product. Start a conversation about a practical way forward.",
  },
  "/privacy/": {
    title: "Privacy — Humayun Naseer",
    description:
      "How this healthcare technology portfolio handles business inquiries and website information.",
  },
};
