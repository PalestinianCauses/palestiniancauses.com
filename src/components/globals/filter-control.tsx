"use client";

// REVIEWED

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { startTransition, useCallback, useEffect, useState } from "react";

import { useDebounce } from "@/hooks/use-debounce";

import { Input } from "../ui/input";
import { Label } from "../ui/label";

// Defining a structure for configuring a single filter control
export type FilterConfig =
  | {
      type: "search";
      param: string;
      label: string;
      placeholder?: string;
    }
  | {
      type: "select";
      param: string;
      label: string;
      options: { label: string; value: string }[];
      placeholder?: string;
    };

export type TFilterControls = {
  filterConfigs: FilterConfig[];
  debounceTime?: number;
};

export const FilterControls = function FilterControls({
  filterConfigs,
  debounceTime = 400,
}: TFilterControls) {
  const router = useRouter();
  const pathname = usePathname();
  const paramsSearch = useSearchParams(); // Read-only current URL params

  // State Management
  const filterStateInitial = filterConfigs.reduce(
    (accumulator, filter) => {
      accumulator[filter.param] = paramsSearch.get(filter.param) || "";
      return accumulator;
    },
    {} as Record<string, string>,
  );

  const [filterState, setFilterState] = useState(filterStateInitial);

  const filterSearch = filterConfigs.find((filter) => filter.type === "search");

  const filterDebounceSearch = useDebounce(
    filterSearch ? filterState[filterSearch.param] : "",
    debounceTime,
  );

  // URL Update Logic
  const updateURLParams = useCallback(() => {
    // Creating a new URLSearchParams object based on current state
    const newParams = new URLSearchParams();

    filterConfigs.forEach((filter) => {
      let value = filterState[filter.param];

      // Using debounce value for filters with search type
      if (filter.type === "search") value = filterDebounceSearch;

      // Setting parameter is it has a non-empty value
      if (value) newParams.set(filter.param, value);
    });

    newParams.set("page", "1"); // Setting page to 1 when filters change
    newParams.sort(); // Sorting parameters for consistent URL and string comparison

    // Getting current URL params string (sorted for comparison)
    const currentParams = new URLSearchParams(
      Array.from(paramsSearch.entries()),
    );

    const newStringSearch = newParams.toString();
    const currentStringSearch = currentParams.toString();

    // Updating URL only if params have actually changed
    if (currentStringSearch !== newStringSearch) {
      const query = newStringSearch ? ["?", newStringSearch].join("") : "";

      startTransition(() => {
        router.push([pathname, query].join(""));
      });
    }
  }, [
    filterConfigs,
    router,
    pathname,
    paramsSearch,
    filterState,
    filterDebounceSearch,
  ]);

  useEffect(() => {
    updateURLParams();
  }, [updateURLParams]);

  const handleChange = function handleChange(param: string, value: string) {
    setFilterState((previousState) => ({ ...previousState, [param]: value }));
  };

  return (
    <div>
      {filterConfigs.map((filter) => (
        <div key={filter.param}>
          <Label htmlFor={filter.param}>{filter.label}</Label>
          {filter.type === "search" ? (
            <Input
              id={filter.param}
              type="text"
              placeholder={filter.placeholder || ""}
              value={filterState[filter.param]}
              onChange={(event) =>
                handleChange(filter.param, event.target.value)
              }
            />
          ) : null}
        </div>
      ))}
    </div>
  );
};
