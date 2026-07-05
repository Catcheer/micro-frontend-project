import React, { useEffect, useState ,useCallback} from 'react';
import { Table, Button, Form, message, Upload } from 'antd'



import usePagination from '@/hooks/usePagination.tsx'

import AddAndEdit from '@/components/addAndEdit.tsx'

import dayjs from 'dayjs';

import SearchForm from '@/components/SearchForm'
import { PermissionButton } from './Permission';

import { dictMap } from '@/const/dictMap.ts'


interface ColumnType extends Record<string, any> {
    type?: string
    dict?: keyof typeof dictMap
    format?: string
    actions?: any[]
    title?: string
    dataIndex?: string
    key?: string
}



interface Props {
    pageSchema: any
    getListApi: (params: any) => Promise<any>
    deleteApi: (id: string) => Promise<any>
    exportApi?: (params: any) => Promise<any>
    importApi?: (data: FormData) => Promise<any>
    addApi: (data: any) => Promise<any>
    editApi: ( data: any) => Promise<any>
}




const PageComponent = ({ pageSchema, getListApi, deleteApi, exportApi ,importApi, addApi, editApi}:Props) => {

    const [form] = Form.useForm();
    const [tableData, setTableData] = useState([])
    const { pagination, setPagination } = usePagination()
    

    const handleExport = useCallback(() => {

        let serchParams = form.getFieldsValue()
        let params: any = {
            page: pagination.current,
            pageSize: pagination.pageSize,
            ...serchParams,
            // birthDate: serchParams.birthDate?.length === 2 ? serchParams.birthDate.map((item: any) => dayjs(item).format('YYYY-MM-DD')) : []
        }

        for (const item of pageSchema.searchFields) {
            if (item.type === 'RangePicker') {
                params[item.name] = serchParams[item.name]?.length === 2 ? serchParams[item.name].map((item: any) => dayjs(item).format('YYYY-MM-DD')) : []
            }
            if (item.type === 'DatePicker') {
                params[item.name] = dayjs(serchParams[item.name]).format('YYYY-MM-DD')
            }
        }


        exportApi && exportApi(params).then(res => {

        })

    }, [form, pagination.current])

    

   




    

    const [curRow, setCurRow] = useState<Student | null>(null)

    const [addModalvisible, setAddModalvisible] = useState(false)

    

    useEffect(() => {
        _getPageList();

    }, [pagination.current, pagination.pageSize])

    useEffect(() => {
        if (!addModalvisible) {
            setCurRow(null)
        }
    }, [addModalvisible])


    const _getPageList = () => {
        let serchParams = form.getFieldsValue()
        let params: any = {
            page: pagination.current,
            pageSize: pagination.pageSize,
            ...serchParams,
            // birthDate: serchParams.birthDate?.length === 2 ? serchParams.birthDate.map((item: any) => dayjs(item).format('YYYY-MM-DD')) : []
        }

        for (const item of pageSchema.searchFields) {
            if (item.type === 'RangePicker') {
                params[item.name] = serchParams[item.name]?.length === 2 ? serchParams[item.name].map((item: any) => dayjs(item).format('YYYY-MM-DD')) : []
            }
            if (item.type === 'DatePicker') {
                params[item.name] = dayjs(serchParams[item.name]).format('YYYY-MM-DD')
            }
        }

        getListApi(params).then(res => {
            setTableData(res.list)
            setPagination({
                ...pagination,
                total: res.total
            })
        })
    }






    


    const handleEdit = useCallback((record: Student) => {
        setCurRow(record)
        console.log(record)
        setAddModalvisible(true)
    }, [])

    const handleDelete = (record: any) => {
        console.log(record)
        deleteApi(record.id).then(res => {
            _getPageList()
        })
    }

    
    const handleSearch = useCallback(() => {

        console.log(form.getFieldsValue())

        if (pagination.current === 1) {
            _getPageList()
        } else {
            // 
            setPagination({
                ...pagination,
                current: 1
            })
        }

    }, [form, pagination.current])



    const handleReset = useCallback(() => {
        form.resetFields()

        if (pagination.current === 1) {
            _getPageList()
        } else {
            setPagination({
                ...pagination,
                current: 1
            })
        }
    }, [form, pagination.current])



    const handleAdd = useCallback(() => {
        console.log('新增')
        setAddModalvisible(true)
    }, [])

    const handleUploadExcel =  async (options: any) => {
        const { file, onSuccess, onError } = options;
        const formData = new FormData();
        formData.append('file', file as any);
        try {
            const res = importApi && (await importApi(formData));
            onSuccess(res);
            message.success('上传成功');
            _getPageList();
        } catch (error) {
            onError(error);
            message.error('上传失败');
        }
    }


    const ActionsColumnBuilder = (column: any) => {

        return {
    
            ...column,
    
            render: (_: any, record: any)=>{
    
                return column.actions.map((action: any)=>{
    
                    switch(action.action){
    
                        case "edit":
    
                            return (
                                <PermissionButton
                                    permission={action.permission}
                                    type="link"
                                    onClick={()=>handleEdit(record)}
                                    key={action.action}
                                >
                                    {action.text}
                                </PermissionButton>
                            )
    
                        case "delete":
    
                            return (
                                <PermissionButton
                                    permission={action.permission}
                                    danger={action.danger}
                                    type="link"
                                    onClick={()=>handleDelete(record)}
                                    key={action.action}
                                >
                                    {action.text}
                                </PermissionButton>
                            )
    
                    }
    
                })
    
            }
    
        }
    }


    const DictColumnBuilder = (column: ColumnType) => {
         return {
            ...column,
            render: (text: any, record: any) => {
                
                return column.dict? dictMap[column.dict][text] : text
            }
         }
    }

    const FormatColumnBuilder = (column: ColumnType) => {
        return {
            ...column,
            render: (text: any, record: any) => {
                return column.format? dayjs(text).format(column.format) : text
            }
        }
    }


    const ColumnBilderMap ={

        "actions":ActionsColumnBuilder,
        "dict":DictColumnBuilder,
        "format":FormatColumnBuilder
    }




    const columns = pageSchema.columns.map((column:ColumnType)=> {

        if(column.type === "actions"){

            return ColumnBilderMap[column.type](column)
        }
        if(column.dict){
            return ColumnBilderMap['dict'](column)
        }
        if(column.format){
            return ColumnBilderMap['format'](column)
        }

        return column;

       
      
    
    })

    // console.log('columns', columns)

    return (
        <div className='px-6 py-4'>
            <div className='mb-6'>  


                <SearchForm 
                 searchFields={pageSchema.searchFields}
                 form={form}
                 initSearchParams={pageSchema.initSearchParams}
               
                 handleReset={handleReset}
                 handleSearch={handleSearch}
                 handleAdd={handleAdd}
                toolbar={pageSchema.toolbar}
                handleImport={handleUploadExcel}
                handleExport={handleExport}

                />

            </div>


            <Table
                dataSource={tableData}
                columns={columns}
                rowKey={(record: any) => record.id}
                pagination={pagination}
                size="small"
                bordered
            />


            <AddAndEdit 
            visible={addModalvisible} 
            setVisible={setAddModalvisible} 
            search={handleSearch} 
            curRow={curRow} 
            editFields={pageSchema.editFields}
            addApi={addApi}
            editApi={editApi}
            />
        </div>
    )
}


export default PageComponent