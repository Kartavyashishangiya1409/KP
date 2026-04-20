import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-surface-dark text-ink-inverse">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
          {/* Brand */}
          <div className="space-y-5 md:col-span-1">
            <Link to="/" className="inline-block">
              <span className="font-heading font-bold text-2xl tracking-tight">
                Kartavya Publication
              </span>
            </Link>
            <p className="text-neutral-400 text-[15px] leading-relaxed max-w-sm">
              {t("footer.description")}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-neutral-500 mb-6">
              {t("footer.sections.navigate")}
            </h4>
            <ul className="space-y-4">
              {[
                { name: t("nav.home"), path: "/" },
                { name: t("nav.books"), path: "/books" },
                { name: t("nav.about"), path: "/about" },
                { name: t("nav.contact"), path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-neutral-400 text-[15px] hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-neutral-500 mb-6">
              {t("footer.sections.contact")}
            </h4>
            <ul className="space-y-4 text-neutral-400 text-[15px]">
              <li>{t("footer.address")}</li>
              <li>+91 97269 82383</li>
              <li>+91 83209 98157</li>
              <li>kartavyapublication@gmail.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} Kartavya Publication. {t("footer.rights")}
          </p>
          <div className="flex gap-6 text-neutral-500 text-sm">
            <span className="hover:text-neutral-300 cursor-pointer transition-colors">
              {t("footer.privacy")}
            </span>
            <span className="hover:text-neutral-300 cursor-pointer transition-colors">
              {t("footer.terms")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
