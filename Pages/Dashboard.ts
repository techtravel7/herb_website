import React, { useState, useEffect } from "react";
import { Herb } from "@/entities/Herb";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Search, Filter, Leaf, BookOpen, Microscope, Dna, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

import HerbCard from "../components/HerbCard";
import SearchFilters from "../components/SearchFilters";
import StatsOverview from "../components/StatsOverview";

export default function Dashboard() {
  const [herbs, setHerbs] = useState([]);
  const [filteredHerbs, setFilteredHerbs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFamily, setSelectedFamily] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHerbs();
  }, []);

  useEffect(() => {
    filterHerbs();
  }, [searchTerm, selectedFamily, herbs]);

  const loadHerbs = async () => {
    try {
      const data = await Herb.list();
      setHerbs(data);
      setFilteredHerbs(data);
    } catch (error) {
      console.error("Error loading herbs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterHerbs = () => {
    let filtered = herbs;

    if (searchTerm) {
      filtered = filtered.filter(herb =>
        herb.common_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        herb.scientific_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        herb.family?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedFamily) {
      filtered = filtered.filter(herb => herb.family === selectedFamily);
    }

    setFilteredHerbs(filtered);
  };

  const families = [...new Set(herbs.map(herb => herb.family).filter(Boolean))];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading botanical database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Botanical Compendium
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Explore our comprehensive database of herbs with detailed scientific information across multiple botanical disciplines
        </p>
      </motion.div>

      {/* Statistics Overview */}
      <StatsOverview herbs={herbs} />

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-6 mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Search herbs by name, scientific name, or family..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg border-emerald-200 focus:border-emerald-400"
            />
          </div>
          
          <SearchFilters
            families={families}
            selectedFamily={selectedFamily}
            onFamilyChange={setSelectedFamily}
          />
        </div>
      </motion.div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-slate-600">
          Showing <span className="font-semibold text-emerald-700">{filteredHerbs.length}</span> of {herbs.length} herbs
        </p>
        
        {(searchTerm || selectedFamily) && (
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setSelectedFamily("");
            }}
            className="text-emerald-700 border-emerald-200 hover:bg-emerald-50"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Herb Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHerbs.map((herb, index) => (
          <HerbCard key={herb.id} herb={herb} index={index} />
        ))}
      </div>

      {/* Empty State */}
      {filteredHerbs.length === 0 && herbs.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No herbs found</h3>
          <p className="text-slate-600">Try adjusting your search terms or filters</p>
        </motion.div>
      )}

      {/* No Data State */}
      {herbs.length === 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
            <Leaf className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No herbs in database</h3>
          <p className="text-slate-600">The botanical database is currently empty</p>
        </motion.div>
      )}
    </div>
  );
}