"use client";

// REVIEWED - 08

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Fragment,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";

import { useDebounce } from "@/hooks/use-debounce";
import { FiltersOptions } from "@/lib/types";
import { filtersOptionsDefaults } from "@/lib/utils/filters";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

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

export const FilterControls = function FilterControls({
  filterConfigs,
  pageDefault = filtersOptionsDefaults.page,
  limitDefault = filtersOptionsDefaults.limit,
  sortDefault = filtersOptionsDefaults.sort,
  debounceTime = 400,
}: {
  filterConfigs: FilterConfig[];
  pageDefault?: number;
  limitDefault?: number;
  sortDefault?: string;
  debounceTime?: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const paramsSearch = useSearchParams(); // Read-only current URL params
  const [isPending, startTransition] = useTransition();

  // State Management
  const [filterState, setFilterState] = useState(() => {
    const state: FiltersOptions & { [key: string]: string | number } = {};

    filterConfigs.forEach((filterConfig) => {
      state[filterConfig.param] = paramsSearch.get(filterConfig.param) || "";
    });

    const page = paramsSearch.get("page");
    state.page =
      page !== null && page !== "" ? parseInt(page, 10) : pageDefault;

    const limit = paramsSearch.get("limit");
    state.limit =
      limit !== null && limit !== "" ? parseInt(limit, 10) : limitDefault;

    const sort = paramsSearch.get("sort");
    state.sort = sort !== null && sort !== "" ? sort : sortDefault;

    return state;
  });

  const filterSearch = filterConfigs.find((filter) => filter.type === "search");

  const filterDebounceSearch = useDebounce(
    filterSearch ? filterState[filterSearch.param] : "",
    debounceTime,
  );

  // URL Update Logic
  const updateURLParams = useCallback(() => {
    // Creating a new URLSearchParams object based on current state
    const newParams = new URLSearchParams();

    filterConfigs.forEach((filterConfig) => {
      let value = filterState[filterConfig.param];

      // Using debounce value for filters with search type
      if (filterConfig.type === "search") value = filterDebounceSearch;

      // Setting parameter is it has a non-empty value
      if (value) newParams.set(filterConfig.param, value.toString());
    });

    // Setting standard parameters (page, limit, sort) from state
    const page = filterState.page || pageDefault;
    if (page && !Number.isNaN(page) && page > 0)
      newParams.set("page", page.toString());

    const limit = filterState.limit || limitDefault;
    if (limit && !Number.isNaN(limit) && limit > 0)
      newParams.set("limit", limit.toString());

    const sort = filterState.sort || sortDefault;
    if (sort) newParams.set("sort", sort);

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
        router.replace([pathname, query].join(""), { scroll: false });
      });
    }
  }, [
    filterConfigs,
    router,
    pathname,
    paramsSearch,
    filterState,
    filterDebounceSearch,
    pageDefault,
    limitDefault,
    sortDefault,
  ]);

  useEffect(() => {
    updateURLParams();
  }, [updateURLParams]);

  const handleChange = function handleChange(param: string, value: string) {
    setFilterState((previousState) => ({ ...previousState, [param]: value }));
  };

  return (
    <Fragment>
      {filterConfigs.map((filter) => (
        <div
          key={filter.param}
          id={`filter-control-${filter.param}`}
          className="flex flex-col items-start justify-start gap-3">
          <Label htmlFor={filter.param}>{filter.label}</Label>
          {filter.type === "search" ? (
            <Input
              id={filter.param}
              type="text"
              value={filterState[filter.param]}
              placeholder={filter.placeholder || ""}
              onChange={(event) =>
                handleChange(filter.param, event.target.value)
              }
            />
          ) : null}

          {filter.type === "select" ? (
            <Select
              defaultValue={filterState[filter.param].toString()}
              onValueChange={(value) => handleChange(filter.param, value)}
              disabled={isPending}>
              <SelectTrigger>
                {filter.options.find(
                  (option) => option.value === filterState[filter.param],
                )?.label || ["Select", filter.param].join(" ")}
              </SelectTrigger>
              <SelectContent>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : null}
        </div>
      ))}
    </Fragment>
  );
};
