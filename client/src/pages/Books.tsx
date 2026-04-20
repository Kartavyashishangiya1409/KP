import { useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { books } from "../data/books";
import { Button } from "../components/Button";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";

gsap.registerPlugin(ScrollTrigger);

export default function Books() {
  const { t } = useTranslation();
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Page heading
      gsap.from("[data-books-heading] > *", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      });

      // Book items stagger
      gsap.from("[data-books-item]", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-books-item]",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SEO 
        title="Our Maths Books | Kartavya Publication"
        description="Explore our collection of mathematics learning books designed to simplify concepts, improve understanding, and build strong foundational skills."
        keywords="maths books collection, learning maths books, practice maths book, maths study material"
      />

      <div className="min-h-screen bg-surface">
        {/* Header */}
        <section className="pt-36 pb-16 px-6">
          <div data-books-heading className="max-w-3xl mx-auto text-center">
            <p className="text-ink-tertiary font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              {t("books_page.header.tag")}
            </p>
            <h1 className="font-heading font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.03em] text-ink mb-6">
               {t("books_page.header.title")}
            </h1>
            <p className="text-ink-secondary text-[17px] leading-relaxed max-w-xl mx-auto">
               {t("books_page.header.subtitle")}
            </p>
          </div>
        </section>

        {/* Books List */}
        <section className="pb-32 px-6">
          <div className="max-w-6xl mx-auto space-y-24">
            {books.map((book, index) => (
              <Link
                key={book.id}
                to={`/books/${book.id}`}
                className="block group"
                data-books-item
                data-no-magnetic="true"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                    index % 2 === 1 ? "" : ""
                  }`}
                >
                  {/* Image */}
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="relative">
                      <img
                        src={book.image}
                        alt={`${book.title} (${book.subtitle}) by Kartavya Publication`}
                        className="w-full max-w-sm mx-auto rounded-2xl transition-transform duration-700 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <div
                        className="absolute -bottom-4 inset-x-12 h-12 blur-2xl rounded-full pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                        style={{ backgroundColor: book.color }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`max-w-lg ${
                      index % 2 === 1 ? "lg:order-1 lg:text-right lg:ml-auto" : ""
                    }`}
                  >
                    <p className="text-ink-tertiary font-heading font-semibold text-sm uppercase tracking-wider mb-3">
                      {t(`books_data.${book.id}.subtitle`, { lng: "gu" })}
                    </p>
                    <h2 className="font-heading font-bold text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.1] tracking-[-0.02em] text-ink mb-5 group-hover:text-accent-warm transition-colors duration-300">
                      {t(`books_data.${book.id}.title`, { lng: "en" })}
                    </h2>
                    <p className="text-ink-secondary text-[16px] leading-relaxed mb-6">
                      {t(`books_data.${book.id}.description`)}
                    </p>
                    <Button variant="outline" size="md">
                      {t("books_page.details_button")} →
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
