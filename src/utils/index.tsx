export const challengeStatuses = {
  TO_BEGIN: {
    id: 'TO_BEGIN',
    color: '#0341Cf',
  },
  IN_PROGRESS: {
    id: 'IN_PROGRESS',
    color: '#50fa7b',
  },
  FINISHED: {
    id: 'FINISHED',
    color: '#ff5555',
  },
  CANCELED: {
    id: 'CANCELED',
    color: '#ff5555',
  },
};


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