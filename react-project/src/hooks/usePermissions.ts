import { useState, useEffect } from 'react';

export function usePermissions() {
    const [permissions, setPermissions] = useState<string[]>([]);
    const [roles, setRoles] = useState<string[]>([]);

    useEffect(() => {
        const handleAuthChange = () => {
            try {
                const storedPermissions = localStorage.getItem('permissions');
                const storedRoles = localStorage.getItem('roles');
                setPermissions(storedPermissions ? JSON.parse(storedPermissions) : []);
                setRoles(storedRoles ? JSON.parse(storedRoles) : []);
            } catch (e) {
                console.error('Error reading permissions/roles from localStorage', e);
                setPermissions([]);
                setRoles([]);
            }
        };

        // Initial fetch
        handleAuthChange();

        // Listen for token updates and logout events
        window.addEventListener('storage', handleAuthChange);
        window.addEventListener('auth-change', handleAuthChange);

        return () => {
            window.removeEventListener('storage', handleAuthChange);
            window.removeEventListener('auth-change', handleAuthChange);
        };
    }, []);

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
