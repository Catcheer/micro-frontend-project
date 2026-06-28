"use client";


import { Card } from 'antd';
import FormLogin from './_components/FormLogin.tsx';

// import './index.scss';

export default function Login() {




    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Card title="登录" className="w-full max-w-md shadow-lg">
                <FormLogin />
            </Card>
        </div>
    );
}
