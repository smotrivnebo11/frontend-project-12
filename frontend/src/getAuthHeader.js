const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
    // Bearer-токен - токен на предъявителя
  }

  return {};
};

export default getAuthHeader;
