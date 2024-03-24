import endpoints from '../api/endpoints.json';

type Endpoint = typeof endpoints;

const getUrl = (key: keyof Endpoint, pathVariable?: string | number) => {
  const url = endpoints[key];

  if (!url) {
    throw new Error(`Endpoint ${key} not found in endpoints.json`);
  }

  if (!pathVariable) {
    return url;
  }

  return `${url}/${pathVariable}`;
};

export { getUrl };