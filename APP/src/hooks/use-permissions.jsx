import { useLayouts } from "@/layouts/LayoutContextProvider";

export const usePermissions = () => {
  const { hasPermission, role } = useLayouts();
  const checkPermission = (permissionKey) => {
    if (!permissionKey) return false;
    if (role === 0) return true;
    if (Array.isArray(permissionKey)) {
      return permissionKey.some((perm) => hasPermission(perm));
    }
    return hasPermission(permissionKey);
  };

  return {
    checkPermission,
  };
};
