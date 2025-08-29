import { useLayouts } from "@/layouts/LayoutContextProvider";

export const usePermissions = () => {
  const { hasPermission, userPermissions, role } = useLayouts();

  const checkPermission = (permissionKey) => {
    if (role === 0) {
      return true;
    }

    return hasPermission(permissionKey);
  };

  return {
    checkPermission,
  };
};
