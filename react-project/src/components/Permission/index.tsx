import React from 'react';
import { Button, ButtonProps, Result } from 'antd';
import { Navigate, useLocation } from 'react-router-dom';
import { usePermissions } from '@/hooks/usePermissions';

// --- Permission Wrapper Component ---
export interface PermissionProps {
    permission: string | string[];
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export const Permission: React.FC<PermissionProps> = ({ permission, children, fallback = null }) => {
    const { hasPermission } = usePermissions();
    if (hasPermission(permission)) {
        return <>{children}</>;
    }
    return <>{fallback}</>;
};

// --- Permission Button Component ---
export interface PermissionButtonProps extends ButtonProps {
    permission: string | string[];
}

export const PermissionButton: React.FC<PermissionButtonProps> = ({ permission, children, ...rest }) => {
    const { hasPermission } = usePermissions();
    if (!hasPermission(permission)) {
        return null;
    }
    return <Button {...rest}>{children}</Button>;
};

// --- Protected Route Wrapper ---
export interface ProtectedRouteProps {
    permission?: string | string[];
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ permission, children }) => {
    const { hasPermission } = usePermissions();
    const location = useLocation();

    const token = localStorage.getItem('accessToken');
    if (!token) {
        // Redirect to login with redirect parameter
        return <Navigate to={`/login?redirect=/${import.meta.env.VITE_APP_NAME}${encodeURIComponent(location.pathname + location.search)}`} replace />;
    }

    if (permission && !hasPermission(permission)) {
        return (
            <div className="flex items-center justify-center min-h-[400px] w-full p-8">
                <Result
                    status="403"
                    title="403"
                    subTitle="对不起，您没有权限访问此页面。"
                    extra={
                        <Button type="primary" onClick={() => window.location.href = `/${import.meta.env.VITE_APP_NAME}/`}>
                            返回首页
                        </Button>
                    }
                />
            </div>
        );
    }

    return <>{children}</>;
};
