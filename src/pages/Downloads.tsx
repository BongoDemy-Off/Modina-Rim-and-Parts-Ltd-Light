import React, { useRef, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import { Download, Search, ChevronRight, ChevronLeft, ArrowRight, Minus } from 'lucide-react';

const filesData = [
  { id: 1, name: 'Product Catalog 2026', category: 'Catalogs', description: 'Complete range of all 21 SKUs with specifications and ordering codes.', size: '4.2 MB', format: 'PDF', pages: '48 pages', updated: '2026' },
  { id: 2, name: 'Product Catalog 2025', category: 'Catalogs', description: 'Previous year full product range catalog with legacy part numbers.', size: '3.8 MB', format: 'PDF', pages: '44 pages', updated: '2025' },
  { id: 3, name: 'Motorcycle Parts Catalog', category: 'Catalogs', description: 'Dedicated catalog for all 7 motorcycle component SKUs.', size: '1.9 MB', format: 'PDF', pages: '18 pages', updated: '2026' },
  { id: 4, name: 'Rim & Wheel Catalog', category: 'Catalogs', description: 'Full range of rim products for Easy Bike, Rickshaw, CNG and Van.', size: '2.1 MB', format: 'PDF', pages: '22 pages', updated: '2026' },
  { id: 5, name: 'ISO 9001:2015 Certificate', category: 'Certificates', description: 'Quality Management System certificate (BD99166A) issued by LMS Certification Limited, April 2023.', size: '1.6 MB', format: 'PDF', pages: '1 page', updated: '2023' },
  { id: 6, name: 'ISO 14001:2015 Certificate', category: 'Certificates', description: 'Environmental Management System certificate (BD99166B) issued by LMS Certification Limited, April 2023.', size: '1.6 MB', format: 'PDF', pages: '1 page', updated: '2023' },
  { id: 7, name: 'ISO 45001:2018 Certificate', category: 'Certificates', description: 'Occupational Health & Safety Management System certificate (BD99166C-1) issued by LMS Certification Limited, April 2023.', size: '1.7 MB', format: 'PDF', pages: '1 page', updated: '2023' },
  { id: 8, name: 'Alloy Technical Spec Sheet', category: 'Technical', description: 'Detailed material composition, tensile strength, and hardness data.', size: '2.4 MB', format: 'PDF', pages: '12 pages', updated: '2026' },
  { id: 9, name: 'CNC Tolerance Standards', category: 'Technical', description: 'Machining tolerances and dimensional accuracy guidelines.', size: '1.3 MB', format: 'PDF', pages: '8 pages', updated: '2026' },
  { id: 10, name: 'CAD Model Package', category: 'Technical', description: '3D CAD models for all rim profiles in STEP and IGES formats.', size: '18.5 MB', format: 'ZIP', pages: '21 files', updated: '2025' },
  { id: 11, name: 'Quality Control Manual', category: 'Technical', description: 'Internal QC process documentation and inspection checklists.', size: '3.2 MB', format: 'PDF', pages: '36 pages', updated: '2026' },
  { id: 12, name: 'Warranty Terms & Conditions', category: 'Legal', description: 'Product warranty coverage, claim process, and exclusions.', size: '0.6 MB', format: 'PDF', pages: '6 pages', updated: '2025' },
  { id: 13, name: 'Export Compliance Document', category: 'Legal', description: 'International trade compliance and export regulation summary.', size: '0.9 MB', format: 'PDF', pages: '8 pages', updated: '2025' },
  { id: 14, name: 'Distributor Agreement Template', category: 'Legal', description: 'Standard partnership and distribution agreement framework.', size: '1.2 MB', format: 'PDF', pages: '14 pages', updated: '2026' }
];

const categories = ['All', 'Catalogs', 'Certificates', 'Technical', 'Legal'];

export default function Downloads() {
  const letters = "DOWNLOADS".split("");
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  const featuredRef = useRef(null);
  const featuredInView = useInView(featuredRef, { once: true, margin: '-60px' });

  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' });

  const filteredFiles = useMemo(() => {
    return filesData.filter(file => {
      const matchesCat = activeCategory === 'All' || file.category === activeCategory;
      const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            file.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            file.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(filteredFiles.length / ITEMS_PER_PAGE);
  const paginatedFiles = filteredFiles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleViewAllCatalogs = () => {
    setActiveCategory('Catalogs');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-modina-text pt-[72px]">
      <Helmet>
        <title>Downloads | Modina Rim &amp; Parts Ltd. — Catalogs, Certificates &amp; Technical Docs</title>
        <meta name="description" content="Download product catalogs, ISO certificates, technical specification sheets, CAD models, and legal documents from Modina Rim & Parts Ltd., Jashore, Bangladesh." />
        <meta property="og:title" content="Downloads | Modina Rim &amp; Parts Ltd." />
        <meta property="og:description" content="Free download: 2026 product catalog, ISO 9001/14001/45001 certificates, alloy spec sheets, CNC tolerance standards, and more." />
        <link rel="canonical" href="https://www.modinarim.com/downloads" />
      </Helmet>

      {/* SECTION 1 — HERO */}
      <section className="w-full py-20 lg:py-28 flex flex-col items-center text-center bg-white border-b border-modina-divider">
        <div className="text-xs font-bold tracking-widest text-modina-subtle uppercase flex items-center gap-2 justify-center mb-10">
          <Link to="/" className="hover:text-modina-red transition-colors duration-300">Home</Link>
          <ChevronRight className="w-2.5 h-2.5 text-modina-subtle" />
          <span className="text-modina-muted">Downloads</span>
        </div>

        <div className="w-24 h-[2px] bg-modina-red mx-auto mb-10" />

        <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] font-display font-bold tracking-tight text-modina-heading uppercase leading-none flex items-center justify-center flex-wrap">
          {letters.map((letter, i) => (
            letter === " " ? (
              <span key={i} className="w-[0.3em]">&nbsp;</span>
            ) : (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.055, ease: [0.16, 1, 0.3, 1] }}
              >
                {letter}
              </motion.span>
            )
          ))}
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
          className="w-32 h-[1px] bg-modina-red mx-auto my-10"
        />

        <p className="text-xs font-bold tracking-widest text-modina-muted uppercase flex items-center justify-center flex-wrap gap-2">
          <span>Modina Rim &amp; Parts Ltd.</span>
          <span className="text-modina-red">·</span>
          <span>Resource Center</span>
          <span className="text-modina-red">·</span>
          <span>Est. 2010</span>
        </p>

        <hr className="w-full max-w-md border-modina-divider mx-auto mt-10 mb-10" />

        <div className="flex items-center justify-center gap-0">
          <div className="flex flex-col items-center px-10 md:px-14">
            <span className="text-3xl md:text-4xl font-display font-bold text-modina-red">14</span>
            <span className="text-xs font-bold tracking-widest text-modina-muted uppercase mt-1">Documents</span>
          </div>
          <span className="w-[0.5px] h-8 bg-modina-divider" />
          <div className="flex flex-col items-center px-10 md:px-14">
            <span className="text-3xl md:text-4xl font-display font-bold text-modina-red">Free</span>
            <span className="text-xs font-bold tracking-widest text-modina-muted uppercase mt-1">Downloads</span>
          </div>
          <span className="w-[0.5px] h-8 bg-modina-divider" />
          <div className="flex flex-col items-center px-10 md:px-14">
            <span className="text-3xl md:text-4xl font-display font-bold text-modina-red">PDF</span>
            <span className="text-xs font-bold tracking-widest text-modina-muted uppercase mt-1">Format</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 mt-14">
          <motion.div 
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'top' }}
            className="w-[0.5px] h-10 bg-modina-divider" 
          />
          <span className="text-xs font-bold tracking-widest text-modina-red uppercase">Scroll</span>
        </div>
      </section>

      {/* SECTION 2 — FILTER BAR */}
      <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-md border-b border-modina-divider">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 h-14 flex items-center justify-between overflow-x-auto no-scrollbar">
          <div className="flex items-center h-full">
            {categories.map((cat, idx) => (
              <React.Fragment key={cat}>
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-6 h-14 text-xs font-bold tracking-widest uppercase whitespace-nowrap transition-all duration-300 ease-in-out ${
                    activeCategory === cat ? 'text-modina-heading' : 'text-modina-muted hover:text-modina-heading'
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <motion.div layoutId="activeDownloadCat" className="absolute bottom-0 left-0 w-full h-[2px] bg-modina-red" />
                  )}
                </button>
                {idx < categories.length - 1 && (
                  <span className="w-[0.5px] h-5 bg-modina-divider shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center gap-6 ml-8 shrink-0">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-modina-subtle absolute left-0" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-b border-modina-border focus:border-modina-red outline-none text-xs text-modina-text placeholder:text-modina-subtle w-32 focus:w-48 transition-all duration-300 pl-6 pb-1"
              />
            </div>
            <p className="hidden sm:block text-xs font-bold tracking-widest text-modina-muted whitespace-nowrap">
              — {filteredFiles.length} RESULTS
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3 — FILE GRID */}
      <section className="container mx-auto px-6 md:px-12 lg:px-24 py-16 lg:py-24 min-h-[400px]">
        {filteredFiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {paginatedFiles.map((file) => (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  key={file.id}
                  className="card-premium group cursor-pointer flex items-start gap-6 transition-all duration-300 ease-in-out"
                >
                  <div className="w-14 h-14 bg-modina-bg-alt border border-modina-border rounded-lg flex items-center justify-center shrink-0 group-hover:border-modina-red group-hover:bg-modina-red/5 transition-all duration-300 ease-in-out">
                    <Download className="w-5 h-5 text-modina-subtle group-hover:text-modina-red transition-colors duration-300 ease-in-out" />
                  </div>

                  <div className="flex flex-col gap-2 flex-grow">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-[14px] font-display font-bold text-modina-heading group-hover:text-modina-red transition-colors duration-300 ease-in-out">
                        {file.name}
                      </p>
                      <span className="text-xs font-bold tracking-widest text-modina-muted border border-modina-border px-2 py-0.5 uppercase group-hover:border-modina-red group-hover:text-modina-red transition-all duration-300 ease-in-out shrink-0 rounded-sm">
                        {file.format}
                      </span>
                    </div>
                    <p className="text-[12px] text-modina-muted font-light leading-relaxed line-clamp-2">
                      {file.description}
                    </p>
                    <p className="text-xs font-bold tracking-widest text-modina-subtle uppercase mt-1">
                      {file.size} · {file.pages} · Updated {file.updated}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <Minus className="w-8 h-8 text-modina-subtle mb-6" />
            <p className="text-xs font-bold tracking-widest text-modina-muted uppercase mb-6">
              No results found
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="border border-modina-border text-modina-muted text-xs font-bold tracking-widest uppercase px-6 py-3 hover:border-modina-red hover:text-modina-red transition-all duration-300 ease-in-out rounded-sm"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* PAGINATION CONTROLS */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-between border-t border-modina-divider pt-8">
            <button
              type="button"
              onClick={() => {
                setCurrentPage(p => Math.max(1, p - 1));
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              disabled={currentPage === 1}
              className="text-xs font-bold tracking-widest uppercase text-modina-muted hover:text-modina-red disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 ease-in-out flex items-center gap-3"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Prev
            </button>
            <span className="text-xs font-bold tracking-widest text-modina-muted uppercase">
              Page {currentPage.toString().padStart(2, '0')} / {totalPages.toString().padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={() => {
                setCurrentPage(p => Math.min(totalPages, p + 1));
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              disabled={currentPage === totalPages}
              className="text-xs font-bold tracking-widest uppercase text-modina-muted hover:text-modina-red disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 ease-in-out flex items-center gap-3"
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </section>

      {/* SECTION 4 — FEATURED DOWNLOAD BANNER */}
      <section className="w-full border-t border-modina-divider bg-modina-bg-alt py-20 lg:py-24" ref={featuredRef}>
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={featuredInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="card-premium p-10 lg:p-16 flex flex-col justify-center"
            >
              <p className="text-[120px] font-display font-bold text-modina-divider leading-none select-none">
                2026
              </p>
              <p className="text-xs font-bold tracking-widest text-modina-red uppercase mt-2">
                — Latest Release
              </p>
              <p className="text-xs font-bold tracking-widest text-modina-subtle uppercase mt-1">
                Annual Catalog
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={featuredInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="card-premium p-10 lg:p-16 flex flex-col justify-center"
            >
              <p className="text-xs font-bold tracking-widest text-modina-red uppercase mb-8">
                — Featured Document
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-modina-heading tracking-tight mb-8">
                Product Catalog 2026
              </h2>
              <p className="text-[14px] text-modina-muted font-light leading-relaxed mb-8 max-w-lg">
                Our most comprehensive catalog to date. Covering all 21 SKUs across 4 categories with full technical specifications, material data, and ordering codes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary flex items-center justify-center gap-4">
                  Download Now
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={handleViewAllCatalogs}
                  className="btn-secondary flex items-center justify-center gap-4"
                >
                  View All Catalogs
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — CTA BANNER */}
      <section className="w-full border-t border-modina-divider py-24 lg:py-32 bg-modina-heading" ref={ctaRef}>
        <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <motion.div 
            initial={{ opacity: 0, x: -24 }}
            animate={ctaInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative pl-6"
          >
            <motion.div
              initial={{ scaleY: 0 }}
              animate={ctaInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'top' }}
              className="absolute left-0 top-0 w-1 h-20 bg-modina-red"
            />
            <p className="text-xs font-bold tracking-widest text-modina-red uppercase mb-4">— Need More Info?</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight">
              Can't Find<br />What You Need?
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 24 }}
            animate={ctaInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/contact" className="btn-primary flex items-center gap-4">
              Contact Sales
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link to="/products" className="btn-secondary flex items-center gap-4">
              View Products
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
