export type PortfolioPopupKind =
  | "project"
  | "experience"
  | "hobbies"
  | "skills"
  | "contact"
  | "bookmark";

export const portfolioContent = {
  hero: {
    ownerName: "CEREN’S",
    title: "PORTFOLIO",
    subtitle: "biomedical engineer",
  },
  sections: {
    about: {
      title: "About",
      navigationLabel: "ABOUT",
      content: "",
    },
    experience: {
      title: "Experience",
      navigationLabel: "EXPERIENCE",
      content: {
        type: "experience",
        downloads: [
          {
            label: "CV — EN",
            path: "/Ceren-Cetinyurek-CV-EN.pdf",
            fileName: "Ceren-Cetinyurek-CV-EN.pdf",
          },
          {
            label: "CV — TR",
            path: "/Ceren-Cetinyurek-CV-TR.pdf",
            fileName: "Ceren-Cetinyurek-CV-TR.pdf",
          },
        ],
        items: [
          {
            company: "SANKO Hospital",
            role: "Biomedical Engineering Intern",
            description: "Maintenance, calibration and hospital device management.",
          },
          {
            company: "Ottoman Orthopedics",
            role: "Biomedical Engineering Intern",
            description: "Orthosis/prosthesis manufacturing and patient-specific applications.",
          },
          {
            company: "TUGA Medical Devices",
            role: "Biomedical Engineering Intern",
            description: "Maintenance, installation and troubleshooting of medical devices.",
          },
          {
            company: "YTU Biomaterials & Tissue Engineering Lab",
            role: "Research Intern",
            description: "Biomaterial synthesis, characterization and experimental data collection.",
          },
        ],
      },
    },
    project: {
      title: "Projects",
      navigationLabel: "PROJECT",
      content: {
        type: "projects",
        items: [
          {
            number: "01",
            title: "Jawbone Regeneration Scaffold",
            description: "Hydrogel–hydroxyapatite scaffolds for jawbone regeneration.",
          },
          {
            number: "02",
            title: "Nanocurcumin × Melanin",
            description: "UVB oxidative stress study using cell culture and ROS analysis.",
          },
          {
            number: "03",
            title: "Brain Tumor MRI Classification",
            description: "MRI classification with MobileNetV2 — 85.1% accuracy.",
          },
        ],
      },
    },
    skills: {
      title: "Skills",
      navigationLabel: "SKILLS",
      content: {
        type: "skills",
        groups: [
          {
            title: "MEDTECH",
            items: [
              "Medical Device Management",
              "Preventive Maintenance",
              "Calibration",
              "Troubleshooting",
            ],
          },
          {
            title: "LAB",
            items: ["Biomaterials", "Material Characterization", "SEM", "FTIR"],
          },
          {
            title: "REGULATORY / QUALITY",
            items: [
              "ISO/IEC 17025",
              "EU MDR 2017/745",
              "ÜTS",
              "UDI",
              "EUDAMED",
              "Technical Documentation",
              "GSPR",
              "Risk Management",
            ],
          },
          {
            title: "SOFTWARE",
            items: ["MATLAB", "Origin", "Fusion 360", "OrCAD", "TinkerCad"],
          },
        ],
      },
    },
    hobbies: {
      title: "Hobbies",
      navigationLabel: "HOBIES",
      content: {
        type: "hobbies",
        items: [
          "Reading",
          "Violin",
          "Journaling",
          "Creative Writing",
          "Fountain Pens",
          "Embroidery",
          "Knitting / Crochet",
          "Painting",
          "Cooking",
          "Plants",
          "Pixel Art",
          "Web Design",
          "Coding",
          "Photography",
          "LEGO",
        ],
      },
    },
    contact: {
      title: "Contact",
      navigationLabel: "CONTACT",
      content: {
        type: "contact",
        items: [
          {
            label: "Email",
            value: "contact@cerencetinyurek.com",
            url: "mailto:contact@cerencetinyurek.com",
          },
          {
            label: "LinkedIn",
            value: "linkedin.com/in/cerencetinyurek",
            url: "https://linkedin.com/in/cerencetinyurek",
          },
          {
            label: "Instagram",
            value: "@cerencetinyurek",
            url: "https://instagram.com/cerencetinyurek",
          },
        ],
      },
    },
    bookmark: {
      title: "Bookmark",
      navigationLabel: "BOOKMARK",
      content: {
        type: "bookmark",
        heading: "A little reminder ♡",
        quote: "“You can’t become a butterfly\novernight. Leaving the cocoon\ntakes time; first, you have to\nbuild it patiently, stitch by\nstitch.”",
      },
    },
    booknook: {
      title: "Booknook",
      navigationLabel: "BOOKNOOK",
      url: "https://booknook.cerencetinyurek.com",
    },
  },
  desktop: {
    meowLabel: "MEOW",
    exploreTitle: "Explore",
    exploreContent: {
      instructions: [
        "Click any desktop icon to explore",
        "Drag windows around",
        "Use the X button to close windows",
      ],
      closing: "Thanks for visiting! ❤︎",
    },
    popupMenu: ["File", "Edit", "View", "Image"],
  },
  musicPlayer: {
    title: "Music Player",
    emptyTitle: "NO TRACK",
    emptyArtist: "—",
    tracks: [
      {
        title: "Adrift",
        artist: "alanajordan",
        src: "/music/Adrift — alanajordan.mp3",
      },
      {
        title: "Bedroom Pop Chill Daydream",
        artist: "alex-morgan",
        src: "/music/Bedroom Pop Chill Daydream — alex-morgan.mp3",
      },
      {
        title: "Toast Crumbs in My Bed",
        artist: "Dreamy Indie Pop Female Vocals",
        src: "/music/Toast Crumbs in My Bed – Dreamy Indie Pop Female Vocals.mp3",
      },
    ] as readonly { title: string; artist: string; src: string }[],
  },
  accessibility: {
    desktopLabel: "Ceren’s portfolio desktop",
    closePopup: "Kapat",
    flipPolaroid: "Polaroid’i çevir",
    closeAbout: "About Polaroid’i kapat",
    closeExplore: "Explore penceresini kapat",
    closeMusic: "Müzik çaları kapat",
    popupMenu: "Pencere menüsü",
  },
} as const;

export const popupContent: Record<
  PortfolioPopupKind,
  { title: string; content: unknown }
> = {
  project: portfolioContent.sections.project,
  experience: portfolioContent.sections.experience,
  hobbies: portfolioContent.sections.hobbies,
  skills: portfolioContent.sections.skills,
  contact: portfolioContent.sections.contact,
  bookmark: portfolioContent.sections.bookmark,
};
