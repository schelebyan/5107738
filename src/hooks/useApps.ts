import { useQuery } from "@tanstack/react-query";
import { useMessages } from "../context";
import Applications from "../models/Applications";

const mockData = {
  data: [
    {
      description: "Timer App",
      long_name: "Timer",
      short_name: "Timer",
    },
    {
      description: "Another App",
      long_name: "This is another app",
      short_name: "another app",
    },
  ],
};

export const useApps = (endpoint = "/applications") => {
  const { setPageFetching, setErrorMessage, setSuccessMessage } = useMessages();

  return useQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      try {
        setPageFetching(true);
        const apps = new Applications(mockData);
        setSuccessMessage("simulate network call");
        //simulate network call
        setTimeout(() => {
          setPageFetching(false);
        }, 1000);
        return apps;
      } catch (e) {
        setPageFetching(false);
        setErrorMessage("Error Fetching Apps");
        throw new Error("Error Fetching Apps");
      }
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 0,
    retry: 1,
  });
};
