import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Input, Radio } from 'antd'


import { getStudentList } from '@/api/student'
import usePagination from '@/hooks/usePagination.tsx'
import AddAndEdit from './addAndEdit.tsx'
import './index.less'





const StudentList: React.FC = () => {
    const initSearchParams = {
        name: '',
        gender: '',
        studentNo: ''
    }
    const [form] = Form.useForm();
    const [tableData, setTableData] = useState([])
    const { pagination, setPagination } = usePagination()





    useEffect(() => {
        _getStudentList()
    }, [pagination.current, pagination.pageSize])




    const _getStudentList = () => {
        let serchParams = form.getFieldsValue()
        let params: any = {
            page: pagination.current,
            pageSize: pagination.pageSize,
            ...serchParams
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
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
        },
    ];


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



    const [addModalvisible, setAddModalvisible] = useState(false)


    const handleAdd = () => {
        console.log('新增')
        setAddModalvisible(true)
    }

    return (
        <div>
            <Form
                layout="inline"
                form={form}
                initialValues={initSearchParams}
                className='form_container'
                onValuesChange={handleOnValuesChange}
            >
                <Form.Item label="姓名" name="name">
                    <Input placeholder="请输入姓名" />
                </Form.Item>
                <Form.Item label="学号" name="studentNo">
                    <Input placeholder="请输入学号" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={handleSearch} className='form_btn_search'>查询</Button>
                    <Button onClick={handleReset} className='form_btn_reset'>重置</Button>
                    <Button onClick={handleAdd} className='form_btn_add'>新增</Button>
                </Form.Item>
            </Form>

            <Table
                dataSource={tableData}
                columns={columns}
                rowKey="id"
                pagination={pagination}
            />
            <AddAndEdit visible={addModalvisible} setVisible={setAddModalvisible} search={handleSearch} />
        </div>
    )
}


export default StudentList