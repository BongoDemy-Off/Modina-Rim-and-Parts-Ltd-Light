import React, { useRef, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useInView, useMotionValue, useTransform, animate, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Settings, Award, Download, Quote, Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import facilityVideo from '@/assets/State of the Art Facility.webm';
import premiumRimsImg from '@/assets/Premium Rims.webp';
import wasarImg from '@/assets/wasar.webp';
import cngRimImg from '@/assets/CNG Rim.webp';
import bicycleRickshawImg from '@/assets/cat_motorcycle_parts.webp';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest) + suffix);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, target, { duration: 2.5, ease: [0.16, 1, 0.3, 1] });
      return controls.stop;
    }
  }, [inView, target, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function Home() {
  const { t, i18n } = useTranslation();
  const segmenter = new Intl.Segmenter(i18n.language || 'en', { granularity: 'grapheme' });
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonials = [
    { quote: "Modina's premium rims have significantly reduced our warranty claims. Their precision engineering is unmatched in the region.", author: 'Md. Faruk Hossain', company: 'Global Auto Corp', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80' },
    { quote: 'A reliable partner for over 10 years. Their commitment to quality and timely delivery keeps our assembly lines moving.', author: 'Supply Chain Manager', company: 'Metro Vehicles Ltd.', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80' },
    { quote: 'The durability of their motorcycle components under extreme conditions is exactly what our customers demand.', author: 'Chief Engineer', company: 'Apex Motors', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80' }
  ];

  const nextTestimonial = () => setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="flex flex-col min-h-screen bg-white text-modina-text font-sans">
      <Helmet>
        <title>Modina Rim &amp; Parts Ltd. | Automotive Components Manufacturer — Bangladesh</title>
        <meta name="description" content="Modina Rim &amp; Parts Ltd. is an ISO 9001:2015, ISO 14001:2015, and ISO 45001:2018 certified manufacturer of premium motorcycle rims, rickshaw rims, and automotive hardware in Jashore, Bangladesh." />
        <meta property="og:title" content="Modina Rim &amp; Parts Ltd. | Automotive Components Manufacturer" />
        <meta property="og:description" content="Triple ISO-certified manufacturer of 21+ premium automotive rim and parts products. Supplying domestic and export markets from Jashore, Bangladesh since 2010." />
        <meta property="og:image" content="/hero.jpg" />
        <meta property="og:url" content="https://www.modinarim.com/" />
        <link rel="canonical" href="https://www.modinarim.com/" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          'name': 'Modina Rim & Parts Ltd.',
          'description': 'ISO-certified manufacturer of automotive rims and parts in Bangladesh',
          'url': 'https://www.modinarim.com',
          'foundingDate': '2010',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'Plot S1/A, BSCIC Industrial Area, Jhumjhumpur',
            'addressLocality': 'Jashore',
            'addressCountry': 'BD'
          },
          'contactPoint': {
            '@type': 'ContactPoint',
            'email': 'sales@modinarim.com',
            'telephone': '+880 1234 567890',
            'contactType': 'sales'
          }
        })}</script>
      </Helmet>

      {/* ═══════════════════════════════════════════════════
          1. HERO — Split Layout (Text Left / Image Right)
      ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-[100dvh] w-full flex items-center bg-white pt-[72px] overflow-hidden">
        <div className="container-premium w-full h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center w-full py-20 lg:py-0 min-h-[calc(100dvh-72px)]">

            {/* LEFT — Text Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.2 } } }}
              className="flex flex-col items-start"
            >
              {/* Eyebrow Badge */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
                className="inline-flex items-center gap-2.5 mb-8 bg-modina-red/8 border border-modina-red/20 px-5 py-2 rounded-full"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-modina-red opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-modina-red" />
                </span>
                <span className="text-modina-red text-sm font-bold tracking-wide">{t('home.hero_eyebrow')}</span>
              </motion.div>

              {/* Hero Title */}
              <motion.h1
                variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } }}
                className="font-display font-bold text-modina-heading leading-[1.05] tracking-tight mb-6"
                style={{ fontSize: 'clamp(40px, 5.5vw, 70px)' }}
              >
                <span className="block">
                  {Array.from(segmenter.segment(t('home.hero_title_1'))).map((s) => s.segment).map((letter, i) => (
                    <motion.span
                      key={`eng-${i}`}
                      whileHover={{ y: -4, color: '#E52525' }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="inline-block"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
                <span className="block text-modina-red">
                  {Array.from(segmenter.segment(t('home.hero_title_2'))).map((s) => s.segment).map((letter, i) => (
                    <motion.span
                      key={`exc-${i}`}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="inline-block"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              </motion.h1>

              {/* Hero Body */}
              <motion.p
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
                className="text-modina-muted leading-relaxed max-w-xl mb-10"
                style={{ fontSize: 'clamp(17px, 1.5vw, 20px)' }}
              >
                {t('home.hero_body')}
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
                className="flex flex-col sm:flex-row items-start gap-4 mb-12"
              >
                <Link
                  to="/products"
                  className="btn-primary gap-3 group text-base"
                >
                  Explore Catalog
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link
                  to="/about"
                  className="btn-secondary gap-3 text-base"
                >
                  Our Capabilities
                </Link>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
                className="flex flex-wrap gap-3"
              >
                {['ISO Certified', '15+ Years', '21+ Products', 'Export Quality'].map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 bg-modina-bg-alt border border-modina-border px-4 py-2 rounded-full text-sm font-semibold text-modina-muted"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-modina-red" />
                    {badge}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT — Product Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-[12px] overflow-hidden shadow-[var(--shadow-lg)] aspect-[4/5]">
                <img
                  src="/hero.jpg"
                  alt="Premium Modina Automotive Rims"
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                  onError={(e) => {
                    if (!e.currentTarget.src.includes('unsplash.com')) {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1600705722908-bab1e6190b05?q=80&w=2070&auto=format&fit=crop';
                    }
                  }}
                />
                {/* Subtle overlay label */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <p className="text-white text-xs font-bold tracking-widest uppercase opacity-80">ISO 9001:2015 Certified</p>
                </div>
              </div>
              {/* Announcement bar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -right-4 top-12 bg-white border border-modina-border rounded-xl shadow-[var(--shadow-md)] px-5 py-3.5 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-modina-red/10 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-modina-red" />
                </div>
                <div>
                  <p className="text-xs font-bold text-modina-red uppercase tracking-wider">Latest Update</p>
                  <p className="text-sm font-semibold text-modina-heading">New {t('common.download')} Available</p>
                </div>
              </motion.div>
              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              >
                <span className="text-modina-subtle text-[10px] font-bold tracking-[0.3em] uppercase">{t('common.scroll')}</span>
                <div className="w-px h-10 bg-modina-border relative overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 w-full bg-modina-red"
                    animate={{ top: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
                    style={{ height: '100%' }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          2. ABOUT TEASER — Two Column
      ═══════════════════════════════════════════════════ */}
      <section className="section-py bg-modina-bg-alt border-t border-modina-divider">
        <div className="container-premium">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
          >
            <div className="flex flex-col">
              <motion.p
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                className="text-modina-red text-xs font-bold tracking-widest uppercase mb-4"
              >
                — About Modina
              </motion.p>
              <motion.h2
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }}
                className="font-display font-bold text-modina-heading mb-6 tracking-tight leading-tight"
                style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
              >
                Forging the Backbone of <br />
                <span className="text-modina-red">Modern Mobility</span>
              </motion.h2>
              <motion.p
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }}
                className="text-modina-muted leading-relaxed mb-8"
                style={{ fontSize: 'clamp(17px, 1.5vw, 20px)' }}
              >
                {t('home.about_body_1')}
              </motion.p>
              <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
                <Link to="/about" className="inline-flex items-center gap-3 text-modina-heading font-bold text-base underline underline-offset-4 hover:text-modina-red transition-colors duration-200 group">
                  {t('common.our_story')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </motion.div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-14 border-t border-modina-border pt-10">
                {[
                  { target: 20, suffix: '+', label: t('home.stats_years') },
                  { target: 50, suffix: '+', label: t('home.stats_clients') },
                  { target: 15, suffix: '', label: t('home.stats_products') }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                    className="flex flex-col gap-1.5"
                  >
                    <span className="font-display font-bold text-modina-red" style={{ fontSize: 'clamp(32px, 3vw, 48px)' }}>
                      <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                    </span>
                    <span className="text-modina-muted text-sm font-semibold uppercase tracking-wider">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Video card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative h-[450px] lg:h-[580px] rounded-[12px] overflow-hidden shadow-[var(--shadow-lg)] border border-modina-border"
            >
              <video
                src={facilityVideo}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="absolute bottom-6 left-6 right-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-modina-red rounded-lg flex items-center justify-center shrink-0">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-display font-bold text-sm">{t('about.video_title')}</h4>
                    <p className="text-white/70 text-xs mt-0.5">ISO 9001:2015 Certified</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          3. PRODUCT CATEGORIES GRID
      ═══════════════════════════════════════════════════ */}
      <section className="section-py bg-white border-t border-modina-divider">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="container-premium"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <motion.p
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                className="text-modina-red text-xs font-bold tracking-widest uppercase mb-3"
              >
                — Products
              </motion.p>
              <motion.h2
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                className="font-display font-bold text-modina-heading mb-3 tracking-tight"
                style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
              >
                Engineered for <span className="text-modina-red">Performance</span>
              </motion.h2>
              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                className="text-modina-muted text-lg leading-relaxed"
              >
                {t('home.about_body_2')}
              </motion.p>
            </div>
            <motion.div variants={{ hidden: { opacity: 0, x: 16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}>
              <Link to="/products" className="inline-flex items-center gap-3 text-modina-muted font-semibold text-sm hover:text-modina-red transition-colors duration-200 group">
                Full Range
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:h-[560px]">
            {[
              { title: 'Motorcycle', subtitle: 'Category 01', desc: 'Stands, Guards, Handlebars', img: premiumRimsImg, className: 'md:col-span-2 md:row-span-2 min-h-[300px] md:min-h-0', titleSize: 'text-2xl lg:text-3xl', path: '/products?category=Motorcycle' },
              { title: 'Premium Rims', subtitle: 'Category 02', desc: 'Easy Bike, Mishuk, CNG', img: cngRimImg, className: 'md:col-span-1 min-h-[200px] md:min-h-0', titleSize: 'text-lg', path: '/products?category=Rims' },
              { title: 'Bicycle & Rickshaw', subtitle: 'Category 03', desc: 'Avon, Gazi, Jumbo', img: bicycleRickshawImg, className: 'md:col-span-1 min-h-[200px] md:min-h-0', titleSize: 'text-lg', path: '/products?category=Rims' },
              { title: 'Hardware', subtitle: 'Category 04', desc: 'Bearings, Spokes, Washers', img: wasarImg, className: 'md:col-span-2 min-h-[200px] md:min-h-0', titleSize: 'text-xl', path: '/products?category=Hardware' }
            ].map((category, idx) => (
              <Link
                to={category.path}
                key={idx}
              >
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } } }}
                  className={`group relative bg-modina-bg-section cursor-pointer overflow-hidden rounded-[12px] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 ease-in-out hover:-translate-y-1 h-full ${category.className}`}
                >
                  <img
                    src={category.img}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-in-out"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                  <span className="absolute top-4 right-4 text-white/40 font-display text-xl font-light group-hover:text-white/60 transition-colors duration-300">
                    0{idx + 1}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                    <p className="text-modina-red text-[10px] font-bold tracking-[0.3em] uppercase mb-1">{category.subtitle}</p>
                    <h3 className={`${category.titleSize} font-display font-bold text-white mb-2 tracking-tight`}>{category.title}</h3>
                    <div className="w-8 h-0.5 bg-white/30 mb-3 group-hover:w-14 group-hover:bg-modina-red transition-all duration-300 ease-in-out" />
                    <p className="text-white/70 text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">{category.desc}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-10 lg:hidden">
            <Link to="/products" className="btn-secondary gap-3">
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════
          4. QUALITY ASSURANCE CARDS
      ═══════════════════════════════════════════════════ */}
      <section className="section-py bg-modina-bg-section border-t border-modina-divider">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="container-premium"
        >
          <div className="text-center max-w-2xl mx-auto mb-14">
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="text-modina-red text-xs font-bold tracking-widest uppercase mb-4"
            >
              — Quality &amp; Trust
            </motion.p>
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } } }}
              className="font-display font-bold text-modina-heading mb-4 tracking-tight"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
            >
              The <span className="text-modina-red">Trust</span> Factor
            </motion.h2>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              className="text-modina-muted text-lg leading-relaxed"
            >
              {t('home.features_quality_desc')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: t('home.features_quality'), desc: t('home.features_quality_desc') },
              { icon: Settings, title: t('home.features_scale'), desc: t('home.features_scale_desc') },
              { icon: Award, title: t('home.features_support'), desc: t('home.features_support_desc') }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } } }}
                className="card-premium p-8 flex flex-col group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-modina-red/10 flex items-center justify-center group-hover:bg-modina-red group-hover:scale-105 transition-all duration-300 ease-in-out">
                    <feature.icon className="w-6 h-6 text-modina-red group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-modina-divider font-display text-4xl font-bold select-none">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="text-xl font-display font-bold text-modina-heading mb-3 group-hover:text-modina-red transition-colors duration-300">{feature.title}</h3>
                <p className="text-modina-muted text-base leading-relaxed flex-grow">{feature.desc}</p>
                <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                  <ArrowRight className="w-4 h-4 text-modina-red" />
                  <span className="text-modina-red text-sm font-bold">Learn More</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════
          5. DOWNLOAD CENTER
      ═══════════════════════════════════════════════════ */}
      <section className="section-py bg-white border-t border-modina-divider">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="container-premium"
        >
          <div className="bg-modina-bg-section border border-modina-border rounded-2xl px-8 py-12 lg:px-14 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
              {/* Left */}
              <div className="flex flex-col">
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                  className="flex items-center gap-3 mb-5"
                >
                  <div className="w-8 h-0.5 bg-modina-red" />
                  <span className="text-modina-red text-xs font-bold tracking-widest uppercase">{t('footer.resources_label')}</span>
                </motion.div>
                <motion.h2
                  variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
                  className="font-display font-bold text-modina-heading mb-5 tracking-tight leading-tight"
                  style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}
                >
                  Equipping Our <span className="text-modina-red">Partners.</span>
                </motion.h2>
                <motion.p
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                  className="text-modina-muted text-base mb-8 max-w-md leading-relaxed"
                >
                  {t('home.about_body_2')}
                </motion.p>
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                  className="flex flex-wrap items-center gap-5"
                >
                  <button className="btn-secondary gap-3 group">
                    <Download className="w-4 h-4 text-modina-red" />
                    2026 Catalog
                  </button>
                  <Link to="/downloads" className="inline-flex items-center gap-3 text-modina-muted font-bold text-sm underline underline-offset-4 hover:text-modina-red transition-colors duration-200 group">
                    {t('nav.downloads')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </motion.div>
              </div>

              {/* Right — File Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'Alloy Specs', size: '2.4 MB', type: 'PDF' },
                  { name: 'ISO 9001 Cert', size: '1.1 MB', type: 'PDF' },
                  { name: 'CAD Models', size: '18.5 MB', type: 'ZIP' },
                  { name: 'Warranty Terms', size: '0.8 MB', type: 'PDF' }
                ].map((file, idx) => (
                  <motion.div
                    key={idx}
                    variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: idx * 0.08 } } }}
                    className="card-premium p-5 flex items-center gap-4 cursor-pointer group"
                  >
                    <div className="w-11 h-11 rounded-lg bg-modina-red/10 flex items-center justify-center group-hover:bg-modina-red transition-all duration-300 ease-in-out shrink-0">
                      <Download className="w-4 h-4 text-modina-red group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <span className="text-sm font-bold text-modina-heading group-hover:text-modina-red transition-colors duration-200">{file.name}</span>
                      <span className="text-xs text-modina-subtle font-mono mt-0.5">{file.type} · {file.size}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-modina-subtle opacity-0 group-hover:opacity-100 group-hover:text-modina-red transition-all duration-200" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════
          6. TESTIMONIALS
      ═══════════════════════════════════════════════════ */}
      <section className="section-py bg-modina-bg-section border-t border-modina-divider">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="container-premium"
        >
          <div className="text-center mb-14">
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="text-modina-red text-xs font-bold tracking-widest uppercase mb-4"
            >
              — Client Voices
            </motion.p>
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
              className="font-display font-bold text-modina-heading tracking-tight"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
            >
              Global <span className="text-modina-red">Trust</span>
            </motion.h2>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              className="text-modina-muted text-lg mt-4 max-w-xl mx-auto"
            >
              {t('home.testimonials_subtitle')}
            </motion.p>
          </div>

          <div className="w-full max-w-[780px] mx-auto">
            <motion.div
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
              className="bg-white border border-modina-border rounded-2xl px-6 py-12 md:px-12 md:py-14 relative shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 ease-in-out"
            >
              {/* Prev/Next */}
              <button
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-modina-border flex items-center justify-center text-modina-muted hover:text-modina-red hover:border-modina-red transition-all duration-200 ease-in-out z-10"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-modina-border flex items-center justify-center text-modina-muted hover:text-modina-red hover:border-modina-red transition-all duration-200 ease-in-out z-10"
              >
                <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, filter: 'blur(4px)', scale: 0.99 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                  exit={{ opacity: 0, filter: 'blur(4px)', scale: 1.01 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-modina-border">
                      <img
                        src={testimonials[activeTestimonial].image}
                        alt={testimonials[activeTestimonial].author}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-modina-red flex items-center justify-center border-2 border-white">
                      <Quote className="w-3 h-3 text-white fill-white" />
                    </div>
                  </div>
                  <p className="text-modina-muted text-lg leading-relaxed max-w-xl px-4 mb-6">
                    "{testimonials[activeTestimonial].quote}"
                  </p>
                  <h4 className="font-display font-bold text-modina-heading text-base">{testimonials[activeTestimonial].author}</h4>
                  <p className="text-modina-red text-xs font-bold tracking-widest uppercase mt-1">{testimonials[activeTestimonial].company}</p>
                </motion.div>
              </AnimatePresence>

              {/* Dots */}
              <div className="flex items-center justify-center gap-2 mt-10">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ease-in-out ${idx === activeTestimonial ? 'w-8 bg-modina-red' : 'w-2 bg-modina-border hover:bg-modina-subtle'}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════
          7. PRE-FOOTER CTA
      ═══════════════════════════════════════════════════ */}
      <section className="section-py bg-modina-heading border-t border-modina-divider">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="container-premium text-center"
        >
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="text-modina-red text-xs font-bold tracking-widest uppercase mb-5"
            >
              — Get Started
            </motion.p>
            <motion.h2
              variants={{ hidden: { opacity: 0, scale: 0.95, y: 24 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } } }}
              className="font-display font-bold text-white mb-6 tracking-tight leading-tight"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
            >
              Partner with <br />
              <span className="text-modina-red">Modina Rim &amp; Parts</span>
            </motion.h2>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
              className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl"
            >
              {t('home.cta_body')}
            </motion.p>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
              <Link
                to="/contact"
                className="btn-primary gap-3 text-base group"
              >
                {t('home.request_quote')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
