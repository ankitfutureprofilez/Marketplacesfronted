export const isAdmin = (user) => user?.role === "admin";

export const hasPermission = (user, perm) => {
  if (user?.role === "admin") return true;
  return user?.permissions?.includes(perm);
};