import React, { useEffect, useState } from 'react';
import { Table } from 'antd'


import { getStudentList } from '@/api/student'
import usePagination from '@/hooks/usePagination.tsx'
const StudentList: React.FC = () => {

    const [tableData, setTableData] = useState([])
    const { pagination, setPagination } = usePagination()

    useEffect(() => {
        _getStudentList()
    }, [pagination.current, pagination.pageSize])



    const _getStudentList = () => {
        let params: any = {
            page: pagination.current,
            pageSize: pagination.pageSize
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




    return (
        <div>
            <Table
                dataSource={tableData}
                columns={columns}
                rowKey="id"
                pagination={pagination}
            />
        </div>
    )
}


export default StudentList