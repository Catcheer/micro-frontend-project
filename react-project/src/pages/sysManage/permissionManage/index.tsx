import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Input, message, Row, Col, Popconfirm } from 'antd';
import { getPermissionList, deletePermission } from '@/api/permission';
import usePagination from '@/hooks/usePagination.tsx';
import AddAndEdit from './addAndEdit';

const PermissionManage: React.FC = () => {
    const initSearchParams = {
        permissionName: '',
        permissionCode: '',
    };

    const [form] = Form.useForm();
    const [tableData, setTableData] = useState<any[]>([]);
    const { pagination, setPagination } = usePagination();
    const [curRow, setCurRow] = useState<any | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        _getPermissionList();
    }, [pagination.current, pagination.pageSize]);

    useEffect(() => {
        if (!modalVisible) {
            setCurRow(null);
        }
    }, [modalVisible]);

    const _getPermissionList = () => {
        let data = {
            page: pagination.current,
            pageSize: pagination.pageSize,
            permissionName: form.getFieldValue('permissionName'),
            permissionCode: form.getFieldValue('permissionCode'),
        }
        getPermissionList(data).then((res: any) => {
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
            title: '权限名',
            dataIndex: 'permissionName',
            key: 'permissionName',
        },
        {
            title: '权限code',
            dataIndex: 'permissionCode',
            key: 'permissionCode',
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
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
                        title="确认删除该权限吗？"
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
        deletePermission(record.id).then(() => {
            message.success('删除成功');
            _getPermissionList();
        }).catch(() => {
            message.error('删除失败');
        });
    };

    const handleSearch = () => {
        if (pagination.current === 1) {
            _getPermissionList();
        } else {
            setPagination({ ...pagination, current: 1 });
        }
    };

    const handleReset = () => {
        form.resetFields();
        if (pagination.current === 1) {
            _getPermissionList();
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
                            <Form.Item label="权限名" name="permissionName">
                                <Input placeholder="请输入权限名" />
                            </Form.Item>
                        </Col>
                        <Col xxl={5} xl={6} lg={8} md={12} sm={24}>
                            <Form.Item label="权限code" name="permissionCode">
                                <Input placeholder="请输入权限code" />
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

export default PermissionManage;
