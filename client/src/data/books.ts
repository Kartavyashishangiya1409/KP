export interface Book {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  features: string[];
  image: string;
  color: string;
}

export const books: Book[] = [
  {
    id: "ekam-1",
    title: "Ekam-1",
    subtitle: "એકમ-1",
    description:
      "A foundational book designed to build strong basic concepts in education. Perfect for early learners looking for structured guidance.",
    longDescription:
      "Ekam-1 is the definitive starting point for students seeking a rock-solid grasp of mathematical fundamentals. Every chapter is meticulously sequenced to build intuition before skill, ensuring concepts stick for life—not just for exams.",
    features: [
      "200+ Pages of Core Content",
      "Interactive Exercises & Practice Sets",
      "Chapter-wise Summaries & Revision Notes",
      "Gujarati Medium — Clear & Accessible",
    ],
    image: "/images/book-ekam1.png",
    color: "#1e3a5f",
  },
  {
    id: "aagvu-ganit",
    title: "Aagvu Ganit",
    subtitle: "આગવું ગણિત",
    description:
      "An advanced mathematics guide providing deep analytical insights, shortcuts, and comprehensive problem-solving techniques.",
    longDescription:
      "Aagvu Ganit is for the ambitious student. It goes beyond routine problem-solving to teach analytical thinking, shortcut methods, and competition-level strategies that transform how students approach mathematics.",
    features: [
      "Advanced Math Techniques & Shortcuts",
      "Competitive Exam Focused Material",
      "Previous Year Question Papers Included",
      "Gujarati Medium — Comprehensive Coverage",
    ],
    image: "/images/book-aagvu-ganit.png",
    color: "#1a4d3e",
  },
  {
    id: "ekam-2",
    title: "Ekam-2",
    subtitle: "એકમ-2",
    description:
      "The highly anticipated sequel, bringing advanced foundational concepts with modern pedagogical approaches.",
    longDescription:
      "Building on the proven methodology of Ekam-1, this sequel dives deeper into advanced foundational concepts. With modern pedagogical design, concept maps, and integrated digital resources, Ekam-2 is the next evolution in structured learning.",
    features: [
      "Advanced Curriculum with Modern Approach",
      "Visual Concept Maps Included",
      "Online Mock Test Access",
      "Gujarati Medium — Expert Authored",
    ],
    image: "/images/book-ekam2.png",
    color: "#5c1a2a",
  },
];
