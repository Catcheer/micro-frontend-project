import React, { useEffect } from "react";
import { Modal, Form, Input, message } from 'antd';
import { addUser, editUser } from '@/api/user';

type Props = {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    search: () => void;
    curRow: any | null;
}

export default function AddAndEdit(props: Props) {
    const { visible, setVisible, search, curRow } = props;
    const [form] = Form.useForm();

    useEffect(() => {
        if (!visible) return;
        if (curRow) {
            form.setFieldsValue({
                nickName: curRow.nickName,
                phone: curRow.phone,
                email: curRow.email,
            });
        } else {
            form.resetFields();
        }
    }, [visible, curRow, form]);

    const handleCancel = () => {
        setVisible(false);
        form.resetFields();
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (curRow) {
                const { id, ...rest } = { ...values, id: curRow.id };
                const res = await editUser(id, rest);
                if (res?.code === 200 || res === undefined) {
                    message.success('修改成功');
                } else {
                    message.error(res?.message || '修改失败');
                    return;
                }
            } else {
                const res = await addUser(values);
                if (res?.code === 200 || res === undefined) {
                    message.success('新增成功');
                } else {
                    message.error(res?.message || '新增失败');
                    return;
                }
            }
            setVisible(false);
            form.resetFields();
            search();
        } catch (error) {
            console.log('校验失败', error);
        }
    };

    return (
        <Modal
            title={curRow ? '编辑用户' : '新增用户'}
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            destroyOnClose
        >
            <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
                {!curRow && (
                    <>
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[{ required: true, message: '请输入用户名' }]}
                        >
                            <Input placeholder="请输入用户名" />
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input.Password placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item label="头像" name="avatar">
                            <Input placeholder="请输入头像地址" />
                        </Form.Item>
                    </>
                )}
                <Form.Item
                    label="昵称"
                    name="nickName"
                >
                    <Input placeholder="请输入昵称" />
                </Form.Item>
                <Form.Item
                    label="手机号"
                    name="phone"
                    rules={[{ pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }]}
                >
                    <Input placeholder="请输入手机号" />
                </Form.Item>
                <Form.Item
                    label="邮箱"
                    name="email"
                    rules={[{ type: 'email', message: '请输入正确的邮箱格式' }]}
                >
                    <Input placeholder="请输入邮箱" />
                </Form.Item>
            </Form>
        </Modal>
    );
}
