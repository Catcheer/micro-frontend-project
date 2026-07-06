import React from 'react';

import { 
    getTeacherList,
    addTeacher,
    editTeacher,
    deleteTeacher,
 } from '@/api/teacher'

import './index.less'

import PageComponent from '@/components/PageComponent'

import { useSubjectList } from '@/hooks/useSubjectList'



const TeacherList: React.FC = () => {
    const subjectList = useSubjectList()


    const pageSchema: PageSchema = {
        searchFields:[
            {
                label: '姓名',
                name: 'name',
                type: 'input',
                placeholder: '请输入姓名',
            },
            {
                label: '工号',
                name: 'teacherNo',
                type: 'input',
                placeholder: '请输入工号',
            },
            {
                label: '手机号',
                name: 'phone',
                type: 'input',
                placeholder: '请输入手机号',
            },
            {
                label:'任教科目',
                name:'subjectId',
                type:'select',
                options:subjectList,
                placeholder:'请选择任教科目',
               },
            {
                label:'状态',
                name: 'status',
                type: 'select',
                placeholder: '请选择状态',
                options: [{ label: '在职', value: 1 }, { label: '离职', value: 2 }],
            }

            
        ],
        initSearchParams : {
            name: '',
            teacherNo: '',
            phone: '',
            status: null,
          
        },

        editFields:[{
             label:'姓名',
             name:'name',
             rules:[{ max: 5, message: '姓名最多5个字符' }],
             type:'input',
            },
           {
            label:'工号',
            name:'teacherNo',
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
            options:[{ label: '男', value: 1 }, { label: '女', value: 2}],
            placeholder:'请选择性别',
           },
           {
            label:'任教科目',
            name:'subjects',
            type:'select',
            mode: 'multiple',
            options:subjectList,
            placeholder:'请选择任教科目',
           },
           
          
           {
            label:'状态',
            name:'status',
            type:'select',
            placeholder:'请选择状态',
            options:[{ label: '在职', value: 1 }, { label: '离职', value: 2 }],
           },
           {
            label:'描述',
            name:'description',
            type:'textarea',
            rules:[{ max: 20, message: '学号最多20个字符' }],
            placeholder:'请输入描述',
           }
        ],
        columns : [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '工号',
                dataIndex: 'teacherNo',
                key: 'teacherNo',
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
                dict: 'gender',
                
            },
            {
                title: '任教科目',
                dataIndex: 'subjectsName',
                key: 'subjectsName',
                // dict: 'subject',
                
            },
            // {
            //     title: '是否是班主任',
            //     dataIndex: 'isHeadTeacher',
            //     key: 'isHeadTeacher',
               
            //     // dict: 'class',
                
            // },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                dict: 'status',
                
            },
            {
                title: '描述',
                dataIndex: 'description',
                key: 'description',
                
            },
            
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
                format: 'YYYY-MM-DD HH:mm:ss',
                
            },
            {
                title: '更新时间',
                dataIndex: 'updateTime',
                key: 'updateTime',
                format: 'YYYY-MM-DD HH:mm:ss',
               
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
                      permission: "teacher:update"
                    },
                    {
                      text: "删除",
                      action: "delete",
                      permission: "teacher:delete",
                      danger: true
                    }
                  ]
            },
        ],


        toolbar: {
            add: true,
            addPermission: "teacher:add",
          }
    }


  

    
    return (
        <PageComponent 
        pageSchema={pageSchema}
       
        getListApi={getTeacherList}
        deleteApi={(id: string) => deleteTeacher(Number(id))}
       
        addApi={addTeacher}
        editApi={editTeacher}
        />
    )
}


export default TeacherList