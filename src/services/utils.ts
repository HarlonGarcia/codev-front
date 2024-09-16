import endpoints from 'api/endpoints.json';

type Endpoint = typeof endpoints;

const generateUrl = (key: keyof Endpoint, identifiers = {}) => {
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

const getUrlWithoutPrefix = (url: string): string => {
  return url.replace(/^(https?:\/\/)?(www\.)?/, '');
};

export { generateUrl, getUrlWithoutPrefix };