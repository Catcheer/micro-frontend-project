"use client";


import { Card } from 'antd';
import FormLogin from './_components/FormLogin.tsx';

// import './index.scss';

export default function Login() {




    return (
        <div className=" ">

            <Card title="登录" className="w-240 shadow-lg">
                <FormLogin />
            </Card>

        </div>
    );
}
