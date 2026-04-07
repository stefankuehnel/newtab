import { SearchIcon, XIcon } from "lucide-react";
import React from "react";
import { useHotkeys } from "react-hotkeys-hook";

import type { Service, Services } from "@/types";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useServices } from "@/contexts/services-context";
import { defaultService } from "@/defaults/services";

/**
 * Creates a flat map of services indexed by service name
 * @param services - Map of service categories to service arrays
 * @returns Map of service names to service objects
 */
const getServicesByName = (services: Services): Map<string, Service> => {
  return new Map<string, Service>(
    Array.from(services.values())
      .flat()
      .map((service) => [service.name, service]),
  );
};

/**
 * Finds a service that matches the bang syntax in the query
 * Bang syntax allows quick service selection (e.g., "!g query" for Google)
 * @param query - The search query that may contain a bang
 * @param services - Map of available services
 * @returns The matching service or null if no bang found
 */
const getServiceByBang = (
  query: string,
  services: Services,
): null | Service => {
  const searchQuery = query.trim();
  const searchQueryBang = searchQuery.split(" ")[0];

  for (const servicesCategory of services.keys()) {
    for (const service of services.get(servicesCategory) || []) {
      if (
        searchQueryBang === service.bang.short ||
        searchQueryBang === service.bang.long
      ) {
        return service;
      }
    }
  }

  return null;
};

/**
 * Removes the bang syntax from the query string
 * @param query - The original query with potential bang
 * @param service - The service whose bang to remove
 * @returns Query without the bang prefix
 */
const getQueryWithoutBang = (query: string, service: Service): string => {
  return query
    .replace(service.bang.short, "")
    .replace(service.bang.long, "")
    .trim();
};

export const Search: React.FC = () => {
  const { services } = useServices();

  const [query, setQuery] = React.useState("");
  const [service, setService] = React.useState<Service>(defaultService);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const servicesByName = React.useMemo(
    () => getServicesByName(services),
    [services],
  );

  useHotkeys(
    ["ctrl+k", "meta+k"],
    (event) => {
      event.preventDefault();
      inputRef.current?.focus();
    },
    { enableOnFormTags: true },
  );

  React.useEffect(() => {
    const serviceByBang = getServiceByBang(query, services);

    if (serviceByBang && serviceByBang.name !== service.name) {
      setService(serviceByBang);
    }
  }, [query, service.name, services]);

  const handleSelectValueChange = React.useCallback(
    (value: string) => {
      const queryWithoutBang = getQueryWithoutBang(query, service);

      if (query !== queryWithoutBang) {
        setQuery(queryWithoutBang);
      }

      const found = servicesByName.get(value);

      if (found) {
        setService(found);
      }
    },
    [query, service, servicesByName],
  );

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setQuery(event.target.value),
    [],
  );

  const handleSubmit = React.useCallback(
    (formEvent: React.FormEvent) => {
      formEvent.preventDefault();

      const searchQuery = getQueryWithoutBang(query, service);

      if (!searchQuery) return;

      const serviceURLWithQuery = service.url + encodeURIComponent(searchQuery);

      window.open(serviceURLWithQuery, "_blank");
    },
    [query, service],
  );

  const handleClear = React.useCallback(() => {
    setQuery("");
    inputRef.current?.focus();
  }, []);

  return (
    <form
      className="w-full mx-auto flex flex-col gap-3 sm:w-lg"
      onSubmit={handleSubmit}
    >
      <div className="w-full">
        <Field className="w-full">
          <InputGroup>
            <InputGroupInput
              autoFocus={true}
              className="w-full"
              onChange={handleChange}
              placeholder="Search..."
              ref={inputRef}
              type="search"
              value={query}
            />
            <InputGroupAddon align="inline-start">
              <SearchIcon />
            </InputGroupAddon>
            {query !== "" && (
              <InputGroupAddon align="inline-end">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InputGroupButton
                      onClick={handleClear}
                      size="icon-xs"
                      variant="ghost"
                    >
                      <XIcon />
                    </InputGroupButton>
                  </TooltipTrigger>
                  <TooltipContent>Clear</TooltipContent>
                </Tooltip>
              </InputGroupAddon>
            )}
            {query === "" && (
              <InputGroupAddon align="inline-end">
                <Kbd>⌘K</Kbd>
              </InputGroupAddon>
            )}
          </InputGroup>
        </Field>
      </div>
      <div className="flex gap-2 justify-center w-full">
        <Select onValueChange={handleSelectValueChange} value={service.name}>
          <Tooltip>
            <TooltipTrigger asChild>
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <div className="grid gap-2 text-center">
                <p>Choose a service to search with.</p>
                <p>
                  <strong>Tip</strong>: Start your query with a <em>bang</em>{" "}
                  (e.g., <Kbd>!g</Kbd> for Google, <Kbd>!ddg</Kbd> for
                  DuckDuckGo) to quickly select a service.
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
          <SelectContent>
            {Array.from(services.keys()).map((category, index) => (
              <React.Fragment key={category}>
                {index > 0 && <SelectSeparator />}
                <SelectGroup>
                  <SelectLabel>{category}</SelectLabel>
                  {services.get(category)?.map((service) => (
                    <SelectItem key={service.name} value={service.name}>
                      <span className="flex items-center gap-2">
                        <span className="size-4 [&>img]:size-full">
                          <img
                            alt={service.name}
                            src={service.icon.toString()}
                          />
                        </span>
                        <span>{service.name}</span>
                        <Kbd>{service.bang.short}</Kbd>
                      </span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </React.Fragment>
            ))}
          </SelectContent>
        </Select>
        <Button className="bg-foreground text-background" type="submit">
          Search
        </Button>
      </div>
    </form>
  );
};
