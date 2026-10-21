export const profile = {
  name: "Ishma Rafeeque-M",
  role: "Python Full Stack Developer",
  intro:
    "I build full-stack web applications with Python, Django, and React, focusing on robust APIs, secure authentication, database optimisation, and reliable deployment.",
  email: "ishma485@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/Ishma0231" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ishma-m-6641a0366/",
    },
  ],
};

// ---- PROJECT CARDS ----
export const projects = [
  {
    title: "Shop.co — Full Stack E-commerce",
    tagline:
      "A full-stack e-commerce application with product discovery, secure authentication, and asynchronous email processing.",
    description:
      ("Built an e-commerce application using Next.js and Django REST Framework. Developed REST APIs for product management, product variants, cart operations, wishlists, and reviews. Integrated the frontend with the backend using Axios and Redux Toolkit. Implemented JWT authentication, Google Sign-In, email OTP verification, and HTTP-only refresh-token cookies. Integrated Celery with Redis for asynchronous email tasks and Cloudinary for product images. Optimised Django ORM queries and deployed the frontend, backend, and PostgreSQL database using Vercel, Render, and Neon."),
    tech: [
      "Next.js",
      "Redux Toolkit",
      "Tailwind CSS",
      "Django REST Framework",
      "PostgreSQL",
      "Redis",
      "Celery",
      "Neon",
      "Cloudinary",
    ],
    role: "Full Stack Developer",
    year: "2026",
    link: "",
  },
  {
    title: "Multi-Tenant CRM",
    tagline:
      "A CRM application with organization-based data isolation and collaborative customer management.",
    description:
      "Developed a multi-tenant CRM application designed to isolate data by organization. Implemented organization-based access restrictions, administrator-managed email invitations, and modules for managing leads, companies, deals, tickets, and activities. Developed the frontend using React and Redux Toolkit, with Django REST Framework and PostgreSQL supporting the backend.",
    tech: [
      "React",
      "Redux Toolkit",
      "Tailwind CSS",
      "Django REST Framework",
      "PostgreSQL",
    ],
    role: "Full Stack Developer",
    year: "2026",
    link: "",
  },
];

// ---- PHOTO SECTION ----
export const gallery = [
  {
    title: "Shop.co — Full Stack E-commerce",
    thumbnail: "/thumbnail/shopco.png",
    screenshots: ["/interfaces/shopco/carouselb.png","/interfaces/shopco/detail.png","/interfaces/shopco/rev.png",
        "/interfaces/shopco/editrev.png","/interfaces/shopco/grid.png","/interfaces/shopco/order.png","/interfaces/shopco/signin.png"],
  },
];

// ---- EDUCATION ----
export const education = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "ITM College",
    period: "2022 – 2025",
    details: "Graduated in 2025.",
  },
  {
    degree: "Higher Secondary — Computer Science",
    institution: "Ursuline Senior Secondary School (CBSE)",
    period: "",
    details: "Higher Secondary education in Computer Science.",
  },
  {
  degree: "Python & Django Development Intern",
  institution: "Upcode",
  period: "8 Months",
  details: "Hands-on experience in Python, Django, and web development.",
}
];

