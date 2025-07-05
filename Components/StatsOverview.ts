import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Globe, Dna, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function StatsOverview({ herbs }) {
  const stats = [
    {
      title: "Total Herbs",
      value: herbs.length,
      icon: Leaf,
      color: "bg-emerald-500",
      description: "Botanical specimens"
    },
    {
      title: "Plant Families",
      value: new Set(herbs.map(herb => herb.family).filter(Boolean)).size,
      icon: Dna,
      color: "bg-blue-500",
      description: "Taxonomic families"
    },
    {
      title: "Native Regions",
      value: new Set(herbs.map(herb => herb.native_region).filter(Boolean)).size,
      icon: Globe,
      color: "bg-purple-500",
      description: "Geographic origins"
    },
    {
      title: "Conservation Status",
      value: herbs.filter(herb => herb.conservation_status).length,
      icon: Shield,
      color: "bg-orange-500",
      description: "Documented status"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-emerald-100 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </CardTitle>
                  <p className="text-sm font-medium text-slate-600">
                    {stat.title}
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${stat.color} shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-slate-500">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}