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

        let requestData = {
          signal: controllerRef.current.signal,
          method,
          url,
        }

        if (method == 'GET') {
          requestData['params'] = payload
        } else {
          requestData['data'] = payload
        }

        const response = await axios.request(requestData);

        setData(response.data)

      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return {
    data: data?.data,
    error,
    isLoading,
    cancel,
    pagination: data?.pagination
  };
};

export const useAxiosPromise = (url, method, payload) => {
  return axios.request({
    data: payload,
    method,
    url,
  });
}