import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Input, message, Card, Row, Col, Popconfirm } from 'antd';
import { getUserList, deleteUser } from '@/api/user';
import usePagination from '@/hooks/usePagination.tsx';
import AddAndEdit from './addAndEdit';

const UserManage: React.FC = () => {
    const initSearchParams = {
        userName: '',
        email: '',
        phone: '',
        nickName: '',
    };

    const [form] = Form.useForm();
    const [tableData, setTableData] = useState<any[]>([]);
    const { pagination, setPagination } = usePagination();
    const [curRow, setCurRow] = useState<any | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        _getUserList();
    }, [pagination.current, pagination.pageSize]);

    useEffect(() => {
        if (!modalVisible) {
            setCurRow(null);
        }
    }, [modalVisible]);

    const _getUserList = () => {
        let data = {
            page: pagination.current,
            pageSize: pagination.pageSize,
            nickName: form.getFieldValue('nickName'),
            phone: form.getFieldValue('phone'),
            email: form.getFieldValue('email'),
            userName: form.getFieldValue('userName')
        }
        getUserList(data).then((res: any) => {
            if (res) {
                setTableData(res.list || []);
                setPagination({
                    ...pagination,
                    total: res.total
                });
            }
        });
    };

    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '昵称',
            dataIndex: 'nickname',
            key: 'nickname',
        },
        {
            title: '所属角色',
            dataIndex: 'roles',
            key: 'roles',
            render: (roles: any[]) => {
                return roles.map((role: any) => role.roleName).join(',');
            },
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            render: (_: any, record: any) => (
                <div>
                    <Button
                        type="link"
                        onClick={() => handleEdit(record)}
                    >
                        编辑
                    </Button>
                    <Popconfirm
                        title="确认删除该用户吗？"
                        onConfirm={() => handleDelete(record)}
                        okText="确认"
                        cancelText="取消"
                    >
                        <Button type="link" danger>
                            删除
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const handleEdit = (record: any) => {
        setCurRow(record);
        setModalVisible(true);
    };

    const handleDelete = (record: any) => {
        deleteUser(record.id).then(res => {
            message.success('删除成功');
            _getUserList();
        }).catch(() => {
            message.error('删除失败');
        });
    };

    const handleSearch = () => {
        if (pagination.current === 1) {
            _getUserList();
        } else {
            setPagination({ ...pagination, current: 1 });
        }
    };

    const handleReset = () => {
        form.resetFields();
        if (pagination.current === 1) {
            _getUserList();
        } else {
            setPagination({ ...pagination, current: 1 });
        }
    };

    const handleAdd = () => {
        setModalVisible(true);
    };

    return (
        <div className='px-6 py-4'>
            <div className='mb-6'>
                <Form
                    layout="horizontal"
                    form={form}
                    initialValues={initSearchParams}
                    size="middle"
                >
                    <Row gutter={[16, 0]}>
                        <Col xxl={5} xl={6} lg={8} md={12} sm={24}>
                            <Form.Item label="用户名" name="userName">
                                <Input placeholder="请输入用户名" />
                            </Form.Item>
                        </Col>
                        <Col xxl={5} xl={6} lg={8} md={12} sm={24}>
                            <Form.Item label="昵称" name="nickName">
                                <Input placeholder="请输入昵称" />
                            </Form.Item>
                        </Col>
                        <Col xxl={5} xl={6} lg={8} md={12} sm={24}>
                            <Form.Item label="邮箱" name="email">
                                <Input placeholder="请输入邮箱" />
                            </Form.Item>
                        </Col>
                        <Col xxl={5} xl={6} lg={8} md={12} sm={24}>
                            <Form.Item label="手机号" name="phone">
                                <Input placeholder="请输入手机号" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <div className='flex flex-wrap gap-3 justify-end'>
                                <Button type="primary" onClick={handleSearch}>查询</Button>
                                <Button onClick={handleReset}>重置</Button>
                                <Button onClick={handleAdd}>新增</Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>

            <Table
                dataSource={tableData}
                columns={columns}
                rowKey="id"
                pagination={pagination}
                size="small"
                bordered
            />

            <AddAndEdit
                visible={modalVisible}
                setVisible={setModalVisible}
                search={handleSearch}
                curRow={curRow}
            />
        </div>
    );
};

export default UserManage;
