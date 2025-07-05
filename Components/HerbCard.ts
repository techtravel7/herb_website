import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Globe, Dna, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function HerbCard({ herb, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Link to={createPageUrl(`HerbDetail?id=${herb.id}`)}>
        <Card className="h-full hover:shadow-xl transition-all duration-300 group-hover:scale-105 border-emerald-100 hover:border-emerald-200 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {herb.common_name}
                </CardTitle>
                <p className="text-sm text-slate-600 italic mt-1">
                  {herb.scientific_name}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
                <Leaf className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-emerald-100 text-emerald-800 text-xs">
                  {herb.family}
                </Badge>
                {herb.native_region && (
                  <Badge variant="outline" className="text-xs">
                    <Globe className="w-3 h-3 mr-1" />
                    {herb.native_region}
                  </Badge>
                )}
              </div>
              
              {herb.medicinal_properties && (
                <p className="text-sm text-slate-600 line-clamp-3">
                  {herb.medicinal_properties}
                </p>
              )}
              
              {herb.conservation_status && (
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    herb.conservation_status.toLowerCase().includes('endangered') 
                      ? 'border-red-300 text-red-700'
                      : 'border-green-300 text-green-700'
                  }`}
                >
                  {herb.conservation_status}
                </Badge>
              )}
              
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Dna className="w-4 h-4 text-slate-400" />
                    <span className="text-xs text-slate-500">
                      {herb.plant_genetics?.chromosome_count || 'N/A'}
                    </span>
                  </div>
                </div>
                
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}