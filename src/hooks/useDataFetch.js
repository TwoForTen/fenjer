import { useEffect, useState } from 'react';
import axios from '../axiosInstance';
import axiosCancel from 'axios';

const useDataFetch = ({ url, method, data, headers }) => {
  const [fetchedData, setFetchedData] = useState();
  const source = axiosCancel.CancelToken.source();

  useEffect(() => {
    axios({
      method,
      url,
      data,
      headers,
      cancelToken: source.token,
    })
      .then((res) => setFetchedData(res.data))
      .catch(() => {});

    return () => source.cancel();
  }, [url, method, data, headers]);

  return fetchedData;
};

export default useDataFetch;
