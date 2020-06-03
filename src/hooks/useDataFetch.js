import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../axiosInstance';
import axiosCancel from 'axios';

const useDataFetch = ({ url, method, data, headers }, param) => {
  const history = useHistory();
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
      .catch((err) => {
        if (err?.response?.status === 404) {
          history.push('/404');
        }
      });

    return () => source.cancel();
  }, [url, method, data, headers, param]);

  return fetchedData;
};

export default useDataFetch;
