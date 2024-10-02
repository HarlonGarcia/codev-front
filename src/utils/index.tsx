export const getCookie = (key: string) => {
  const cookies = `; ${document.cookie}`;
  const parts = cookies.split(`; ${key}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }
};

export const getBase64Image = (image?: string) => {
  return image ? `data:image/jpeg;base64,${image}` : undefined;
};