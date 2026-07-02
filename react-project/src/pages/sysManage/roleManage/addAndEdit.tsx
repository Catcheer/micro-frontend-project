import React, { useEffect,useState, } from "react";
import { Modal, Form, Input, message ,Select} from 'antd';
import { addRole, editRole } from '@/api/role';

import { getPermissionList } from '@/api/permission';

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
                roleName: curRow.roleName,
                roleCode: curRow.roleCode,
                description: curRow.description,
                permissions: curRow.permissions?.map((permission: any) => permission.permissionCode) || [],
            });
        } else {
            form.resetFields();
        }
    }, [visible, curRow, form]);


    const [permissionOptions, setPermissionOptions] = useState<any[]>([]);

    useEffect(() => {
        if (!visible) return;
        getPermissionList({ page: 1, pageSize: 999 }).then((res: any) => {
            setPermissionOptions(res?.list || []);
        });
    }, [visible]);

    const handleCancel = () => {
        setVisible(false);
        form.resetFields();
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (curRow) {
                const { id, ...rest } = { ...values, id: curRow.id };
                const res = await editRole(id, rest);
                console.log('res', res)
                if (res) {
                    message.success('修改成功');
                } else {
                    message.error(res?.message || '修改失败');
                    return;
                }
            } else {
                const res = await addRole(values);
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
            title={curRow ? '编辑角色' : '新增角色'}
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            destroyOnClose
        >
            <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
                <Form.Item
                    label="角色名"
                    name="roleName"
                    rules={[{ required: true, message: '请输入角色名' }]}
                >
                    <Input placeholder="请输入角色名" />
                </Form.Item>

                <Form.Item
                    label="角色code"
                    name="roleCode"
                >
                    <Input placeholder="请输入角色code" />
                </Form.Item>
                <Form.Item
                    label="描述"
                    name="description"

                >
                    <Input placeholder="请输入描述" />
                </Form.Item>

                <Form.Item
                    label="权限"
                    name="permissions"
                >
                    <Select
                        mode="multiple"
                        placeholder="请选择权限"
                        options={permissionOptions.map((permission) => ({
                            label: permission.permissionName,
                            value: permission.permissionCode,
                        }))}
                    />
                </Form.Item>

            </Form>
        </Modal>
    );
}
