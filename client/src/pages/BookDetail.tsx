import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { books } from "../data/books";
import { generateWhatsAppLink } from "../utils/whatsapp";
import { Button } from "../components/Button";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";

gsap.registerPlugin(ScrollTrigger);

interface EnquiryForm {
  name: string;
  phone: string;
  quantity: number;
  message: string;
}

export default function BookDetail({ bookId }: { bookId?: string }) {
  const { t } = useTranslation();
  const params = useParams();
  const id = bookId || params.id;
  const book = books.find((b) => b.id === id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryForm>({
    defaultValues: {
      quantity: 1,
      message: book ? t("contact.form.message.default", { book: t(`books_data.${book.id}.title`) }) : ""
    },
  });

  useEffect(() => {
    if (!book) return;

    const ctx = gsap.context(() => {
      // Left image reveal
      gsap.from("[data-detail-image]", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      });

      // Right content stagger
      gsap.from("[data-detail-content] > *", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.2,
      });

      // Form reveal
      gsap.from("[data-detail-form]", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-detail-form]",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, [book, id]);

  if (!book) {
    return <Navigate to="/books" replace />;
  }

  const onSubmit = (data: EnquiryForm) => {
    const link = generateWhatsAppLink({
      name: data.name,
      phone: data.phone,
      book: book.title,
      quantity: data.quantity,
      message: data.message,
    });
    window.open(link, "_blank");
    reset({
      name: "",
      phone: "",
      quantity: 1,
      message: book ? t("contact.form.message.default", { book: t(`books_data.${book.id}.title`) }) : "",
    });
  };

  return (
    <>
      {/* ===== SEO ===== */}
      {id === "ekam-1" && (
        <SEO 
          title="Ekam-1 Maths Book | Improve Basic Concepts | Kartavya Publication"
          description="Ekam-1 is a mathematics learning book designed to improve basic concepts with structured explanations and practice exercises for better understanding."
          keywords="Ekam-1 maths book, basic maths concepts, learn maths basics, Gujarati maths book"
        />
      )}
      {id === "aagvu-ganit" && (
        <SEO 
          title="Aagvu Ganit Maths Book | Advanced Concept Learning | Kartavya Publication"
          description="Aagvu Ganit is a comprehensive mathematics book focused on deeper understanding, problem-solving, and strengthening core mathematical concepts."
          keywords="Aagvu Ganit book, advanced maths learning, problem solving maths, Gujarati maths book"
        />
      )}
      {id === "ekam-2" && (
        <SEO 
          title="Ekam-2 Maths Book | Build Strong Foundations | Kartavya Publication"
          description="Ekam-2 helps students strengthen foundational mathematics concepts with structured learning and practice-based exercises for better clarity."
          keywords="Ekam-2 maths book, maths foundation book, practice maths concepts, Gujarati maths book"
        />
      )}
      {/* Fallback SEO if needed */}
      {!["ekam-1", "aagvu-ganit", "ekam-2"].includes(id || "") && (
        <SEO 
          title={`${t(`books_data.${book.id}.title`, { lng: "en" })} — Kartavya Publication`}
          description={t(`books_data.${book.id}.description`)}
          keywords="maths books, kartavya publication"
        />
      )}

      <div className="min-h-screen bg-surface">
        <section className="pt-32 pb-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left: Book Image */}
              <div
                data-detail-image
                className="lg:sticky lg:top-32"
              >
                <div className="relative bg-surface-muted rounded-3xl p-10 md:p-16 flex items-center justify-center">
                  <img
                    src={book.image}
                    alt={`${t(`books_data.${book.id}.title`)} (${t(`books_data.${book.id}.subtitle`)}) — Premium textbook by Kartavya Publication`}
                    className="w-full max-w-xs"
                    loading="eager"
                  />
                  {/* Glow */}
                  <div
                    className="absolute -bottom-4 inset-x-20 h-12 blur-2xl rounded-full pointer-events-none opacity-25"
                    style={{ backgroundColor: book.color }}
                  />
                </div>
              </div>

              {/* Right: Details & Form */}
              <div className="flex flex-col gap-10">
                {/* Content */}
                <div data-detail-content className="flex flex-col gap-5">
                  <p className="text-ink-tertiary font-heading font-semibold text-sm uppercase tracking-wider">
                    {t(`books_data.${book.id}.subtitle`, { lng: "gu" })}
                  </p>
                  <h1 className="font-heading font-bold text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.03em] text-ink">
                    {t(`books_data.${book.id}.title`, { lng: "en" })}
                  </h1>
                  <div className="w-12 h-1 bg-accent-warm rounded-full" />
                  <p className="text-ink-secondary text-[17px] leading-relaxed">
                    {t(`books_data.${book.id}.long_description`)}
                  </p>

                  {/* Features */}
                  <div className="mt-2">
                    <h3 className="font-heading font-bold text-lg text-ink mb-4">
                      {t("contact.enquiry.features")}
                    </h3>
                    <ul className="space-y-3">
                      {(t(`books_data.${book.id}.features`, { returnObjects: true }) as string[]).map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-3 text-ink text-[15px]"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-warm shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Enquiry Form */}
                <div
                  data-detail-form
                  className="bg-surface-muted rounded-2xl p-8 md:p-10"
                >
                  <h3 className="font-heading font-bold text-xl text-ink mb-6">
                    {t("contact.enquiry.title")}
                  </h3>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                    id="enquiry-form"
                  >
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-ink-secondary mb-1.5">
                        {t("contact.form.name.label")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("name", {
                          required: t("contact.form.name.error_required"),
                          minLength: { value: 2, message: t("contact.form.name.error_min") },
                        })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-surface-elevated focus:ring-2 focus:ring-ink/10 focus:border-ink/30 outline-none transition-all text-[15px] placeholder:text-ink-tertiary"
                        placeholder={t("contact.form.name.placeholder")}
                        id="enquiry-name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-ink-secondary mb-1.5">
                        {t("contact.form.phone.label")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        {...register("phone", {
                          required: t("contact.form.phone.error_required"),
                          minLength: { value: 10, message: t("contact.form.phone.error_min") },
                        })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-surface-elevated focus:ring-2 focus:ring-ink/10 focus:border-ink/30 outline-none transition-all text-[15px] placeholder:text-ink-tertiary"
                        placeholder={t("contact.form.phone.placeholder")}
                        id="enquiry-phone"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Book (disabled) */}
                      <div>
                        <label className="block text-sm font-medium text-ink-secondary mb-1.5">
                          {t("contact.form.book.label")}
                        </label>
                        <input
                          value={t(`books_data.${book.id}.title`)}
                          disabled
                          className="w-full px-4 py-3 rounded-xl border border-border bg-surface-muted text-ink-tertiary cursor-not-allowed text-[15px]"
                          id="enquiry-book"
                        />
                      </div>

                      {/* Quantity */}
                      <div>
                        <label className="block text-sm font-medium text-ink-secondary mb-1.5">
                          {t("contact.form.quantity.label")}
                        </label>
                        <input
                          type="number"
                          min={1}
                          {...register("quantity", { min: 1, valueAsNumber: true })}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-surface-elevated focus:ring-2 focus:ring-ink/10 focus:border-ink/30 outline-none transition-all text-[15px]"
                          id="enquiry-quantity"
                        />
                      </div>
                    </div>

                    {/* Message (pre-filled, editable) */}
                    <div>
                      <label className="block text-sm font-medium text-ink-secondary mb-1.5">
                        {t("contact.form.message.label")} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        {...register("message", { required: t("contact.form.message.error_required") })}
                        rows={2}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-surface-elevated focus:ring-2 focus:ring-ink/10 focus:border-ink/30 outline-none transition-all text-[15px] resize-none"
                        id="enquiry-message"
                      />
                      {errors.message && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full py-4 mt-1"
                      id="enquiry-submit"
                    >
                      {t("contact.enquiry.order_button")}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
