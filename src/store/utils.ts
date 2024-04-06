import endpoints from '../api/endpoints.json';

type Endpoint = typeof endpoints;

const getUrl = (key: keyof Endpoint, identifiers = {}) => {
  let url = endpoints[key];

  if (!url) {
    throw new Error(`Endpoint ${key} not found in endpoints.json`);
  }

  if (!identifiers || !Object.keys(identifiers).length) {
    return url;
  }

  Object.keys(identifiers).forEach((identifier) => {
    const id = identifier as keyof typeof identifiers;
    url = url.replace(`{${id}}`, identifiers[id]);
  });

  return url;
};

export { getUrl };