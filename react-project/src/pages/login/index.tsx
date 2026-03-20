"use client";


import { Card } from 'antd';
import FormLogin from './_components/FormLogin.tsx';

// import './index.scss';

export default function Login() {




    return (
        <div className="login_wrap flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black w-screen">

            <Card title="登录" className="w-120 shadow-lg">
                <FormLogin />
            </Card>

        </div>
    );
}
