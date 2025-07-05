import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SearchFilters({ families, selectedFamily, onFamilyChange }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-slate-500" />
        <Select value={selectedFamily} onValueChange={onFamilyChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by family" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={null}>All Families</SelectItem>
            {families.map((family) => (
              <SelectItem key={family} value={family}>
                {family}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {selectedFamily && (
        <Badge variant="secondary" className="flex items-center gap-1">
          {selectedFamily}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFamilyChange("")}
            className="h-4 w-4 p-0 hover:bg-transparent"
          >
            <X className="w-3 h-3" />
          </Button>
        </Badge>
      )}
    </div>
  );
}