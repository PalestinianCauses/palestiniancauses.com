"use client";

// REVIEWED

import { Search, X } from "lucide-react";
import { HTMLAttributes, useEffect, useMemo, useState } from "react";

import { isObject } from "@/lib/types/guards";
import { cn } from "@/lib/utils/styles";
import { Room } from "@/payload-types";

import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ServiceFiltersProps {
  services: NonNullable<NonNullable<Room["services"]>["list"]>;
  onFilterChange: (
    // eslint-disable-next-line no-unused-vars
    filtered: NonNullable<NonNullable<Room["services"]>["list"]>,
  ) => void;
}

export const ServiceFilters = function ServiceFilters({
  services,
  onFilterChange,
  className,
}: ServiceFiltersProps & HTMLAttributes<HTMLDivElement>) {
  const [querySearch, setQuerySearch] = useState("");
  const [categorySelected, setCategorySelected] = useState<string>("all");

  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    services.forEach((service) => {
      if (isObject(service)) {
        const categoryName = isObject(service.category)
          ? service.category.name
          : "No Specified Category";
        categorySet.add(categoryName);
      }
    });

    return Array.from(categorySet).sort();
  }, [services]);

  const servicesFiltered = useMemo(
    () =>
      services.filter((service) => {
        if (!isObject(service)) return false;

        const matchesSearch =
          querySearch === "" ||
          service.name.toLowerCase().includes(querySearch.toLowerCase()) ||
          service.description
            ?.toLowerCase()
            .includes(querySearch.toLowerCase());

        const categoryName = isObject(service.category)
          ? service.category.name
          : "No Specified Category";

        const matchesCategory =
          categorySelected === "all" || categoryName === categorySelected;

        return matchesSearch && matchesCategory;
      }),
    [services, querySearch, categorySelected],
  );

  useEffect(() => {
    onFilterChange(servicesFiltered);
  }, [servicesFiltered, onFilterChange]);

  return (
    <div
      className={cn(
        "flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-center",
        className,
      )}>
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 stroke-[1.5] text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search services..."
          value={querySearch}
          onChange={(e) => setQuerySearch(e.target.value)}
          className="appearance-none px-10"
        />
        {querySearch && (
          <button
            type="button"
            onClick={() => setQuerySearch("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 stroke-[1.5] text-muted-foreground transition-all duration-100 ease-in-out hover:text-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </button>
        )}
      </div>
      <Select value={categorySelected} onValueChange={setCategorySelected}>
        <SelectTrigger className="w-full sm:w-[12.5rem]">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
