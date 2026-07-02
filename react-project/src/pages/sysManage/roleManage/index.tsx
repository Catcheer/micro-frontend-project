import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Input, message, Card, Row, Col, Popconfirm } from 'antd';
import { getRoleList, deleteRole } from '@/api/role';
import usePagination from '@/hooks/usePagination.tsx';
import AddAndEdit from './addAndEdit';
import { PermissionButton } from '@/components/Permission';
const RoleManage: React.FC = () => {
    const initSearchParams = {
        roleName: '',
        roleCode: '',
    };

    const [form] = Form.useForm();
    const [tableData, setTableData] = useState<any[]>([]);
    const { pagination, setPagination } = usePagination();
    const [curRow, setCurRow] = useState<any | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        _getRoleList();
    }, [pagination.current, pagination.pageSize]);

    useEffect(() => {
        if (!modalVisible) {
            setCurRow(null);
        }
    }, [modalVisible]);

    const _getRoleList = () => {
        let data = {
            page: pagination.current,
            pageSize: pagination.pageSize,
            roleName: form.getFieldValue('roleName'),
            roleCode: form.getFieldValue('roleCode'),
        }
        getRoleList(data).then((res: any) => {
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
            title: '角色名',
            dataIndex: 'roleName',
            key: 'roleName',
        },
        {
            title: '角色code',
            dataIndex: 'roleCode',
            key: 'roleCode',
        },
        {
            title: '权限',
            dataIndex: 'permissions',
            key: 'permissions',
            render: (permissions: any[]) => {
                return permissions.map((permission: any) => permission.permissionName).join(',');
            },
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'email',
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
                    <PermissionButton
                        permission="role:add"
                        type="link"
                        onClick={() => handleEdit(record)}
                    >
                        编辑
                    </PermissionButton>
                    <Popconfirm
                        title="确认删除该用户吗？"
                        onConfirm={() => handleDelete(record)}
                        okText="确认"
                        cancelText="取消"
                    >
                        <PermissionButton permission="role:delete" type="link" danger>
                            删除
                        </PermissionButton>
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
        deleteRole(record.id).then(res => {
            message.success('删除成功');
            _getRoleList();
        }).catch(() => {
            message.error('删除失败');
        });
    };

    const handleSearch = () => {
        if (pagination.current === 1) {
            _getRoleList();
        } else {
            setPagination({ ...pagination, current: 1 });
        }
    };

    const handleReset = () => {
        form.resetFields();
        if (pagination.current === 1) {
            _getRoleList();
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
                            <Form.Item label="角色名" name="roleName">
                                <Input placeholder="请输入角色名" />
                            </Form.Item>
                        </Col>
                        <Col xxl={5} xl={6} lg={8} md={12} sm={24}>
                            <Form.Item label="角色code" name="roleCode">
                                <Input placeholder="请输入昵称" />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <div className='flex flex-wrap gap-3 justify-end'>
                                <Button type="primary" onClick={handleSearch}>查询</Button>
                                <Button onClick={handleReset}>重置</Button>
                                <PermissionButton permission="role:add" onClick={handleAdd}>新增</PermissionButton>
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

export default RoleManage;
