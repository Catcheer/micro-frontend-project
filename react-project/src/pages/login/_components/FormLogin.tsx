import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import MD5 from "crypto-js/md5";

import { userLogin } from "@/api/login";

type FieldType = {
    username: string;
    password: string;
};

type LoginResponse = {
    code: number;
    message?: string;
    data?: {
        accessToken?: string;
        refreshToken?: string;
    };
};

const FormLogin: React.FC = () => {
    const [form] = Form.useForm<FieldType>();
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);
            const data = (await userLogin({
                ...values,
                password: MD5(values.password).toString(),
            })) as LoginResponse;

            if (data?.code === 200) {
                const authData = data.data

                if (authData?.accessToken) {
                    localStorage.setItem("accessToken", authData.accessToken);
                    // localStorage.setItem("token", authData.accessToken);
                }

                if (authData?.refreshToken) {
                    localStorage.setItem("refreshToken", authData.refreshToken);
                }

                const params = new URLSearchParams(window.location.search)
                const redirect = params.get('redirect')
                if (redirect) {
                    window.location.href = decodeURIComponent(redirect)
                    return;
                }

                window.location.href = "/app-react/";
                return;
            }

            message.error(data?.message || "登录失败");
        } catch (error) {
            if (typeof error === "string") {
                message.error(error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            form={form}
            size={"large"}
            layout={"vertical"}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="用户名"
                name="username"
                initialValue="zhangsan"
                rules={[{ required: true, message: "请输入用户名!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="密码"
                name="password"
                initialValue="123456"
                rules={[{ required: true, message: "请输入密码!" }]}
            >
                <Input.Password />
            </Form.Item>

            {/* <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item> */}

            <Form.Item label={null}>
                <Button
                    type="primary"
                    className="w-full"
                    loading={loading}
                    onClick={handleLogin}
                >
                    登录
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormLogin;
