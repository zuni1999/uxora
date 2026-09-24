const photos = import.meta.glob<string>('../assets/services/*.png', { eager: true, query: '?url', import: 'default' });
export const serviceCover = (slug: string) => photos[`../assets/services/${slug}1.png`];
export const servicePhoto = (slug: string) => photos[`../assets/services/${slug}.png`];

type Detail = { intro: string; overview: string; included: string; groups: { title: string; items: string[] }[]; closing: string; photoAlt: string };
export const serviceDetails: Record<string, Detail> = {
  'web-app-design': {
    intro: 'Focuses on the aesthetic and user experience of a website, creating visually appealing and intuitive layouts. It involves aspects like graphic design, typography, and color schemes to enhance user engagement.',
    overview: 'Our Web Development services provide end-to-end solutions for creating dynamic and effective online presences. We specialize in designing and building custom websites and web applications from the ground up, ensuring they are perfectly aligned with your business goals. This includes expert front-end development, focusing on intuitive user interfaces and engaging experiences that work seamlessly across all devices, as well as robust back-end development to power your platform’s core functionalities, secure data management, and efficient performance. We utilize modern technologies and adhere to best practices to deliver secure, scalable, and search engine-friendly digital solutions that not only look great but also drive user engagement and contribute to your overall success.',
    included: 'We leverage cutting-edge technologies and industry best practices to deliver solutions that are not only visually appealing but also secure, high-performing, and optimized for search engines, ensuring your online presence effectively engages your target audience and achieves your business goals.',
    groups: [
      { title: 'Discovery & Strategy:', items: ['Initial consultation to understand your business, goals, and target audience.', 'Competitor analysis and market research.', 'Defining website objectives and key performance indicators (KPIs).', 'Sitemap creation and user flow planning.'] },
      { title: 'User Experience (UI/UX) Design:', items: ['Wireframing to outline the website structure and layout.', 'User journey mapping to optimize navigation and interaction.', 'Usability testing (where applicable) to ensure an intuitive experience.', 'Visual design of all web pages, including typography, color palette, and imagery.'] },
    ],
    closing: 'Discover how our integrated approach to design and development can realize your brand image, engage your audience, and drive growth.',
    photoAlt: 'Design team reviewing website wireframes and interface concepts together',
  },
  'web-app-development': {
    intro: 'Custom web and mobile applications built around your users, workflows, and business goals. We turn product ideas into reliable digital experiences that are ready to grow.',
    overview: 'We build websites, SaaS platforms, customer portals, and mobile applications from planning through launch. Our work brings responsive front-end interfaces together with maintainable back-end systems, APIs, and databases. We consider performance, security, accessibility, and real-world usage throughout development, so your team can manage and evolve the product with confidence.',
    included: 'From technical discovery to deployment, we create a clear delivery plan and build the features your users need, with testing and documentation to support the next stage of your product.',
    groups: [
      { title: 'Planning & Architecture:', items: ['Requirements discovery and feature prioritization.', 'Application architecture and technology selection.', 'Database design and API planning.', 'Milestone planning and integration mapping.'] },
      { title: 'Development & Delivery:', items: ['Responsive web interfaces and mobile application development.', 'Back-end services, authentication, and third-party integrations.', 'Functional testing, accessibility checks, and performance optimization.', 'Deployment, handover documentation, and post-launch support planning.'] },
    ], closing: 'Bring your next web or mobile product to life with a development partner focused on usability, reliability, and long-term growth.', photoAlt: 'Developers collaborating on web and mobile application code',
  },
  'ai-automation': {
    intro: 'Connect your systems and reduce repetitive work with practical AI automation. We build intelligent workflows that help your team spend more time on the work that matters.',
    overview: 'Our AI automation services bring together your business tools, information, and processes. We design workflows, AI assistants, and integrations around specific operational needs, with clear boundaries for automated actions and human review. Each solution is developed with attention to data access, reliability, and measurable business outcomes.',
    included: 'We identify suitable automation opportunities, prototype the workflow, and test it against realistic scenarios before integrating it into your operations.',
    groups: [
      { title: 'Workflow Discovery & Planning:', items: ['Map repetitive tasks, handoffs, and operational bottlenecks.', 'Assess available data, tools, and integration requirements.', 'Define automation goals and human approval points.', 'Prioritize practical use cases and success measures.'] },
      { title: 'AI Systems & Integrations:', items: ['AI assistants and context-aware knowledge workflows.', 'LLM integrations and retrieval-augmented generation systems.', 'Connected workflows across business applications and APIs.', 'Quality evaluation, error handling, monitoring, and team handover.'] },
    ], closing: 'Explore how connected workflows and carefully designed AI tools can simplify your operations and support your team.', photoAlt: 'AI automation system connecting data inputs to analytics and workflow outputs',
  },
  'product-design': {
    intro: 'Turn early ideas into clear, useful digital products. We combine product strategy, research, and interface design to create experiences grounded in your users’ needs.',
    overview: 'We help teams shape what to build and how it should work. Through discovery, user journeys, prototypes, and design systems, we connect business priorities with intuitive experiences. Our process makes product decisions tangible, helping you test assumptions, reduce uncertainty, and prepare a clear foundation for development.',
    included: 'From the first concept to development-ready designs, we create a shared product direction and refine the details that make an experience feel coherent.',
    groups: [
      { title: 'Product Discovery & Validation:', items: ['Stakeholder workshops and product goal definition.', 'Audience research and problem framing.', 'Feature prioritization and key journey mapping.', 'Concept exploration and prototype feedback.'] },
      { title: 'Experience & Interface Design:', items: ['Information architecture and interactive wireframes.', 'High-fidelity interfaces for core product journeys.', 'Reusable components and design system foundations.', 'Usability refinement and developer handover.'] },
    ], closing: 'Build clarity around your product vision and create an experience your customers can understand, trust, and enjoy.', photoAlt: 'Product designers exploring user journeys and digital interface prototypes',
  },
  'e-commerce': {
    intro: 'Create an online store that makes shopping simple. We design and build commerce experiences that connect product discovery, checkout, and the systems behind your business.',
    overview: 'Our e-commerce services support Shopify stores and custom commerce platforms. We focus on clear navigation, useful product pages, responsive storefronts, and dependable checkout flows. Behind the scenes, we connect the tools you need for payments, inventory, fulfillment, and customer communication.',
    included: 'We align the storefront with your brand and operations, helping customers find the right products while making the store easier for your team to manage.',
    groups: [
      { title: 'Commerce Strategy & Storefront:', items: ['Customer journey and catalog structure planning.', 'Shopify setup or custom storefront architecture.', 'Responsive collection and product page design.', 'Search, filtering, and merchandising experiences.'] },
      { title: 'Checkout & Operations:', items: ['Payment, shipping, and checkout integration.', 'Inventory and fulfillment system connections.', 'Customer communication and order workflow automation.', 'Store testing, performance improvements, and launch support.'] },
    ], closing: 'Give your customers a smoother shopping experience and your business a stronger foundation for sustainable online growth.', photoAlt: 'Commerce team managing an online storefront, orders, and product fulfillment',
  },
  'cloud-integration': {
    intro: 'Connect applications, data, and infrastructure with cloud integration. We help your systems work together so your digital products can operate reliably and scale with your business.',
    overview: 'We design integrations that move information between your applications and cloud services with clear ownership and dependable operation. Our work covers APIs, data flows, deployment environments, and monitoring, with attention to access controls, recovery, and ongoing maintenance.',
    included: 'We review your existing systems, define an integration plan, and implement connections that support both current operations and future product development.',
    groups: [
      { title: 'Cloud Planning & Architecture:', items: ['Application and infrastructure assessment.', 'Integration requirements and data flow mapping.', 'Cloud environment and access control planning.', 'Migration sequencing and continuity considerations.'] },
      { title: 'Integration & Reliability:', items: ['API connections between business applications and cloud services.', 'Data synchronization and event-driven workflows.', 'Deployment pipelines, monitoring, and error recovery.', 'Integration testing, documentation, and operational handover.'] },
    ], closing: 'Connect your technology with a cloud foundation designed for dependable operations and future growth.', photoAlt: 'Cloud infrastructure connecting databases, applications, and analytics systems',
  },
};
