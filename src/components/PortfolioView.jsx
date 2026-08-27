import React from 'react';

export default function PortfolioView({ onTrap }) {
  // Using onClickCapture so ANY click inside this component triggers the trap immediately.
  return (
    <div
      onClickCapture={onTrap}
      className="min-h-screen w-full bg-ink text-gray-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden cursor-pointer"
    >
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-ink/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tighter text-white">
            Dev<span className="text-indigo-500">.</span>Portfolio
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-400">
            <span className="hover:text-white transition-colors cursor-pointer">About</span>
            <span className="hover:text-white transition-colors cursor-pointer">Projects</span>
            <span className="hover:text-white transition-colors cursor-pointer">Experience</span>
            <span className="hover:text-white transition-colors cursor-pointer">Contact</span>
          </div>
          <button className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-all cursor-pointer">
            Hire Me
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span>Available for new opportunities</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Crafting Digital <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            Experiences
          </span>
        </h1>
        
        <p className="max-w-2xl text-lg md:text-xl text-gray-400 mb-10 leading-relaxed">
          I'm a full-stack developer specializing in building exceptional digital experiences. 
          Currently, I'm focused on building accessible, human-centered products.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-8 py-4 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all cursor-pointer shadow-lg shadow-indigo-500/25">
            View My Work
          </button>
          <button className="px-8 py-4 rounded-xl bg-card border border-white/10 text-white font-semibold hover:bg-white/5 transition-all cursor-pointer">
            Download Resume
          </button>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
          <span className="text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer flex items-center gap-1">
            View all 
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Project Card 1 */}
          <div className="group rounded-2xl bg-card border border-white/5 overflow-hidden hover:border-white/10 transition-all cursor-pointer">
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 w-full relative">
              <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="p-6">
              <div className="text-sm text-indigo-400 font-mono mb-2">Next.js • React • Tailwind</div>
              <h3 className="text-xl font-bold text-white mb-2">E-Commerce Platform</h3>
              <p className="text-gray-400 text-sm mb-4">A high-performance modern storefront built with Next.js App Router and Stripe integration.</p>
            </div>
          </div>

          {/* Project Card 2 */}
          <div className="group rounded-2xl bg-card border border-white/5 overflow-hidden hover:border-white/10 transition-all cursor-pointer">
            <div className="aspect-video bg-gradient-to-bl from-gray-800 to-gray-900 w-full relative">
              <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="p-6">
              <div className="text-sm text-cyan-400 font-mono mb-2">TypeScript • Node.js • Redis</div>
              <h3 className="text-xl font-bold text-white mb-2">Real-time Analytics</h3>
              <p className="text-gray-400 text-sm mb-4">Distributed system for processing and visualizing millions of events per second.</p>
            </div>
          </div>

          {/* Project Card 3 */}
          <div className="group rounded-2xl bg-card border border-white/5 overflow-hidden hover:border-white/10 transition-all cursor-pointer">
            <div className="aspect-video bg-gradient-to-t from-gray-800 to-gray-900 w-full relative">
              <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="p-6">
              <div className="text-sm text-emerald-400 font-mono mb-2">React Native • GraphQL</div>
              <h3 className="text-xl font-bold text-white mb-2">Finance Mobile App</h3>
              <p className="text-gray-400 text-sm mb-4">Cross-platform application for tracking personal finances and investment portfolios.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center text-gray-500 text-sm mt-20">
        <p>© {new Date().getFullYear()} Dev Portfolio. All rights reserved.</p>
      </footer>
    </div>
  );
}
