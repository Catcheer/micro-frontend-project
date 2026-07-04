import React from 'react';

import { getStudentList, deleteStudent, uploadExcel, getExcel, addStudent, editStudent } from '@/api/student'
import { useStudentClass } from '@/pages/student/hooks/useStudentClass'

import './index.less'
import dayjs from 'dayjs';

import PageComponent from '@/components/PageComponent'



interface SearchField {
    label: string;
    name: string;
    type: string;
    placeholder: string;
    options?: any[];
    OtherComponents?: React.ReactNode;
}


interface StudentSchema {
    searchFields: Array<SearchField>;
    initSearchParams: Record<string, any>;
    editFields:Array<Record<string, any>>;
   
    columns: Array<Record<string, any>>;
    toolbar: {
        add: boolean;
        import: boolean;
        export: boolean;
        addPermission?: string;
        importPermission?: string;
        exportPermission?: string;
    }
}





const StudentList: React.FC = () => {


    const classOptions = useStudentClass() || []


    const studentSchema: StudentSchema = {
        searchFields:[
            {
                label: '姓名',
                name: 'name',
                type: 'input',
                placeholder: '请输入姓名',
            },
            {
                label: '学号',
                name: 'studentNo',
                type: 'input',
                placeholder: '请输入学号',
            },
            {
                label: '班级',
                name: 'classId',
                type: 'select',
                placeholder: '请选择班级',
                options: classOptions,
            },
            {
                label: '出生年月',
                name: 'birthDate',
                type: 'RangePicker',
                placeholder: '请选择出生年月',
            },
            
        ],
        initSearchParams : {
            name: '',
            gender: '',
            studentNo: '',
            birthDate: []
        },

        editFields:[{
             label:'姓名',
             name:'name',
             rules:[{ max: 5, message: '姓名最多5个字符' }],
             type:'input',
            },
           {
            label:'学号',
            name:'studentNo',
            rules:[{ max: 10, message: '学号最多10个字符' }],
            type:'input',
           },
           {
            label:'手机号',
            name:'phone',
            rules:[{ pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }],
            type:'input',
           },
           {
            label:'性别',
            name:'gender',
            type:'select',
            options:[{ label: '男', value: '1' }, { label: '女', value: '2' }],
            placeholder:'请选择性别',
           },
           {
            label:'班级',
            name:'classId',
            type:'select',
            options: classOptions,
           },
           {
            label:'出生年月',
            name:'birthday',
            type:'DatePicker',
            placeholder:'请选择出生年月',
           }
        ],
        columns : [
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
                type: 'actions',
                actions: [
                    {
                      text: "编辑",
                      action: "edit",
                      permission: "student:update"
                    },
                    {
                      text: "删除",
                      action: "delete",
                      permission: "student:delete",
                      danger: true
                    }
                  ]
            },
        ],


        toolbar: {
            add: true,
            addPermission: "student:add",
            import: true,
            importPermission: "student:upload",
            export: true,
            exportPermission: "student:export"
          }
    }


  

    
    return (
        <PageComponent 
        pageSchema={studentSchema}
       
        getListApi={getStudentList}
        deleteApi={(id: string) => deleteStudent(Number(id))}
        exportApi={getExcel}
        importApi={uploadExcel}
        addApi={addStudent}
        editApi={editStudent}
        />
    )
}


export default StudentList