const logoutService = async () => {
  const response = await fetch(`${process.env.BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  localStorage.removeItem("access-token");
  return data;
};

export { logoutService };
