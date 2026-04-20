import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { t } = useTranslation();
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero heading
      gsap.from("[data-about-heading] > *", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      });

      // Mission / Vision
      gsap.from("[data-about-block]", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-about-block]",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Stats
      gsap.from("[data-about-stat]", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-about-stats]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Values
      gsap.from("[data-about-value]", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-about-values]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: "15K+", label: "Students Empowered" },
    { value: "3", label: "Premium Books" },
    { value: "10+", label: "Years of Trust" },
  ];

  const values = [
    {
      title: "Structured Curriculum",
      desc: "Our books follow a logical, step-by-step approach ensuring clarity and high retention.",
    },
    {
      title: "Quality Content",
      desc: "Meticulously researched and vetted by experienced educators in the field.",
    },
    {
      title: "Student Centric",
      desc: "Designed keeping the psychological learning curve of students in mind.",
    },
  ];

  return (
    <>
      <SEO 
        title="About Kartavya Publication | Our Mission & Vision"
        description="Learn about Kartavya Publication, dedicated to creating high-quality mathematics books that simplify learning and help students build strong academic foundations."
        keywords="about kartavya publication, maths education books, learning resources maths"
      />

      <div className="min-h-screen bg-surface">
        {/* ─── Header ─── */}
        <section className="pt-36 pb-16 px-6">
          <div data-about-heading className="max-w-3xl mx-auto text-center">
            <p className="text-ink-tertiary font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              {t("about.hero.tag")}
            </p>
            <h1 className="font-heading font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.03em] text-ink mb-6">
              {t("about.hero.title")}
            </h1>
            <p className="text-ink-secondary text-[17px] leading-relaxed max-w-xl mx-auto">
              {t("about.hero.subtitle")}
            </p>
          </div>
        </section>

        {/* ─── Mission & Vision ─── */}
        <section className="pb-24 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              data-about-block
              className="bg-surface-muted rounded-2xl p-10 md:p-12"
            >
              <p className="text-accent-warm font-heading font-semibold text-sm uppercase tracking-wider mb-4">
                {t("about.mission.tag")}
              </p>
              <h2 className="font-heading font-bold text-2xl text-ink mb-4">
                {t("about.mission.title")}
              </h2>
              <p className="text-ink-secondary text-[15px] leading-relaxed">
                {t("about.mission.desc")}
              </p>
            </div>

            <div
              data-about-block
              className="bg-surface-dark rounded-2xl p-10 md:p-12"
            >
              <p className="text-accent-warm font-heading font-semibold text-sm uppercase tracking-wider mb-4">
                {t("about.vision.tag")}
              </p>
              <h2 className="font-heading font-bold text-2xl text-white mb-4">
                {t("about.vision.title")}
              </h2>
              <p className="text-neutral-400 text-[15px] leading-relaxed">
                {t("about.vision.desc")}
              </p>
            </div>
          </div>
        </section>

        {/* ─── Stats ─── */}
        <section className="pb-24 px-6" data-about-stats>
          <div className="max-w-4xl mx-auto bg-surface-dark rounded-2xl py-16 px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
              {(t("about.stats", { returnObjects: true }) as any[]).map((stat, idx) => (
                <div key={idx} data-about-stat>
                  <p className="font-heading font-bold text-[clamp(2.5rem,5vw,3.5rem)] text-accent-warm mb-2">
                    {stat.value}
                  </p>
                  <p className="text-neutral-500 font-medium text-sm uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Values ─── */}
        <section className="pb-32 px-6" data-about-values>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-heading font-bold text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.1] tracking-[-0.02em] text-ink">
                {t("about.values.heading")}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(t("about.values.items", { returnObjects: true }) as any[]).map((value, idx) => (
                <div
                  key={idx}
                  data-about-value
                  className="p-8 rounded-2xl border border-border hover:border-ink/10 transition-colors duration-300"
                >
                  <span className="font-heading font-bold text-4xl text-ink/5 block mb-4">
                    0{idx + 1}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-ink mb-3">
                    {value.title}
                  </h3>
                  <p className="text-ink-secondary text-[15px] leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
