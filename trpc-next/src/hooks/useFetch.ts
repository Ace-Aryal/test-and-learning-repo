import { useEffect, useState } from "react";

export const useFetch = (url: string) => {
  const [data, setData] = useState<{ id: string | number; joke: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Something went wrong"
        );
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { data, loading, error };
};
