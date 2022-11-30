import { create as apiSauceCreate } from "apisauce";

import config from "../config.json";

export default function create({ customHeaders } = {}) {
  const headers = {
    "cache-control": "no-cache",
    "Content-Type": "application/json",
    ...customHeaders,
  };

  const api = apiSauceCreate({
    baseURL: config.api.baseUrl,
    headers,
  });

  return api;
}
