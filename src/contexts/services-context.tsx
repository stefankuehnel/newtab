import React from "react";
import SuperJSON from "superjson";

import { type Service, type ServiceCategory, type Services } from "@/types";

export type ServicesContextProviderProps = React.PropsWithChildren<{
  defaultServices: Services;
  storageKey?: string;
}>;

export type ServicesContextState = {
  services: Services;
  setServices: (services: Services) => void;
};

const defaultServices = new Map<ServiceCategory, Array<Service>>();

const defaultServicesContextState: ServicesContextState = {
  services: defaultServices,
  setServices: () => {},
};

const ServicesContext = React.createContext<ServicesContextState>(
  defaultServicesContextState,
);

export const ServicesContextProvider: React.FC<
  ServicesContextProviderProps
> = ({
  children,
  defaultServices,
  storageKey = "vite-ui-services",
  ...props
}) => {
  const [services, setServices] = React.useState<Services>(() => {
    const storedServicesJSON = localStorage.getItem(storageKey);

    if (!storedServicesJSON) {
      return defaultServices;
    }

    try {
      const services = SuperJSON.parse<Services>(storedServicesJSON);

      return new Map(
        Object.entries(services) as Array<[ServiceCategory, Array<Service>]>,
      );
    } catch (error) {
      console.error("Failed to parse services from localStorage:", error);

      return defaultServices;
    }
  });

  const value = {
    services,
    setServices: (services: Services) => {
      localStorage.setItem(
        storageKey,
        SuperJSON.stringify(Object.fromEntries(services)),
      );
      setServices(services);
    },
  };

  return (
    <ServicesContext.Provider value={value} {...props}>
      {children}
    </ServicesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useServices = () => {
  const servicesContext = React.useContext(ServicesContext);

  if (!servicesContext) {
    throw new Error(
      "'useServices()' must be used within a '<ServicesContextProvider />'",
    );
  }

  return servicesContext;
};
