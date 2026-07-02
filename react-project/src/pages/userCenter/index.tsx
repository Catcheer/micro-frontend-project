
import React, { useRef, useState, useEffect } from 'react';
import {
    Row,
    Col,
    Form,
    Input,
    message,
    Spin,
    Button
} from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, updateUser, selectRoles } from '@/store/authSlice';
import { uploadAvatar } from '@/api/login';
import { editUser } from '@/api/user';

const UserCenter = () => {
    const dispatch = useDispatch();
    const authUser = useSelector(selectUser);
    const authRoles = useSelector(selectRoles);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form] = Form.useForm();

    const initialValues = {
        name: authUser?.username || '',
        nickName: authUser?.nickname || '',
        phone: authUser?.phone || '',
        email: authUser?.email || '',
        createTime: authUser?.createTime || '',
        roles: authRoles?.join(', ') || '',
        lastLoginTime: authUser?.lastLoginTime || '',
        lastLoginIp: authUser?.lastLoginIp || '',
    };

    useEffect(() => {
        if (authUser) {
            form.setFieldsValue({
                name: authUser.username || '',
                nickName: authUser.nickname || '',
                phone: authUser.phone || '',
                email: authUser.email || '',
                createTime: authUser.createTime || '',
                roles: authRoles?.join(', ') || '',
                lastLoginTime: authUser.lastLoginTime || '',
                lastLoginIp: authUser.lastLoginIp || '',
            });
        }
    }, [authUser, form]);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('只能上传图片文件！');
            return;
        }

        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片大小不能超过 2MB！');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);
        try {
            const res: any = await uploadAvatar(formData);
            if (res?.code === 200) {
                const avatarUrl = res.data;
                dispatch(updateUser({ avatar: avatarUrl }));
                message.success('头像上传成功！');
            } else {
                message.error(res?.message || '头像上传失败！');
            }
        } catch (error: any) {
            console.error('Upload avatar error:', error);
            message.error(typeof error === 'string' ? error : '头像上传失败！');
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleCancel = () => {
        form.setFieldsValue({
            nickName: authUser?.nickname || '',
            phone: authUser?.phone || '',
            email: authUser?.email || '',
        });
        setEditing(false);
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields(['nickName', 'phone', 'email']);
            setSaving(true);
            const res: any = await editUser(authUser!.id, {
                nickname: values.nickName,
                phone: values.phone,
                email: values.email,
            });
            if (res) {
                dispatch(updateUser({
                    nickname: values.nickName,
                    phone: values.phone,
                    email: values.email,
                }));
                message.success('保存成功！');
                setEditing(false);
            } else {
                message.error('保存失败！');
            }
        } catch (error: any) {
            if (typeof error === 'string') {
                message.error(error);
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="px-8 py-8">
            <div className='flex'>
                <div className='w-80 pr-8 border-r flex flex-col items-center justify-start pt-4'>
                    <div
                        className="relative group w-40 h-40 rounded-full overflow-hidden cursor-pointer shadow-md border-2 border-slate-100 hover:border-blue-500 transition-all duration-300"
                        onClick={handleAvatarClick}
                    >
                        <img
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            src={authUser?.avatar ? `/api/uploads/${authUser?.avatar}` : '/defaultAvatar.jpg'}
                            alt="Avatar"
                        />
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <CameraOutlined className="text-white text-2xl mb-1" />
                            <span className="text-white text-xs font-medium">修改头像</span>
                        </div>
                        {uploading && (
                            <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                                <Spin size="default" />
                            </div>
                        )}
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        accept="image/*"
                    />
                    <div className="text-center mt-4">
                        <div className="text-lg font-bold text-slate-800">{authUser?.nickname || authUser?.username}</div>
                        <div className="text-sm text-slate-400 mt-1">{authUser?.username}</div>
                    </div>
                </div>

                <Form
                    form={form}
                    className='pl-8 flex-1'
                    initialValues={initialValues}
                >
                    <div className='flex justify-end mb-2'>
                        {!editing ? (
                            <Button type="primary" onClick={handleEdit}>编辑</Button>
                        ) : (
                            <>
                                <Button onClick={handleCancel} style={{ marginRight: 8 }}>取消</Button>
                                <Button type="primary" loading={saving} onClick={handleSave}>保存</Button>
                            </>
                        )}
                    </div>

                    <Row className='pt-4' gutter={30}>
                        <Col span={12}>
                            <Form.Item
                                label="用户名"
                                name="name"
                            >
                                <Input
                                    variant="borderless"
                                    readOnly
                                    placeholder="请输入姓名" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="昵称"
                                name="nickName"
                            >
                                <Input
                                    variant={editing ? 'outlined' : 'borderless'}
                                    readOnly={!editing}
                                    placeholder="请输入昵称" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={30}>
                        <Col span={12}>
                            <Form.Item
                                label="手机号"
                                name="phone"
                            >
                                <Input
                                    variant={editing ? 'outlined' : 'borderless'}
                                    readOnly={!editing}
                                    placeholder="" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="邮箱"
                                name="email"
                            >
                                <Input
                                    variant={editing ? 'outlined' : 'borderless'}
                                    readOnly={!editing}
                                    placeholder="" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={30}>
                        <Col span={12}>
                            <Form.Item
                                label="创建时间"
                                name="createTime"
                            >
                                <Input
                                    variant="borderless"
                                    readOnly
                                    placeholder="" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="所属角色"
                                name="roles"
                            >
                                <Input
                                    variant="borderless"
                                    readOnly
                                    placeholder="" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={30}>
                        <Col span={12}>
                            <Form.Item
                                label="最后登录时间"
                                name="lastLoginTime"
                            >
                                <Input
                                    variant="borderless"
                                    readOnly
                                    placeholder="" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="最后登录ip"
                                name="lastLoginIp"
                            >
                                <Input
                                    variant="borderless"
                                    readOnly
                                    placeholder="" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};

export default UserCenter;

