import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";

import { userLogin } from "@/api/login";

const FormLogin: React.FC = () => {
    type FieldType = {
        username: string;
        password: string;
    };

    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        console.log("Success:", values);
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
        errorInfo
    ) => {
        console.log("Failed:", errorInfo);
    };

    const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("Login button clicked", loginInfo);
        userLogin(loginInfo).then((data) => {
            console.log("Success:", data);
            localStorage.setItem('token', data.data)
        })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const [loginInfo, setLoginInfo] = React.useState<FieldType>({
        username: "",
        password: "",
    });

    function handleChange<T extends keyof FieldType>(field: T) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            setLoginInfo(prev => ({
                ...prev,
                [field]: e.target.value,
            }));
        };
    }

    return (
        <Form
            size={"large"}
            layout={"vertical"}
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="用户名"
                name="username"
                rules={[{ required: true, message: "Please input your username!" }]}
            >
                <Input value={loginInfo.username}
                    onChange={handleChange("username")} />

            </Form.Item>

            <Form.Item<FieldType>
                label="密码"
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
            >
                <Input.Password
                    value={loginInfo.password}
                    onChange={handleChange("password")} />

            </Form.Item>

            {/* <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item> */}

            <Form.Item label={null}>
                <Button type="primary" className="w-full" onClick={handleLogin}>
                    登录
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormLogin;
