import endpoints from 'api/endpoints.json';

type Endpoint = typeof endpoints;

const generateUrl = (key: keyof Endpoint, identifiers = {}) => {
  const complement = endpoints[key];

  if (!complement) {
    throw new Error(`Endpoint ${key} not found in endpoints.json`);
  }

  let url = `${import.meta.env.VITE_API_URL}${complement}`;

  if (!identifiers || !Object.keys(identifiers).length) {
    return url;
  }

  Object.keys(identifiers).forEach((identifier) => {
    const id = identifier as keyof typeof identifiers;

    if (identifier === 'identifier') {
      url = `${url}/${identifiers[id]}`
    }

    url = url.replace(`{${id}}`, identifiers[id]);
  });

  return url;
};

const getUrlWithoutPrefix = (url: string): string => {
  return url.replace(/^(https?:\/\/)?(www\.)?/, '');
};

const toBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = error => reject(error);
  });
};

export { generateUrl, getUrlWithoutPrefix, toBase64 };