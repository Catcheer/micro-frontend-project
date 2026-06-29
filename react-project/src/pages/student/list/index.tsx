import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Input, DatePicker, message, Upload, Select, Card, Row, Col, Typography } from 'antd'


import { getStudentList, deleteStudent, uploadExcel, getExcel } from '@/api/student'
import usePagination from '@/hooks/usePagination.tsx'
import { useStudentClass } from '@/pages/student/hooks/useStudentClass'

import AddAndEdit from './addAndEdit.tsx'
import './index.less'
import dayjs from 'dayjs';
import { PermissionButton } from '@/components/Permission';




const { RangePicker } = DatePicker;


const StudentList: React.FC = () => {
    const initSearchParams = {
        name: '',
        gender: '',
        studentNo: '',
        birthDate: []
    }
    const [form] = Form.useForm();
    const [tableData, setTableData] = useState([])
    const { pagination, setPagination } = usePagination()

    const [curRow, setCurRow] = useState<Student | null>(null)

    const [addModalvisible, setAddModalvisible] = useState(false)

    const classOptions = useStudentClass() || []

    console.log('classOptions------', classOptions)

    useEffect(() => {
        _getStudentList();

    }, [pagination.current, pagination.pageSize])

    useEffect(() => {
        if (!addModalvisible) {
            setCurRow(null)
        }
    }, [addModalvisible])


    const _getStudentList = () => {
        let serchParams = form.getFieldsValue()
        let params: any = {
            page: pagination.current,
            pageSize: pagination.pageSize,
            ...serchParams,
            birthDate: serchParams.birthDate?.length === 2 ? serchParams.birthDate.map((item: any) => dayjs(item).format('YYYY-MM-DD')) : []
        }
        getStudentList(params).then(res => {
            setTableData(res.list)
            setPagination({
                ...pagination,
                total: res.total
            })
        })
    }






    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '学号',
            dataIndex: 'studentNo',
            key: 'studentNo',
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
            render: (text: any, record: any) => {
                return (
                    <div>
                        {Number(text) === 1 ? '男' : '女'}
                    </div>
                )
            }
        },
        {
            title: '班级',
            dataIndex: 'className',
            key: 'classId',

        },
        {
            title: '出生年月',
            dataIndex: 'birthday',
            key: 'birthday',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render: (text: any, record: any) => {
                return (
                    <div>
                        {dayjs(text).format('YYYY-MM-DD HH:mm:ss')}
                    </div>
                )
            }
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
            render: (text: any, record: any) => {
                return (
                    <div>
                        {dayjs(text).format('YYYY-MM-DD HH:mm:ss')}
                    </div>
                )
            }
        },
        {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            render: (text: any, record: any) => {
                return (
                    <div>
                        <PermissionButton permission="student:update" type="link" onClick={() => { handleEdit(record) }}>编辑</PermissionButton>
                        <PermissionButton type="link" permission="student:delete" onClick={() => { handleDelete(record) }}>删除</PermissionButton>

                    </div>
                )
            }
        },
    ];


    const handleEdit = (record: Student) => {
        setCurRow(record)
        console.log(record)
        setAddModalvisible(true)
    }

    const handleDelete = (record: any) => {
        console.log(record)
        deleteStudent(record.id).then(res => {
            _getStudentList()
        })
    }

    const handleSearch = () => {

        console.log(form.getFieldsValue())

        if (pagination.current === 1) {
            _getStudentList()
        } else {
            // 
            setPagination({
                ...pagination,
                current: 1
            })
        }

    }


    const handleExport = () => {

        let serchParams = form.getFieldsValue()
        let params: any = {
            page: pagination.current,
            pageSize: pagination.pageSize,
            ...serchParams,
            birthDate: serchParams.birthDate?.length === 2 ? serchParams.birthDate.map((item: any) => dayjs(item).format('YYYY-MM-DD')) : []
        }
        getExcel(params).then(res => {

        })

    }

    const handleReset = () => {
        form.resetFields()

        if (pagination.current === 1) {
            _getStudentList()
        } else {
            setPagination({
                ...pagination,
                current: 1
            })
        }
    }

    const handleOnValuesChange = (changedValues: any, allValues: any) => {
        console.log(changedValues, allValues)
    }

    const handleAdd = () => {
        console.log('新增')
        setAddModalvisible(true)
    }

    return (
        <div className='px-6 py-4'>
            <div className='mb-6'>



                <Form
                    layout="horizontal"
                    form={form}
                    initialValues={initSearchParams}
                    className='form_container'
                    onValuesChange={handleOnValuesChange}
                    size="middle"
                >
                    <Row gutter={[16, 0]}>
                        <Col xxl={5} xl={6} lg={8} md={12} sm={24}>
                            <Form.Item label="姓名" name="name">
                                <Input placeholder="请输入姓名" />
                            </Form.Item>
                        </Col>
                        <Col xxl={5} xl={6} lg={8} md={12} sm={24}>
                            <Form.Item label="学号" name="studentNo">
                                <Input placeholder="请输入学号" />
                            </Form.Item>
                        </Col>
                        <Col xxl={5} xl={6} lg={8} md={12} sm={24}>
                            <Form.Item label="班级" name="classId">
                                <Select
                                    placeholder="请选择班级"
                                    style={{ width: '100%' }}
                                    allowClear
                                    options={classOptions}
                                />
                            </Form.Item>
                        </Col>
                        <Col xxl={5} xl={6} lg={8} md={12} sm={24}>
                            <Form.Item label="出生日期" name="birthDate">
                                <RangePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <div className='flex flex-wrap gap-3 justify-end'>
                                <Button type="primary" onClick={handleSearch}>查询</Button>
                                <Button onClick={handleReset}>重置</Button>
                                <PermissionButton permission="student:add" onClick={handleAdd}>新增</PermissionButton>
                                <Upload
                                    showUploadList={false}
                                    accept=".xlsx, .xls"
                                    customRequest={async (options: any) => {
                                        const { file, onSuccess, onError } = options;
                                        const formData = new FormData();
                                        formData.append('file', file as any);
                                        try {
                                            const res = await uploadExcel(formData);
                                            onSuccess(res);
                                            message.success('上传成功');
                                            _getStudentList();
                                        } catch (error) {
                                            onError(error);
                                            message.error('上传失败');
                                        }
                                    }}
                                >
                                    <PermissionButton permission="sys:upload" type="link">上传</PermissionButton>
                                </Upload>
                                <PermissionButton permission="sys:export" type="link" onClick={handleExport}>导出</PermissionButton>
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


            <AddAndEdit visible={addModalvisible} setVisible={setAddModalvisible} search={handleSearch} curRow={curRow} />
        </div>
    )
}


export default StudentList