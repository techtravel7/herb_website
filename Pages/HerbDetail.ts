
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Herb } from "@/entities/Herb";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Leaf, Globe, Dna, Microscope, BookOpen, FlaskConical, Tractor, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function HerbDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [herb, setHerb] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  useEffect(() => {
    if (id) {
      loadHerb();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const loadHerb = async () => {
    setIsLoading(true);
    try {
      const results = await Herb.filter({ id: id });
      if (results.length > 0) {
        setHerb(results[0]);
      } else {
        setHerb(null);
      }
    } catch (error) {
      console.error("Error loading herb:", error);
      setHerb(null);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading herb details...</p>
        </div>
      </div>
    );
  }

  if (!herb) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Herb not found</h2>
          <Button onClick={() => navigate(-1)} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const disciplineData = [
    {
      id: "anatomy",
      title: "Plant Anatomy",
      icon: Microscope,
      color: "bg-blue-500",
      data: herb.plant_anatomy
    },
    {
      id: "physiology",
      title: "Plant Physiology",
      icon: FlaskConical,
      color: "bg-green-500",
      data: herb.plant_physiology
    },
    {
      id: "genetics",
      title: "Plant Genetics",
      icon: Dna,
      color: "bg-purple-500",
      data: herb.plant_genetics
    },
    {
      id: "ecology",
      title: "Plant Ecology",
      icon: Globe,
      color: "bg-emerald-500",
      data: herb.plant_ecology
    },
    {
      id: "systematics",
      title: "Plant Systematics",
      icon: BookOpen,
      color: "bg-orange-500",
      data: herb.plant_systematics
    },
    {
      id: "morphology",
      title: "Plant Morphology",
      icon: Leaf,
      color: "bg-teal-500",
      data: herb.plant_morphology
    },
    {
      id: "ethnobotany",
      title: "Ethnobotany",
      icon: Users,
      color: "bg-rose-500",
      data: herb.ethnobotany
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Button
          variant="outline"
          onClick={() => navigate(createPageUrl("Dashboard"))}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Database
        </Button>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{herb.common_name}</h1>
              <p className="text-xl text-slate-600 italic mb-4">{herb.scientific_name}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge className="bg-emerald-100 text-emerald-800">{herb.family}</Badge>
                {herb.native_region && (
                  <Badge variant="outline">{herb.native_region}</Badge>
                )}
                {herb.conservation_status && (
                  <Badge variant="outline">{herb.conservation_status}</Badge>
                )}
              </div>
              
              {herb.medicinal_properties && (
                <div className="mb-4">
                  <h3 className="font-semibold text-slate-900 mb-2">Medicinal Properties</h3>
                  <p className="text-slate-600">{herb.medicinal_properties}</p>
                </div>
              )}
            </div>
            
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Leaf className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Botanical Disciplines */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="anatomy" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 mb-8">
            {disciplineData.map((discipline) => (
              <TabsTrigger
                key={discipline.id}
                value={discipline.id}
                className="flex flex-col items-center gap-1 py-3"
              >
                <discipline.icon className="w-4 h-4" />
                <span className="text-xs">{discipline.title.split(' ')[1] || discipline.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {disciplineData.map((discipline) => (
            <TabsContent key={discipline.id} value={discipline.id}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${discipline.color}`}>
                      <discipline.icon className="w-5 h-5 text-white" />
                    </div>
                    {discipline.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {discipline.data ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(discipline.data).map(([key, value]) => (
                        <div key={key} className="space-y-2">
                          <h4 className="font-semibold text-slate-900 capitalize">
                            {key.replace(/_/g, ' ')}
                          </h4>
                          <p className="text-slate-600">{value || 'No data available'}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500">No data available for this discipline</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>

      {/* Additional Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8"
      >
        {/* Paleobotany */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-amber-500">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              Paleobotany
            </CardTitle>
          </CardHeader>
          <CardContent>
            {herb.paleobotany ? (
              <div className="space-y-3">
                {Object.entries(herb.paleobotany).map(([key, value]) => (
                  <div key={key}>
                    <h5 className="font-medium text-slate-900 capitalize text-sm">
                      {key.replace(/_/g, ' ')}
                    </h5>
                    <p className="text-slate-600 text-sm">{value || 'No data available'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">No paleobotanical data available</p>
            )}
          </CardContent>
        </Card>

        {/* Phytochemistry */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-pink-500">
                <FlaskConical className="w-5 h-5 text-white" />
              </div>
              Phytochemistry
            </CardTitle>
          </CardHeader>
          <CardContent>
            {herb.phytochemistry ? (
              <div className="space-y-3">
                {Object.entries(herb.phytochemistry).map(([key, value]) => (
                  <div key={key}>
                    <h5 className="font-medium text-slate-900 capitalize text-sm">
                      {key.replace(/_/g, ' ')}
                    </h5>
                    <p className="text-slate-600 text-sm">{value || 'No data available'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">No phytochemical data available</p>
            )}
          </CardContent>
        </Card>

        {/* Molecular Biology */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-indigo-500">
                <Dna className="w-5 h-5 text-white" />
              </div>
              Molecular Biology
            </CardTitle>
          </CardHeader>
          <CardContent>
            {herb.molecular_biology ? (
              <div className="space-y-3">
                {Object.entries(herb.molecular_biology).map(([key, value]) => (
                  <div key={key}>
                    <h5 className="font-medium text-slate-900 capitalize text-sm">
                      {key.replace(/_/g, ' ')}
                    </h5>
                    <p className="text-slate-600 text-sm">{value || 'No data available'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">No molecular biology data available</p>
            )}
          </CardContent>
        </Card>
        
        {/* Plant Agriculture */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-lime-600">
                <Tractor className="w-5 h-5 text-white" />
              </div>
              Plant Agriculture
            </CardTitle>
          </CardHeader>
          <CardContent>
            {herb.plant_agriculture ? (
              <div className="space-y-3">
                {Object.entries(herb.plant_agriculture).map(([key, value]) => (
                  <div key={key}>
                    <h5 className="font-medium text-slate-900 capitalize text-sm">
                      {key.replace(/_/g, ' ').replace('and', '&')}
                    </h5>
                    <p className="text-slate-600 text-sm">{value || 'No data available'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">No agricultural data available</p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
