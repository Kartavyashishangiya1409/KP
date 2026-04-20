import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Globe, ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { cn } from "../utils/cn";

const languages = [
  { code: "en", name: "English", flag: "EN" },
  { code: "gu", name: "ગુજરાતી", flag: "GU" },
  { code: "hi", name: "हिन्दी", flag: "HI" },
];

const navLinks = [
  { name: "nav.home", path: "/" },
  { name: "nav.books", path: "/books" },
  { name: "nav.about", path: "/about" },
  { name: "nav.contact", path: "/contact" },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const menuRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const currentLanguage = languages.find((l) => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      
      const tl = gsap.timeline();
      
      // Backdrop fade & blur
      tl.fromTo(backdropRef.current, 
        { opacity: 0, backdropFilter: "blur(0px)" },
        { 
          opacity: 1, 
          backdropFilter: "blur(12px)", 
          duration: 0.4, 
          ease: "power2.out" 
        }
      );

      // Panel slide in
      tl.fromTo(menuRef.current,
        { x: "100%" },
        { 
          x: "0%", 
          duration: 0.5, 
          ease: "power3.out" 
        }, 
        "-=0.3"
      );

      // Links stagger
      tl.fromTo(linksRef.current.filter(Boolean),
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.1, 
          ease: "power2.out" 
        },
        "-=0.2"
      );
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const closeMenu = () => {
    const tl = gsap.timeline({
      onComplete: () => setIsOpen(false)
    });

    tl.to(linksRef.current.filter(Boolean), {
      y: 20,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in"
    });

    tl.to(menuRef.current, {
      x: "100%",
      duration: 0.4,
      ease: "power3.in"
    }, "-=0.2");

    tl.to(backdropRef.current, {
      opacity: 0,
      backdropFilter: "blur(0px)",
      duration: 0.3,
      ease: "power2.in"
    }, "-=0.2");
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-500",
          isOpen ? "bg-transparent py-5" : (scrolled ? "nav-glass py-3 border-b border-border-subtle" : "bg-transparent py-5")
        )}
      >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group" id="nav-logo">
          <span className="font-heading font-bold text-[22px] text-ink tracking-tight">
            Kartavya Publication
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10" id="nav-desktop">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-[14px] font-medium transition-colors duration-200 hover:text-ink",
                location.pathname === link.path
                  ? "text-ink"
                  : "text-ink-secondary"
              )}
            >
              {t(link.name)}
            </Link>
          ))}
        </nav>

        {/* Desktop Controls (CTA) */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Language Switcher (Desktop) */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 text-[14px] font-medium text-ink-secondary hover:text-ink transition-colors cursor-pointer py-2"
              id="lang-selector-desktop"
            >
              <Globe className="w-4 h-4" />
              <span>{currentLanguage.flag}</span>
              <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-300", isLangOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 mt-2 w-40 bg-white rounded-2xl shadow-xl border border-border-subtle p-2 z-[60]"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-[14px] transition-all duration-200 cursor-pointer",
                        i18n.language === lang.code
                          ? "bg-neutral-50 text-ink font-semibold"
                          : "text-ink-secondary hover:bg-neutral-50 hover:text-ink"
                      )}
                    >
                      {lang.name}
                      {i18n.language === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-ink" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/contact">
            <button
              className="bg-ink text-ink-inverse px-6 py-2.5 rounded-full text-[14px] font-medium hover:bg-neutral-800 transition-all duration-300 active:scale-[0.97] cursor-pointer shadow-sm"
              id="nav-cta"
            >
              {t("nav.enquire_now")}
            </button>
          </Link>
        </div>

      {/* Mobile/Tablet Controls */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Language Switcher (Mobile/Tablet) */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-3 py-2 text-[13px] font-bold text-ink-secondary hover:text-ink transition-colors cursor-pointer"
              id="lang-selector-mobile"
            >
              <Globe className="w-4 h-4" />
              <span>{currentLanguage.flag}</span>
              <ChevronDown className={cn("w-3 transition-transform duration-300", isLangOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 mt-2 w-40 bg-white rounded-2xl shadow-xl border border-border-subtle p-2 z-[60]"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-[14px] transition-all duration-200 cursor-pointer",
                        i18n.language === lang.code
                          ? "bg-neutral-50 text-ink font-semibold"
                          : "text-ink-secondary hover:bg-neutral-50 hover:text-ink"
                      )}
                    >
                      {lang.name}
                      {i18n.language === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-ink" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hamburger Toggle */}
          {!isOpen && (
            <button
              className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
              onClick={() => setIsOpen(true)}
              aria-label="Toggle navigation"
              id="nav-mobile-toggle"
            >
              <span className="block w-5 h-[1.5px] bg-ink" />
              <span className="block w-5 h-[1.5px] bg-ink" />
            </button>
          )}
        </div>
      </div>
    </header>

      {/* Full-screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            {/* Backdrop */}
            <div 
              ref={backdropRef}
              onClick={closeMenu}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Menu Panel */}
            <div 
              ref={menuRef}
              className="absolute top-0 right-0 bottom-0 w-full bg-white shadow-2xl flex flex-col"
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between px-6 py-6 border-b border-border-subtle">
                <span className="font-heading font-bold text-[20px] text-ink">
                  Kartavya Publication
                </span>
                
                <div className="flex items-center gap-4">
                  {/* Reuse Desktop Language Selector logic or simplified one */}
                  <div className="relative">
                    <button
                      onClick={() => setIsLangOpen(!isLangOpen)}
                      className="flex items-center gap-1.5 text-[13px] font-bold text-ink-secondary"
                    >
                      <Globe className="w-4 h-4" />
                      <span>{currentLanguage.flag}</span>
                      <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-300", isLangOpen && "rotate-180")} />
                    </button>
                    {isLangOpen && (
                      <div className="absolute right-0 mt-3 w-32 bg-white rounded-xl shadow-lg border border-border-subtle p-1 z-[110]">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              i18n.changeLanguage(lang.code);
                              setIsLangOpen(false);
                            }}
                            className={cn(
                              "w-full px-3 py-2 text-left text-[13px] rounded-lg",
                              i18n.language === lang.code ? "bg-neutral-50 text-ink font-bold" : "text-ink-secondary"
                            )}
                          >
                            {lang.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={closeMenu}
                    className="w-10 h-10 flex items-center justify-center text-ink hover:opacity-60 transition-opacity cursor-pointer"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Center Links */}
              <nav className="flex-1 flex flex-col justify-center items-center px-8 gap-10">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    ref={(el) => { linksRef.current[index] = el; }}
                    className={cn(
                      "text-5xl font-heading font-bold tracking-tight transition-colors text-center",
                      location.pathname === link.path ? "text-ink" : "text-ink-secondary hover:text-ink"
                    )}
                  >
                    {t(link.name)}
                  </Link>
                ))}
              </nav>

              {/* Bottom CTA */}
              <div className="px-6 py-8 border-t border-border-subtle">
                <Link to="/contact" onClick={closeMenu}>
                  <button 
                   ref={(el) => { linksRef.current[navLinks.length] = el as any; }}
                   className="w-full bg-ink text-ink-inverse py-4 rounded-2xl text-[16px] font-bold shadow-lg active:scale-[0.98] transition-all cursor-pointer"
                  >
                    {t("nav.enquire_now")}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
