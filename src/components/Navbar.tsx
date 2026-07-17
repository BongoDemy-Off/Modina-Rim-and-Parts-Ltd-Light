import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, X, Menu as MenuIcon, Search, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const lang = i18n.language === 'bn' ? 'BN' : 'EN';

  const toggleLanguage = () => {
    i18n.changeLanguage(lang === 'EN' ? 'bn' : 'en');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const navItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.products'), path: '/products' },
    {
      name: t('nav.quality_dropdown'),
      dropdown: [
        { name: t('nav.quality_assurance'), path: '/quality' },
        { name: t('nav.certificates'), path: '/certificates' },
        { name: t('nav.sustainability'), path: '/sustainability' }
      ]
    },
    {
      name: t('nav.company'),
      dropdown: [
        { name: t('nav.about'), path: '/about' },
        { name: t('nav.mission'), path: '/mission' },
        { name: t('nav.careers'), path: '/careers' },
        { name: t('nav.faq'), path: '/faq' },
        { name: t('nav.downloads'), path: '/downloads' }
      ]
    },
    {
      name: t('nav.media'),
      dropdown: [
        { name: t('nav.news'), path: '/news' },
        { name: t('nav.gallery'), path: '/gallery' },
        { name: t('nav.blog'), path: '/blog' }
      ]
    },
    { name: t('nav.contact'), path: '/contact', isButton: true }
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300 bg-white border-b border-modina-border',
          isScrolled
            ? 'h-16 shadow-[0px_8px_24px_rgba(0,0,0,0.06)]'
            : 'h-[72px]'
        )}
      >
        <div className="container-premium h-full flex items-center justify-between gap-6">
          {/* Left: Logo + Wordmark */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex items-center gap-3 shrink-0"
          >
            <Link to="/" className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-modina-border shadow-[var(--shadow-sm)] hover:scale-105 transition-transform duration-300">
              <Logo className="w-7 h-7 object-contain" />
            </Link>
            <Link to="/" className="hidden sm:flex flex-col leading-tight hover:opacity-80 transition-opacity">
              <span className="font-display font-bold text-modina-heading text-sm tracking-tight">MODINA <span className="text-modina-red">RIM</span></span>
              <span className="text-modina-muted text-[11px] font-medium tracking-wide">& Parts Ltd.</span>
            </Link>
          </motion.div>

          {/* Center: Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1 h-full">
            {navItems.map((item, idx) => {
              const isActive = location.pathname === item.path;

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + idx * 0.05, ease: 'easeOut' }}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.dropdown ? (
                    <div
                      className={cn(
                        'flex items-center gap-1.5 px-4 py-2 rounded-lg cursor-pointer text-[15px] font-semibold transition-all duration-200',
                        activeDropdown === item.name
                          ? 'text-modina-red bg-modina-red/5'
                          : 'text-modina-muted hover:text-modina-heading hover:bg-modina-bg-alt'
                      )}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={cn('w-4 h-4 transition-transform duration-200', activeDropdown === item.name ? 'rotate-180 text-modina-red' : '')}
                      />
                    </div>
                  ) : item.isButton ? (
                    <Link
                      to={item.path!}
                      className="ml-2 btn-primary text-sm gap-2"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <Link
                      to={item.path!}
                      className={cn(
                        'px-4 py-2 rounded-lg text-[15px] font-semibold transition-all duration-200 relative',
                        isActive
                          ? 'text-modina-red'
                          : 'text-modina-muted hover:text-modina-heading hover:bg-modina-bg-alt'
                      )}
                    >
                      {item.name}
                      {isActive && (
                        <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-modina-red rounded-full" />
                      )}
                    </Link>
                  )}

                  {/* Dropdown */}
                  {item.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.97 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-3 min-w-[220px]"
                        >
                          <div className="bg-white border border-modina-border rounded-[8px] shadow-[var(--shadow-md)] p-2 flex flex-col gap-0.5">
                            {item.dropdown.map((subItem) => {
                              const isSubActive = location.pathname === subItem.path;
                              return (
                                <Link
                                  key={subItem.name}
                                  to={subItem.path}
                                  className={cn(
                                    'flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition-all duration-200',
                                    isSubActive
                                      ? 'text-modina-red bg-modina-red/5'
                                      : 'text-modina-text hover:text-modina-red hover:bg-modina-bg-alt'
                                  )}
                                >
                                  <span
                                    className={cn(
                                      'w-1.5 h-1.5 rounded-full bg-modina-red transition-opacity duration-200',
                                      isSubActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                                    )}
                                  />
                                  {subItem.name}
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </motion.div>
              );
            })}
          </nav>

          {/* Right: Search + Language + Mobile Toggle */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="flex items-center gap-3 shrink-0"
          >
            {/* Search */}
            <div className="relative hidden md:block group">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-modina-subtle group-focus-within:text-modina-red transition-colors duration-200" />
              <input
                type="text"
                placeholder={lang === 'EN' ? 'Search...' : 'অনুসন্ধান...'}
                className="bg-modina-bg-alt border border-modina-border rounded-lg py-2.5 pl-10 pr-4 text-sm text-modina-text focus:outline-none focus:border-modina-red focus:ring-2 focus:ring-modina-red/20 transition-all duration-200 w-44 lg:w-56 placeholder:text-modina-subtle"
              />
            </div>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 bg-modina-bg-alt hover:bg-modina-bg-section border border-modina-border rounded-lg px-3 py-2.5 transition-all duration-200 hover:border-modina-red/40"
            >
              <Globe className="w-4 h-4 text-modina-muted" />
              <span className="text-xs font-bold tracking-wider text-modina-heading">{lang}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <div className="xl:hidden">
              <button
                onClick={() => setIsOpen(true)}
                className="p-2.5 text-modina-muted hover:text-modina-red hover:bg-modina-bg-alt rounded-lg transition-all duration-200"
                aria-label="Open menu"
              >
                <MenuIcon className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 bg-white z-[60] flex flex-col overflow-y-auto"
          >
            {/* Mobile Header */}
            <div className="flex justify-between items-center h-16 border-b border-modina-border px-6 shrink-0">
              <Link to="/" className="flex items-center gap-2.5" onClick={() => setIsOpen(false)}>
                <Logo className="w-8 h-8" />
                <span className="font-display font-bold text-modina-heading text-sm">
                  MODINA <span className="text-modina-red">RIM</span>
                </span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-modina-muted hover:text-modina-red hover:bg-modina-bg-alt rounded-lg transition-all duration-200"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Nav Items */}
            <div className="flex-1 flex flex-col p-6 gap-2">
              {navItems.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.07, duration: 0.3, ease: 'easeOut' }}
                >
                  {link.dropdown ? (
                    <div className="flex flex-col">
                      <span className="text-modina-heading font-bold text-lg py-3 px-2 border-b border-modina-divider">
                        {link.name}
                      </span>
                      <div className="flex flex-col pl-4 pt-1 gap-0.5">
                        {link.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            className="flex items-center gap-2.5 py-3 px-2 text-modina-muted font-medium hover:text-modina-red transition-colors duration-200"
                          >
                            <span className="w-1 h-1 rounded-full bg-modina-red opacity-60" />
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : link.isButton ? (
                    <Link
                      to={link.path!}
                      className="mt-4 btn-primary w-full justify-center text-base"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <Link
                      to={link.path!}
                      className={cn(
                        'block py-3 px-2 text-xl font-bold border-b border-modina-divider transition-colors duration-200',
                        location.pathname === link.path
                          ? 'text-modina-red'
                          : 'text-modina-heading hover:text-modina-red'
                      )}
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Mobile Footer */}
            <div className="p-6 border-t border-modina-border">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-modina-muted hover:text-modina-red transition-colors duration-200"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-semibold">{lang === 'EN' ? 'বাংলা' : 'English'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
