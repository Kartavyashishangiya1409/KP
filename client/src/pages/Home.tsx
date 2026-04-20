import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { books } from "../data/books";
import { Button } from "../components/Button";
import { useTranslation } from "react-i18next";
import { cn } from "../utils/cn";
import SEO from "../components/SEO";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const showcaseTrackRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ────────── HERO ──────────
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      heroTl
        .from("[data-hero-tag]", {
          y: 20,
          opacity: 0,
          duration: 0.6,
        })
        .from(
          "[data-hero-heading] .word",
          {
            y: 60,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
          },
          "-=0.3"
        )
        .from(
          "[data-hero-sub]",
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          "[data-hero-cta]",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.3"
        )
        .from(
          "[data-hero-image]",
          {
            opacity: 0,
            duration: 1,
          },
          "-=0.6"
        );

      // Hero image expand on scroll — small circle to full size (pinned)
      gsap.fromTo(
        "[data-hero-image]",
        {
          clipPath: "inset(25% round 50%)",
          scale: 0.7,
        },
        {
          clipPath: "inset(0% round 16px)",
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-hero-image]",
            start: "center center",
            end: "+=800",
            scrub: 1,
            pin: true,
            pinSpacing: true,
          },
        }
      );

      // ────────── STATEMENT ──────────
      gsap.from("[data-statement-text]", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statementRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // ────────── SPLIT SECTION ──────────
      gsap.from("[data-split-image]", {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: splitRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Split image parallax
      gsap.to("[data-split-image]", {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: splitRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.from("[data-split-text] > *", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: splitRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // ────────── BOOKS SHOWCASE — HORIZONTAL SCROLL ──────────
      gsap.from("[data-showcase-heading]", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: showcaseRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Horizontal scroll: pin the section, slide the track left
      if (showcaseTrackRef.current && showcaseRef.current) {
        const track = showcaseTrackRef.current;
        const getScrollAmount = () => {
          const items = track.children;
          if (items.length === 0) return 0;
          const lastItem = items[items.length - 1] as HTMLElement;
          // Calculate distance to perfectly center the last item in the viewport
          return lastItem.offsetLeft + (lastItem.offsetWidth / 2) - (window.innerWidth / 2);
        };

        const scrollTween = gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: showcaseRef.current,
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
            scrub: 0.8,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        // Animate each book panel as it enters the viewport during horizontal scroll
        gsap.utils.toArray<HTMLElement>("[data-book-item]").forEach((item) => {
          gsap.from(item, {
            opacity: 0,
            x: 200,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              containerAnimation: scrollTween,
              start: "left 90%",
              end: "left 60%",
              scrub: 1,
            },
          });
        });
      }

      // ────────── WHY SECTION ──────────
      gsap.from("[data-why-heading]", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: whyRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from("[data-why-item]", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-why-item]",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // ────────── CTA SECTION ──────────
      gsap.from("[data-cta-content] > *", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const whyItems = [
    {
      number: "01",
      title: "Precision",
      desc: "Targeted, syllabus-aligned content with zero fluff.",
    },
    {
      number: "02",
      title: "Clarity",
      desc: "Structured to match natural learning patterns.",
    },
    {
      number: "03",
      title: "Results",
      desc: "Built to maximize scores and competitive readiness.",
    },
    {
      number: "04",
      title: "Quality",
      desc: "Error-free, expertly reviewed academic literature.",
    },
  ];

  return (
    <>
      {/* ===== SEO ===== */}
      <SEO 
        title="Kartavya Publication | Improve Mathematics Basics with Easy Learning Books"
        description="Discover structured and easy-to-understand mathematics books by Kartavya Publication. Designed to improve basic concepts and build strong foundations in maths."
        keywords="maths book, learn mathematics, improve maths basics, easy maths concepts, Gujarati maths book"
      />

      <div className="overflow-x-hidden">
        {/* ═══════════════════════════════════════════
            1. HERO — FULL SCREEN
        ═══════════════════════════════════════════ */}
        <section
          ref={heroRef}
          className="relative bg-surface overflow-hidden"
          id="hero"
        >
          {/* Subtle radial gradient bg */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(217,119,6,0.04)_0%,_transparent_70%)] pointer-events-none" />

          {/* Hero Text — centered on screen */}
          <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
            <div className="max-w-5xl mx-auto text-center">
              {/* Tag */}
              <div
                data-hero-tag
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border text-ink-secondary text-[13px] font-medium mb-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent-warm" />
                {t("home.hero.tag")}
              </div>

              {/* Heading — very large */}
              <h1
                data-hero-heading
                className="font-heading font-extrabold text-[clamp(2.5rem,7vw,6rem)] leading-[1.05] tracking-[-0.03em] text-ink mb-6"
              >
                {t("home.hero.heading").split(" ").map((word, i) => (
                  <span key={i} className={cn("word inline-block", i === t("home.hero.heading").split(" ").length - 1 && "text-gradient-warm")}>
                    {word}&nbsp;
                  </span>
                ))}
              </h1>

              {/* Subtitle */}
              <p
                data-hero-sub
                className="text-ink-secondary text-[clamp(1rem,2vw,1.25rem)] leading-relaxed max-w-2xl mx-auto mb-10"
              >
                {t("home.hero.subtitle")}
              </p>

              {/* CTAs */}
              <div data-hero-cta className="flex flex-wrap justify-center gap-4">
                <Link to="/books">
                  <Button size="lg">{t("home.hero.cta_books")}</Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg">
                    {t("home.hero.cta_contact")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="px-6 pb-20">
            <div
              data-hero-image
              className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl"
            >
              <img
                src="/images/hero.png"
                alt="Premium educational books by Kartavya Publication arranged on a marble surface"
                className="w-full rounded-2xl"
                loading="eager"
              />
              {/* Soft glow beneath */}
              <div className="absolute -bottom-10 inset-x-10 h-24 bg-accent-warm/10 blur-3xl rounded-full pointer-events-none" />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            2. STATEMENT SECTION
        ═══════════════════════════════════════════ */}
        <section
          ref={statementRef}
          className="py-32 md:py-44 px-6 bg-surface-dark"
          id="statement"
        >
          <div className="max-w-4xl mx-auto text-center" data-cursor="medium">
            <p
              data-statement-text
              data-cursor="medium"
              className="font-heading font-bold text-[clamp(1.5rem,4vw,3.25rem)] leading-[1.15] tracking-[-0.02em] text-white"
            >
              {t("home.statement.text_main")}
              <br />
              <span className="text-neutral-500" data-cursor="medium">
                {t("home.statement.text_sub")}
              </span>
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            3. SPLIT SECTION — IMAGE + TEXT
        ═══════════════════════════════════════════ */}
        <section
          ref={splitRef}
          className="py-24 md:py-36 px-6 bg-surface"
          id="approach"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image */}
            <div data-split-image className="relative">
              <img
                src="/images/study.png"
                alt="Student studying mathematics from a premium Kartavya Publication textbook"
                className="w-full rounded-2xl"
                loading="lazy"
              />
            </div>

            {/* Text */}
            <div data-split-text className="max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              <p className="text-accent-warm font-heading font-semibold text-sm uppercase tracking-wider mb-4">
                {t("home.approach.tag")}
              </p>
              <h2 className="font-heading font-bold text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-[-0.02em] text-ink mb-6">
                {t("home.approach.heading")}
              </h2>
              <p className="text-ink-secondary text-[17px] leading-relaxed mb-8">
                {t("home.approach.description")}
              </p>
              <ul className="space-y-4 inline-block text-left lg:block">
                {(t("home.approach.features", { returnObjects: true }) as string[]).map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-ink text-[15px]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-warm shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            4. BOOKS SHOWCASE — Horizontal scroll
        ═══════════════════════════════════════════ */}
        <section
          ref={showcaseRef}
          className="bg-surface-muted overflow-hidden h-screen flex flex-col"
          id="books-showcase"
        >
          {/* Heading — sits above the pinned area */}
          <div data-showcase-heading className="text-center shrink-0 pt-20 md:pt-28 pb-8 px-6">
            <p className="text-ink-tertiary font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              {t("home.collection.tag")}
            </p>
            <h2 className="font-heading font-bold text-[clamp(1.75rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-ink">
              {t("home.collection.heading")}
            </h2>
          </div>

          {/* Horizontal scroll track */}
          <div
            ref={showcaseTrackRef}
            className="flex items-center flex-1"
            style={{ width: "fit-content" }}
          >
            {books.map((book) => (
              <div
                key={book.id}
                data-book-item
                className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-20 px-6 md:px-12 lg:px-20 h-full"
                style={{ width: "100vw", flexShrink: 0 }}
              >
                {/* Image */}
                <div className="relative group flex-shrink-0 w-[65%] sm:w-[50%] md:w-[40%] lg:w-[40%] max-w-[280px] lg:max-w-md">
                  <img
                    src={book.image}
                    alt={`${book.title} (${book.subtitle}) — Premium mathematics textbook by Kartavya Publication`}
                    className="w-full rounded-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  {/* Soft glow */}
                  <div
                    className="absolute -bottom-6 inset-x-8 lg:inset-x-16 h-12 lg:h-16 blur-xl lg:blur-2xl rounded-full pointer-events-none opacity-30 transition-opacity duration-500 group-hover:opacity-50"
                    style={{ backgroundColor: book.color }}
                  />
                </div>

                {/* Content */}
                <div className="max-w-sm md:max-w-md lg:max-w-lg flex flex-col items-center lg:items-start text-center lg:text-left">
                  <p className="text-ink-tertiary font-heading font-semibold text-xs md:text-sm uppercase tracking-wider mb-2 md:mb-3">
                    {t(`books_data.${book.id}.subtitle`, { lng: "gu" })}
                  </p>
                  <h3 className="font-heading font-bold text-[clamp(1.5rem,4vw,2.5rem)] leading-[1.1] tracking-[-0.02em] text-ink mb-3 md:mb-5">
                    {t(`books_data.${book.id}.title`, { lng: "en" })}
                  </h3>
                  <p className="text-ink-secondary text-[14px] md:text-[16px] leading-relaxed mb-6 md:mb-8">
                    {t(`books_data.${book.id}.description`)}
                  </p>
                  <Link to={`/books/${book.id}`}>
                    <Button variant="outline" size="md">
                      {t("books_page.details_button")} →
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            5. WHY SECTION — Horizontal layout
        ═══════════════════════════════════════════ */}
        <section
          ref={whyRef}
          className="py-24 md:py-36 px-6 bg-surface"
          id="why-kartavya"
        >
          <div className="max-w-7xl mx-auto">
            <div data-why-heading className="text-center mb-20">
              <h2 className="font-heading font-bold text-[clamp(1.75rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-ink">
                {t("home.why.heading")}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {(t("home.why.items", { returnObjects: true }) as any[]).map((item, index) => (
                <div key={index} data-why-item className="text-center lg:text-left">
                  <span className="font-heading font-bold text-5xl text-ink/5 block mb-4">
                    {`0${index + 1}`}
                  </span>
                  <h3 className="font-heading font-bold text-xl text-ink mb-3">
                    {item.title}
                  </h3>
                  <p className="text-ink-secondary text-[15px] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            6. CTA SECTION — Bold, full-width
        ═══════════════════════════════════════════ */}
        <section
          ref={ctaRef}
          className="py-32 md:py-44 px-6 bg-surface-dark relative overflow-hidden"
          id="cta"
        >
          {/* Subtle gradient accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-warm/8 rounded-full blur-[120px] pointer-events-none" />

          <div
            data-cta-content
            className="relative z-10 max-w-3xl mx-auto text-center"
          >
            <h2 className="font-heading font-bold text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.1] tracking-[-0.02em] text-white mb-6">
              {t("home.cta.heading")}
            </h2>
            <p className="text-neutral-400 text-lg mb-10 max-w-xl mx-auto">
              {t("home.cta.subtitle")}
            </p>
            <Link to="/contact">
              <Button variant="secondary" size="lg">
                {t("home.cta.button")}
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
