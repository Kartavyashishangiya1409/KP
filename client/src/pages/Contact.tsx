import { useEffect } from "react";
import { useForm } from "react-hook-form";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { books } from "../data/books";
import { generateWhatsAppLink } from "../utils/whatsapp";
import { Button } from "../components/Button";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";

gsap.registerPlugin(ScrollTrigger);

interface ContactForm {
  name: string;
  phone: string;
  book: string;
  quantity: number;
  message: string;
}

export default function Contact() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    defaultValues: { quantity: 1 },
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.from("[data-contact-heading] > *", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      });

      // Info
      gsap.from("[data-contact-info] > *", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.3,
      });

      // Form
      gsap.from("[data-contact-form]", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2,
      });
    });

    return () => ctx.revert();
  }, []);

  const onSubmit = (data: ContactForm) => {
    const link = generateWhatsAppLink({
      name: data.name,
      phone: data.phone,
      book: data.book || undefined,
      quantity: data.quantity || undefined,
      message: data.message || undefined,
    });
    window.open(link, "_blank");
    reset({
      name: "",
      phone: "",
      book: "",
      quantity: 1,
      message: "",
    });
  };


  return (
    <>
      <SEO 
        title="Contact Kartavya Publication | Enquire About Maths Books"
        description="Get in touch with Kartavya Publication for enquiries about our maths learning books. Contact us via WhatsApp or fill out the enquiry form."
        keywords="contact maths books, enquire maths books, kartavya publication contact"
      />

      <div className="min-h-screen bg-surface">
        {/* Header */}
        <section className="pt-36 pb-16 px-6">
          <div data-contact-heading className="max-w-3xl mx-auto text-center">
            <p className="text-ink-tertiary font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              {t("contact.hero.tag")}
            </p>
            <h1 className="font-heading font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.03em] text-ink mb-6">
              {t("contact.hero.title")}
            </h1>
            <p className="text-ink-secondary text-[17px] leading-relaxed max-w-xl mx-auto">
              {t("contact.hero.subtitle")}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="pb-32 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20">
            {/* Contact Info */}
            <div
              data-contact-info
              className="lg:col-span-2 flex flex-col gap-8"
            >
              <h2 className="font-heading font-bold text-2xl text-ink">
                {t("contact.info.title")}
              </h2>
              {Object.entries(t("contact.info.details", { returnObjects: true }) as Record<string, any>).map(([key, detail]) => (
                <div key={key}>
                  <p className="text-ink-tertiary font-heading font-semibold text-xs uppercase tracking-wider mb-1.5">
                    {detail.label}
                  </p>
                  <p className="text-ink text-[15px] whitespace-pre-line leading-relaxed">
                    {detail.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Form */}
            <div
              data-contact-form
              className="lg:col-span-3 bg-surface-muted rounded-2xl p-8 md:p-10"
            >
              <h3 className="font-heading font-bold text-xl text-ink mb-8">
                {t("contact.form.title")}
              </h3>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
                id="contact-form"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-ink-secondary mb-1.5">
                      {t("contact.form.name.label")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("name", { required: t("contact.form.name.error_required"), minLength: { value: 2, message: t("contact.form.name.error_min") } })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-surface-elevated focus:ring-2 focus:ring-ink/10 focus:border-ink/30 outline-none transition-all text-[15px] placeholder:text-ink-tertiary"
                      placeholder={t("contact.form.name.placeholder")}
                      id="contact-name"
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
                      id="contact-phone"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Book Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-ink-secondary mb-1.5">
                      {t("contact.form.book.label")}
                    </label>
                    <select
                      {...register("book")}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-surface-elevated focus:ring-2 focus:ring-ink/10 focus:border-ink/30 outline-none transition-all text-[15px]"
                      id="contact-book"
                    >
                      <option value="">{t("contact.form.book.placeholder")}</option>
                      {books.map((b) => (
                        <option key={b.id} value={`${b.title} (${b.subtitle})`}>
                          {b.title} ({b.subtitle})
                        </option>
                      ))}
                    </select>
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
                      id="contact-quantity"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-ink-secondary mb-1.5">
                    {t("contact.form.message.label")} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register("message", { required: t("contact.form.message.error_required") })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-surface-elevated focus:ring-2 focus:ring-ink/10 focus:border-ink/30 outline-none transition-all text-[15px] placeholder:text-ink-tertiary resize-none"
                    placeholder={t("contact.form.message.placeholder")}
                    id="contact-message"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs -mt-0.5">
                      {errors.message.message}
                    </p>
                  )}  
                </div>

                <Button
                  type="submit"
                  className="w-full py-4 mt-1"
                  id="contact-submit"
                >
                  {t("contact.form.submit")}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
