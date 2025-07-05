import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Globe, Dna, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function HerbListItem({ herb, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link to={createPageUrl(`HerbDetail?id=${herb.id}`)}>
        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-emerald-100 hover:border-emerald-200 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 hover:text-emerald-700 transition-colors">
                      {herb.common_name}
                    </h3>
                    <p className="text-sm text-slate-600 italic">
                      {herb.scientific_name}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge className="bg-emerald-100 text-emerald-800 text-xs">
                        {herb.family}
                      </Badge>
                      {herb.native_region && (
                        <Badge variant="outline" className="text-xs">
                          <Globe className="w-3 h-3 mr-1" />
                          {herb.native_region}
                        </Badge>
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
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <Dna className="w-4 h-4" />
                    {herb.plant_genetics?.chromosome_count || 'N/A'}
                  </div>
                </div>
                
                <ExternalLink className="w-5 h-5 text-slate-400 hover:text-emerald-600 transition-colors" />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}