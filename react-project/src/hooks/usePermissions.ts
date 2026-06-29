import { useSelector } from 'react-redux';
import { selectPermissions, selectRoles } from '@/store/authSlice';

export function usePermissions() {
    const permissions = useSelector(selectPermissions);
    const roles = useSelector(selectRoles);

    const hasPermission = (requiredPermission: string | string[]): boolean => {
        // ADMIN has bypass privileges
        if (roles.includes('ADMIN')) {
            return true;
        }

        if (Array.isArray(requiredPermission)) {
            return requiredPermission.some(p => permissions.includes(p));
        }

        return permissions.includes(requiredPermission);
    };

    return {
        permissions,
        roles,
        hasPermission,
    };
}
