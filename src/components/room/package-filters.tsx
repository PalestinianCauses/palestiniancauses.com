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

interface PackageFiltersProps {
  packages: NonNullable<NonNullable<Room["packages"]>["list"]>;
  onFilterChange: (
    // eslint-disable-next-line no-unused-vars
    filtered: NonNullable<NonNullable<Room["packages"]>["list"]>,
  ) => void;
}

export const PackageFilters = function PackageFilters({
  packages,
  onFilterChange,
  className,
}: PackageFiltersProps & HTMLAttributes<HTMLDivElement>) {
  const [querySearch, setQuerySearch] = useState("");
  const [bySort, setBySort] = useState<string>("featured");

  const packagesSortPlusFilter = useMemo(() => {
    let filtered = packages.filter((packageElement) => {
      if (!isObject(packageElement)) return false;

      const matchesSearch =
        querySearch === "" ||
        packageElement.name.toLowerCase().includes(querySearch.toLowerCase()) ||
        packageElement.description
          .toLowerCase()
          .includes(querySearch.toLowerCase());

      return matchesSearch;
    });

    filtered = [...filtered].sort((a, b) => {
      if (!isObject(a) || !isObject(b)) return 0;

      if (bySort === "featured") {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.order - a.order;
      }

      if (bySort === "price-low") {
        const priceA = a.price || 0;
        const priceB = b.price || 0;
        return priceA - priceB;
      }

      if (bySort === "price-high") {
        const priceA = a.price || 0;
        const priceB = b.price || 0;
        return priceB - priceA;
      }

      return b.order - a.order;
    });

    return filtered;
  }, [packages, querySearch, bySort]);

  useEffect(() => {
    onFilterChange(packagesSortPlusFilter);
  }, [packagesSortPlusFilter, onFilterChange]);

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
          placeholder="Search packages..."
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
      <Select value={bySort} onValueChange={setBySort}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="featured">Featured First</SelectItem>
          <SelectItem value="price-low">Price: Low to High</SelectItem>
          <SelectItem value="price-high">Price: High to Low</SelectItem>
          <SelectItem value="order">Default Order</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
