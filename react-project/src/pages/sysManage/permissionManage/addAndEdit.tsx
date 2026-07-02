import React, { useEffect } from "react";
import { Modal, Form, Input, message } from 'antd';
import { addPermission, editPermission } from '@/api/permission';

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
                permissionName: curRow.permissionName,
                permissionCode: curRow.permissionCode,
                description: curRow.description,
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
                const res = await editPermission(id, rest);
                if (res) {
                    message.success('修改成功');
                } else {
                    message.error(res?.message || '修改失败');
                    return;
                }
            } else {
                const res = await addPermission(values);
                if (res) {
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
            title={curRow ? '编辑权限' : '新增权限'}
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            destroyOnClose
        >
            <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
                <Form.Item
                    label="权限名"
                    name="permissionName"
                    rules={[{ required: true, message: '请输入权限名' }]}
                >
                    <Input placeholder="请输入权限名" />
                </Form.Item>

                <Form.Item
                    label="权限code"
                    name="permissionCode"
                >
                    <Input placeholder="请输入权限code" />
                </Form.Item>
                <Form.Item
                    label="描述"
                    name="description"
                >
                    <Input placeholder="请输入描述" />
                </Form.Item>
            </Form>
        </Modal>
    );
}
