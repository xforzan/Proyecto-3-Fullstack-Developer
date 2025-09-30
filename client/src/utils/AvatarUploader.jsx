export const uploadAvatar = async (file) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("avatar", file);

  const res = await fetch("http://localhost:3000/api/v1/users/avatar", {
    method: "POST",
    body: formData,
    credentials: "include"
  });

  const data = await res.json();
  return data.path || null;
};