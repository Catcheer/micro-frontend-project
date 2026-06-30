import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import MD5 from "crypto-js/md5";
import { useDispatch } from "react-redux";
import { setLoginInfo } from "@/store/authSlice";

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
        user?: {
            id: number;
            username: string;
            nickname: string;
        };
        roles?: string[];
        permissions?: string[];
    };
};

const FormLogin: React.FC = () => {
    const [form] = Form.useForm<FieldType>();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

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
                console.log('authData', JSON.stringify(authData, null, 3))

                if (authData?.accessToken && authData?.refreshToken && authData?.user) {
                    dispatch(setLoginInfo({
                        accessToken: authData.accessToken,
                        refreshToken: authData.refreshToken,
                        user: authData.user,
                        roles: authData.roles || [],
                        permissions: authData.permissions || [],
                    }));
                }
                console.log('window.location.search', window.location.search)
                const params = new URLSearchParams(window.location.search)

                const redirect = params.get('redirect')
                console.log('redirect', redirect)
                if (redirect) {
                    window.location.href = `${decodeURIComponent(redirect)}`
                    return;
                }

                window.location.href = `/${import.meta.env.VITE_APP_NAME}/`;
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
                initialValue="admin"
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
