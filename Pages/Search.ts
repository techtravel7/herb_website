import React, { useState, useEffect } from "react";
import { Herb } from "@/entities/Herb";
import { Search, Filter, SortAsc, SortDesc, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

import HerbCard from "../components/HerbCard";
import HerbListItem from "../components/HerbListItem";
import AdvancedFilters from "../components/AdvancedFilters";

export default function SearchPage() {
  const [herbs, setHerbs] = useState([]);
  const [filteredHerbs, setFilteredHerbs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("common_name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [viewMode, setViewMode] = useState("grid");
  const [filters, setFilters] = useState({
    family: "",
    nativeRegion: "",
    conservationStatus: "",
    discipline: ""
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHerbs();
  }, []);

  useEffect(() => {
    filterAndSortHerbs();
  }, [searchTerm, sortBy, sortOrder, filters, herbs]);

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

  const filterAndSortHerbs = () => {
    let filtered = herbs;

    // Text search
    if (searchTerm) {
      filtered = filtered.filter(herb =>
        herb.common_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        herb.scientific_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        herb.family?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        herb.native_region?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (filters.family) {
      filtered = filtered.filter(herb => herb.family === filters.family);
    }
    if (filters.nativeRegion) {
      filtered = filtered.filter(herb => herb.native_region?.includes(filters.nativeRegion));
    }
    if (filters.conservationStatus) {
      filtered = filtered.filter(herb => herb.conservation_status === filters.conservationStatus);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortBy] || "";
      let bValue = b[sortBy] || "";
      
      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredHerbs(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({
      family: "",
      nativeRegion: "",
      conservationStatus: "",
      discipline: ""
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading search interface...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Advanced search across all botanical disciplines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg border-emerald-200 focus:border-emerald-400"
            />
          </div>
          
          {/* Sort Controls */}
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="common_name">Common Name</SelectItem>
                <SelectItem value="scientific_name">Scientific Name</SelectItem>
                <SelectItem value="family">Family</SelectItem>
                <SelectItem value="native_region">Native Region</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="px-3"
            >
              {sortOrder === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            </Button>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex gap-1 bg-emerald-50 rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="px-3"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="px-3"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      <AdvancedFilters
        herbs={herbs}
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={clearFilters}
      />

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-slate-600">
          <span className="font-semibold text-emerald-700">{filteredHerbs.length}</span> herbs found
        </p>
        
        {(searchTerm || Object.values(filters).some(f => f)) && (
          <Button
            variant="outline"
            onClick={clearFilters}
            className="text-emerald-700 border-emerald-200 hover:bg-emerald-50"
          >
            Clear All Filters
          </Button>
        )}
      </div>

      {/* Results */}
      <div className="min-h-[400px]">
        {filteredHerbs.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHerbs.map((herb, index) => (
                <HerbCard key={herb.id} herb={herb} index={index} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredHerbs.map((herb, index) => (
                <HerbListItem key={herb.id} herb={herb} index={index} />
              ))}
            </div>
          )
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No results found</h3>
            <p className="text-slate-600">Try adjusting your search terms or filters</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}