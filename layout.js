import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Leaf, Search, BookOpen, Database } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Botanical Compendium</h1>
                <p className="text-xs text-slate-600">Comprehensive Herb Database</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to={createPageUrl("Dashboard")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === createPageUrl("Dashboard")
                    ? 'bg-emerald-100 text-emerald-800 shadow-sm'
                    : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
              >
                <Database className="w-4 h-4" />
                <span className="font-medium">Database</span>
              </Link>
              
              <Link
                to={createPageUrl("Search")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === createPageUrl("Search")
                    ? 'bg-emerald-100 text-emerald-800 shadow-sm'
                    : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
              >
                <Search className="w-4 h-4" />
                <span className="font-medium">Search</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-sm border-t border-emerald-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-slate-600 text-sm">
              Botanical Compendium © 2024 - Comprehensive Scientific Plant Database
            </p>
            <p className="text-slate-500 text-xs mt-2">
              Covering Plant Anatomy, Physiology, Genetics, Ecology, Systematics, Morphology, Paleobotany, Phytochemistry, Molecular Biology, Environmental Biology, and Microbiology
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}