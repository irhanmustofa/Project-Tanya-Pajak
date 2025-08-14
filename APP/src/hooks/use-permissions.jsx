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
    hasPermission: checkPermission,
    userPermissions,
    role,
    isAdmin: role === 0,
    canCreate: (resource) => checkPermission(`${resource}.create`),
    canRead: (resource) => checkPermission(`${resource}.read`),
    canUpdate: (resource) => checkPermission(`${resource}.update`),
    canDelete: (resource) => checkPermission(`${resource}.delete`),
  };
};
