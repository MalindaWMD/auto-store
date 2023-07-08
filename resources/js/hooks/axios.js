import { useState, useRef, useEffect } from "react";

export const useAxios = (url, method, payload) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.request({
          data: payload,
          signal: controllerRef.current.signal,
          method,
          url,
        });

        setData(response.data.data)

      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { data, error, isLoading, cancel };
};

export const useAxiosPromise = (url, method, payload) => {
  return axios.request({
    data: payload,
    method,
    url,
  });
}