export interface Project {
  id: number;
  title: string;
  category: string;
  stack: string[];
  description: string;
  features: string[];
  year: string;
  link: string;
}

export interface Skill {
  group: string;
  items: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Imbed Software (E-Commerce)",
    category: "Full Stack",
    stack: ["MongoDB", "Express.js", "Node.js", "EJS", "Bootstrap", "Razorpay", "Google OAuth"],
    description: "Developed a scalable E-Commerce web application with secure authentication and seamless payment integration. Focused on performance optimization and user experience with responsive design.",
    features: [
      "User registration & login with Google OAuth",
      "Product listing & category filtering",
      "Shopping cart & order management",
      "Razorpay payment integration",
      "Email verification via Nodemailer",
      "MVC architecture with REST API",
    ],
    year: "2024",
    link: "https://anbukumar.com",
  },
  {
    id: 2,
    title: "Home Automation System",
    category: "IoT + Web Dashboard",
    stack: ["ESP8266", "ESP32", "NodeMCU", "Embedded C", "MQTT", "WebSockets"],
    description: "Designed and implemented a smart home automation system integrating microcontrollers with a web dashboard for real-time device monitoring and control.",
    features: [
      "Real-time temperature monitoring",
      "Remote ON/OFF device control",
      "IoT protocol integration (MQTT, HTTP)",
      "Web-based dashboard for live updates",
      "Energy-efficient switching system",
    ],
    year: "2025",
    link: "https://api.anbukumar.com",
  },
  {
    id: 3,
    title: "Smart Order Status Indicator",
    category: "IoT + Full Stack",
    stack: ["ESP32", "ESP8266", "Arduino C++", "React.js (Vite)", "FastAPI", "MongoDB", "JWT"],
    description: "Designed and implemented a full-stack IoT restaurant table management system integrating ESP32/ESP8266 microcontrollers with a React.js web dashboard. Enables chefs to update order statuses in real time, with physical LED indicators on each table automatically reflecting the current order stage.",
    features: [
      "Real-time table status management (Idle → Placed → Processing → Delivered)",
      "IoT LED feedback on physical tables via ESP32/ESP8266 polling",
      "Secure chef authentication with JWT",
      "Responsive dark-mode React dashboard",
      "RESTful API backend with MongoDB",
      "Multi-board firmware support (ESP32 & ESP8266)",
    ],
    year: "2025",
    link: "https://smart.anbukumar.com",
  },
  {
    id: 4,
    title: "M2RL TechnologieS — Corporate Site",
    category: "Full Stack / Marketing",
    stack: ["React 18", "Vite", "React Router DOM", "Express.js", "Node.js", "Nodemailer", "Axios", "Vanilla CSS"],
    description: "Designed and developed a full-stack corporate marketing website featuring a multi-page SPA with premium UI/UX, real-time contact form with email integration, and dedicated pages for products, R&D, investor relations, and careers.",
    features: [
      "Multi-page SPA with client-side routing",
      "Contact form with backend email delivery via Nodemailer",
      "Premium UI with glassmorphism & micro-animations",
      "Investor & R&D dedicated pages",
      "Legal pages (Privacy Policy, Terms of Service)",
      "CORS-secured REST API backend",
    ],
    year: "2026",
    link: "https://m2rl.anbukumar.com",
  },
];

export const skills: Skill[] = [
  {
    group: "Frontend",
    items: ["React.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Bootstrap", "EJS", "Vite", "Tailwind CSS"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express.js", "Python", "FastAPI", "REST API", "JWT"],
  },
  {
    group: "Database",
    items: ["SQL", "MongoDB", "MySQL","Mongoose"],
  },
  {
    group: "IoT & Embedded",
    items: ["ESP32", "ESP8266", "NodeMCU", "Arduino C++", "MQTT", "WebSockets", "Embedded C"],
  },
  {
    group: "Tools & Services",
    items: ["Git", "GitHub", "Postman", "VS Code", "Figma", "Google OAuth", "Nodemailer", "Razorpay", "Linux", "Azure", "AWS"],
  },
];

export const navLinks = [
  { label: "Home",     href: "#hero" },
  { label: "About",    href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact" },
];
