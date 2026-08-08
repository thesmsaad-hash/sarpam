import React, { useState, useEffect } from 'react';
import { Search, Rss, Layers, ChevronDown, Menu, X, Database, Sparkles } from 'lucide-react';
import { ViewState, BlogCategory } from '../types/blog';
import { SarpamEmblem } from './SarpamEmblem';
import { isSupabaseConfigured } from '../lib/supabase';

interface Props {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onOpenSearch: () => void;
  onOpenRss: () => void;
  onOpenSupabaseModal: () => void;
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CATEGORIES: BlogCategory[] = [
  'LLMs',
  'AI Agents',
  'Open Source',
  'Robotics',
  'Research Papers',
  'Computer Vision',
  'Generative AI',
  'Startups',
  'Tutorials'
];

export const Navbar: React.FC<Props> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  onOpenRss,
  onOpenSupabaseModal,
  selectedCategory,
  onSelectCategory,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#09090B]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Emblem */}
          <div
            onClick={() => {
              onSelectCategory(null);
              onNavigate('home');
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative">
              <SarpamEmblem className="w-9 h-9 text-[#0F766E] group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-[#0F766E]/20 blur-md rounded-full -z-10 group-hover:bg-[#0F766E]/40 transition-colors" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-2xl tracking-wider text-[#F8FAFC] group-hover:text-[#5EEAD4] transition-colors">
                  SARPAM
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase tracking-widest bg-[#0F766E]/20 text-[#5EEAD4] border border-[#0F766E]/40">
                  AI Publication
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#A1A1AA] font-mono leading-none hidden sm:block">
                Autonomous Research. Modern Intelligence.
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border border-white/8">
            <button
              onClick={() => {
                onSelectCategory(null);
                onNavigate('home');
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                currentView === 'home' && !selectedCategory
                  ? 'bg-[#0F766E] text-white shadow-emerald-glow'
                  : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => {
                onSelectCategory(null);
                onNavigate('articles');
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                currentView === 'articles' && !selectedCategory
                  ? 'bg-[#0F766E] text-white shadow-emerald-glow'
                  : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
              }`}
            >
              Research Archive
            </button>

            {/* Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  selectedCategory || currentView === 'categories'
                    ? 'bg-[#0F766E] text-white shadow-emerald-glow'
                    : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{selectedCategory || 'Categories'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoryDropdownOpen && (
                <div
                  onMouseLeave={() => setIsCategoryDropdownOpen(false)}
                  className="absolute top-full left-0 mt-2 w-64 glass-panel rounded-2xl border border-white/10 p-3 shadow-2xl z-50 animate-fade-in"
                >
                  <div className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider px-3 py-1 mb-1 border-b border-white/5">
                    Filter by Subject
                  </div>
                  <div className="grid grid-cols-1 gap-0.5">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          onSelectCategory(cat);
                          onNavigate('articles');
                          setIsCategoryDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                          selectedCategory === cat
                            ? 'bg-[#0F766E]/30 text-[#5EEAD4] font-semibold'
                            : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span>{cat}</span>
                        {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-[#5EEAD4]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                onSelectCategory(null);
                onNavigate('about');
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                currentView === 'about'
                  ? 'bg-[#0F766E] text-white shadow-emerald-glow'
                  : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
              }`}
            >
              About
            </button>
          </nav>

          {/* Action Buttons: Search, RSS, Admin CMS, Supabase Badge */}
          <div className="flex items-center gap-2">
            {/* Instant Search Launch Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111113] border border-white/10 hover:border-[#0F766E]/50 text-[#A1A1AA] hover:text-white transition-all text-xs font-mono group"
            >
              <Search className="w-3.5 h-3.5 text-[#0F766E] group-hover:text-[#5EEAD4] transition-colors" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] rounded bg-white/5 border border-white/10 text-white/60">
                ⌘K
              </kbd>
            </button>

            {/* RSS Feed Button */}
            <button
              onClick={onOpenRss}
              title="View RSS 2.0 Feed"
              className="p-2 rounded-full bg-[#111113] border border-white/10 hover:border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all"
            >
              <Rss className="w-4 h-4" />
            </button>

            {/* Admin Portal Quick Access Button */}
            <button
              onClick={() => onNavigate('admin')}
              title="Open Sarpam Editorial Portal"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0F766E]/20 border border-[#0F766E]/40 text-[#5EEAD4] hover:bg-[#0F766E]/30 transition-all text-xs font-mono font-semibold shadow-emerald-glow"
            >
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>Admin Portal</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-white/5 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 px-4 py-6 mt-3 space-y-4 animate-fade-in">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onSelectCategory(null);
                onNavigate('home');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl bg-white/5 text-left text-sm font-medium text-white"
            >
              Home
            </button>
            <button
              onClick={() => {
                onSelectCategory(null);
                onNavigate('articles');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl bg-white/5 text-left text-sm font-medium text-white"
            >
              Archive
            </button>
            <button
              onClick={() => {
                onNavigate('categories');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl bg-white/5 text-left text-sm font-medium text-white"
            >
              Categories
            </button>
            <button
              onClick={() => {
                onNavigate('about');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl bg-white/5 text-left text-sm font-medium text-white"
            >
              About
            </button>
            <button
              onClick={() => {
                onNavigate('admin');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl bg-[#0F766E]/30 border border-[#0F766E]/50 text-left text-sm font-semibold text-[#5EEAD4] col-span-2 flex items-center justify-between"
            >
              <span>Admin Portal (/admin)</span>
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            </button>
          </div>

          <div className="pt-4 border-t border-white/10">
            <p className="text-xs uppercase font-mono text-[#A1A1AA] mb-2">Subject Categories</p>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    onSelectCategory(cat);
                    onNavigate('articles');
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-[#0F766E]/30 text-xs text-[#A1A1AA] hover:text-[#5EEAD4] border border-white/5"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
