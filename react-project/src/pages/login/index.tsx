"use client";

import { Card, Typography } from 'antd';
import FormLogin from './_components/FormLogin.tsx';
import './index.less';

const { Title, Text } = Typography;

export default function Login() {




    return (
        <div className="login-page min-h-screen flex items-center justify-center bg-slate-100 px-4">
            <Card className="login-card w-full max-w-lg">
                <div className="login-card-title">
                    <Title level={3} className="mb-0">欢迎登录管理系统</Title>
                </div>
                <div className="login-card-subtitle">
                    <Text>请输入您的账号和密码开始管理</Text>
                </div>
                <FormLogin />
            </Card>
        </div>
    );
}
