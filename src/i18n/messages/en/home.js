export default {
  hero: {
    loading: "Loading",
    brandName: "AILEEN SOLUTIONS",
    sloganAlt: "Simplify Work Amplify Value",
    prev: "Prev",
    next: "Next",
    description:
      "We deliver reliable software solutions, trusted services, and experienced consulting from process and quality to Automation and AI — empowering business efficiency and growth.",
    getToKnowUs: "Get To Know Us",
    contactUs: "Contact Us",
    slides: [
      {
        lines: [
          { text: "Elevate your entire organization with", className: "muted" },
          { text: "Digital Process", className: "bold" },
          { text: "& Automation", className: "bold" },
        ],
      },
      {
        lines: [
          { text: "Move beyond documents to a", className: "muted", highlight: "platform" },
          { text: "you can control", className: "bold" },
          { text: "and verify in practice", className: "bold" },
        ],
      },
      {
        lines: [
          { text: "Still spending time on ", className: "muted" },
          { text: "repetitive work", className: "boldLarge" },
          {
            text: "with no time to create",
            className: "muted",
            strong: "new value",
            suffix: "?",
          },
        ],
      },
      {
        lines: [
          { text: "Great AI starts with great data", className: "muted" },
          { text: "Is your organization ready for AI?", className: "boldMedium" },
        ],
      },
      {
        lines: [
          { text: "When every process is", className: "muted" },
          { text: "visible and improvable", className: "bold", em: ["visible", "improvable"] },
          {
            text: "how much will your organization",
            className: "muted",
            strong: "transform?",
          },
        ],
      },
    ],
  },
  customerLogos: {
    eyebrow: "OUR CUSTOMERS",
    title: "Trusted by leading organizations",
    subtitle:
      "Leading energy and petrochemical companies trust Aileen Solutions",
  },
  dataOrbit: {
    eyebrow: "WHAT WE DO ?",
    titleLine1: "Integrated digital solutions to",
    titleLine2: "enhance operational efficiency",
    description:
      "We deliver reliable software, trusted services, and experienced consulting—from process and quality management to Automation and AI—empowering efficient, sustainable organizational growth.",
    chips: [
      {
        title: "Software Development",
        tooltip: "Custom software designed to align with your business processes",
      },
      {
        title: "AI & Intelligent Automation",
        tooltip: "Use AI and automation to reduce repetitive work, improve accuracy, and extend team capability",
      },
      {
        title: "Systems Integration",
        tooltip: "Connect systems and data sources seamlessly and reliably",
      },
      {
        title: "Low-Code Platforms",
        tooltip: "Build applications quickly with flexible low-code platforms tailored to your needs",
      },
      {
        title: "Enterprise Platforms",
        tooltip: "Secure, scalable enterprise platforms that support business growth",
      },
      {
        title: "Business Process & Workflows",
        tooltip: "Design and manage workflows as one clear, auditable system",
      },
    ],
  },
  services: {
    eyebrow: "SERVICES & SOLUTIONS",
    title: "End-to-end solutions for",
    titleHighlight: "the modern enterprise",
    description:
      "Solutions designed to make work smarter with AI and Automation that meet real business needs.",
    autoGroupLabel: "TRANSFORMING PROCESSES INTO INTELLIGENT AI",
    opsGroupLabel: "ENTERPRISE OPERATIONS & PLATFORMS",
    viewDetails: "View details",
    back: "Back",
    serviceLabel: "Service",
    keyFeatures: "Key Features",
    viewProductPage: "View product page",
    stats: [
      { value: "20+", label: "Solutions" },
      { value: "20+", label: "Enterprise Clients" },
      { value: "60+", label: "Enterprise Projects" },
    ],
    items: [
      {
        id: "pmp",
        title: "Process Management Platform",
        tags: ["BPM", "Process"],
        summary:
          "Manage workflows from documents, paper, or Visio into one system you can govern, store, and improve centrally.",
        detail:
          "So everyone in the organization shares the same view of work and can continuously improve processes over time.",
        features: [
          "Turn complex process maps, siloed data, documents, or hard-to-read Visio files into structured, accessible workflows",
          "Search, analyze, and standardize processes for compliance, collaboration, and continuous improvement",
          "Maintain operational efficiency and reduce knowledge loss when staff leave or take extended leave",
          "Track status in real time—see what is published, pending, or awaiting review",
          "Use as a foundation for Automation and RPA across the enterprise",
        ],
      },
      {
        id: "rpa",
        title: "Robotic Process Automation",
        tags: ["Automation", "RPA"],
        summary:
          "Software robots (bots) that handle repetitive computer tasks as your 24/7 digital assistant.",
        detail:
          "Bots can click, type, and follow routine steps across daily, weekly, or monthly work—accurately and quickly.",
        features: [
          "Run steps on schedules and event-based triggers",
          "Complete long, repetitive tasks faster",
          "Read data from source systems and write to downstream systems",
          "Exchange fields and data across multiple applications",
          "Guide users through correct application steps (Guide Me Mode)",
        ],
      },
      {
        id: "dsai",
        title: "Domain-Specific Generative AI",
        tags: ["AI", "Generative"],
        summary:
          "AI designed to understand your organization's context, built on internal knowledge and data structures.",
        detail:
          "Helps organizations use Generative AI to analyze data, summarize knowledge, and support decisions aligned with real workflows.",
        features: [
          "Build an AI Knowledge Assistant for your organization",
          "Automatically analyze and summarize large document sets",
          "Search your knowledge base with precision",
          "Work with document control and process frameworks",
          "Connect to ERP, workflow, and database systems",
          "Provide an AI chat interface for internal knowledge discovery",
        ],
      },
      {
        id: "lcbo",
        title: "Low-Code Business Orchestrator",
        tags: ["Low-Code", "Workflow"],
        summary:
          "A platform to rapidly build internal applications and workflows with visual design.",
        detail:
          "Replace heavy custom coding with visual models so teams can build digital systems aligned with real processes faster.",
        features: [
          "Design workflows and applications with a visual process model",
          "Build forms, approvals, and workflow automation quickly",
          "Manage documents and data with structure",
          "Track work status and analyze data through dashboards",
          "Support specialized apps for Quality, Safety, Risk, Audit, Maintenance, and more",
        ],
      },
      {
        id: "qmp",
        title: "Quality Management Platform",
        tags: ["Quality", "Compliance"],
        summary:
          "A platform to manage quality, control standards, and elevate operations end to end.",
        detail:
          "Ensure processes align with international standards such as ISO and legal requirements by replacing scattered work with auditable automation.",
        features: [
          "Version control and history tracking to prevent outdated document use",
          "See who changed what and when for continuous data integrity",
          "Executive dashboards and real-time analytics without waiting for manual reports",
          "Fast email and in-app notifications to reduce approval bottlenecks",
          "Enterprise security and SSO with role-based access control",
        ],
      },
      {
        id: "gvl",
        title: "GAVALON",
        subtitle: "Enterprise Legal & Regulatory Management Platform",
        tags: ["Legal", "Compliance"],
        href: "/service/gavalon",
        summary:
          "Enterprise legal and regulatory platform—centralize data, track owners, and monitor compliance status systematically.",
        detail:
          "Enterprise legal and regulatory platform—centralize data, track owners, and monitor compliance status systematically.",
        features: [
          "Central hub for legal and regulatory information",
          "Search and categorize legal data",
          "Assess legal relevance to the organization",
          "Assign owners and responsible units",
          "Track compliance status",
          "Alerts for required actions",
          "Dashboards and overview reports",
          "Role-based access control",
        ],
      },
      {
        id: "scr",
        title: "Supply Chain Resilience",
        tags: ["Supply Chain", "Digital"],
        summary:
          "Design and manage supply chains that handle uncertainty and risk effectively.",
        detail:
          "Track raw materials, products, and procurement processes in real time.",
        features: [
          "Real-time purchase order and shipment tracking",
          "Supplier and vendor performance management",
          "Supply chain risk analysis",
          "Inventory and logistics dashboards",
          "Integration with ERP and procurement systems",
          "Alerts for supply chain anomalies",
        ],
      },
      {
        id: "erp",
        title: "ERP Workspace",
        tags: ["ERP", "Workspace"],
        summary:
          "Unify ERP and enterprise applications in one workspace.",
        detail:
          "Access data, workflows, and systems from a single interface and reduce multi-system complexity.",
        features: [
          "Dashboards across multiple business systems",
          "Connect ERP and other enterprise data sources",
          "Search data and documents across systems",
          "Role-based access control",
          "Web and mobile access",
        ],
      },
    ],
  },
  strengths: {
    eyebrow: "OUR STRENGTHS",
    title: "Why Businesses Choose",
    titleHighlight: "Aileen Solutions",
    description:
      "6 Keys to Value — we stand behind what we do and deliver value through solutions, platforms, services, and trusted consulting.",
    trustByTab: "Trust By",
    provideToTab: "Provide To",
    trustByLabel: "Trust By — what we stand for",
    provideToLabel: "Provide To — what we deliver",
    return: "Return",
    keys: [
      {
        id: "simplicity",
        title: "Simplicity",
        tooltip:
          "We believe in easy-to-use systems that help people understand processes and work independently with confidence.",
      },
      {
        id: "rapidly",
        title: "Rapidly",
        tooltip: "We prioritize and respond to the fast pace of business change today.",
      },
      {
        id: "experience",
        title: "Experience",
        tooltip:
          "We deliver quality solutions tailored to needs, aligned with users, and worth the investment.",
      },
      {
        id: "platform",
        title: "Platform",
        tooltip:
          "Reliable, flexible platforms that support diverse solutions and business growth.",
      },
      {
        id: "services",
        title: "Services",
        tooltip:
          "End-to-end services that integrate technology to elevate organizational work.",
      },
      {
        id: "consulting",
        title: "Consulting",
        tooltip:
          "Professional advisors who guide planning and strategy execution with confidence.",
      },
    ],
  },
  leaderVision: {
    eyebrow: "VISION & LEADERSHIP",
    title: "Our leaders —",
    titleHighlight: "vision that drives the organization",
    subtitle:
      "Visionary leaders ready to move your organization forward with expertise and commitment.",
    leaders: [
      {
        role: "Managing Director",
        quoteHighlight: "starts with shared goals",
        quoteLine1: "Sustainable success",
        body: '"We believe sustainable success starts with shared goals. We are committed to a culture of clear communication, structured collaboration, and respect for every role. When everyone moves in the same direction, the organization grows steadily and delivers real value to customers—because sustainable growth is growth together."',
        tags: ["Sales Strategy", "Business Development", "Customer Success", "Trusted Advisor"],
        name: "Surinna.T",
        company: "Aileen Solutions Co., Ltd.",
      },
      {
        role: "Professional Services Director & Co-Founder",
        quoteLine1: "We aim to be a",
        quoteHighlight: "long-term partner",
        quoteLine2: "not just a solution vendor",
        body: '"From consulting and design to development, training, and ongoing support, we focus on technology that works in practice and delivers measurable outcomes—not theory alone. We believe sustainable growth comes from strong processes and technology designed for each organization\'s context."',
        tags: ["Consult", "Design & Develop", "Train & Support", "Long-term Partnership"],
        name: "Pramote.T",
        company: "Aileen Solutions Co., Ltd.",
      },
    ],
  },
  team: {
    eyebrow: "OUR TEAM",
    title: "Our team —",
    titleHighlight: "the people behind every solution",
    tabs: [
      { key: "all", label: "All" },
      { key: "sales", label: "Sales & Marketing" },
      { key: "tech", label: "Technical & Developer" },
      { key: "support", label: "Project & Support" },
      { key: "finance", label: "Finance & HR" },
    ],
    departments: {
      sales: "Sales & Marketing",
      tech: "Technical Development",
      support: "Project & Support",
      finance: "Finance & HR",
    },
    prev: "Previous",
    next: "Next",
  },
  news: {
    eyebrow: "News & Events",
    title: "News & Events",
    description:
      "Latest updates from Aileen Solutions on seminars, technology, and practical applications of AI, Process, and Automation.",
    viewAll: "View all news",
  },
  gavalonHighlight: {
    eyebrow: "Workshop",
    title: "Workshop GAVALON: Enterprise Legal Management",
    description:
      "Are new laws relevant to your business? Join our online Gavalon workshop on 19 August 2026.",
    readArticle: "Read the full story",
    readMore: "Read more",
    visitWebsite: "Visit GAVALON website",
    visitSite: "Visit website",
    registerWorkshop: "Register for Workshop",
    close: "Close",
    dismiss: "Close and don't show again this session",
    imageAlt: "Workshop GAVALON enterprise legal management system",
  },
};
