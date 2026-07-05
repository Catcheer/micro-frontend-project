import React from 'react';

import { 
    getClassList,
    addClass,
    editClass,
    deleteClass,
    } from '@/api/class'
// import { useStudentClass } from '@/pages/student/hooks/useStudentClass'

import { useTeacherList } from '@/hooks/useTeacher'

import './index.less'

import PageComponent from '@/components/PageComponent'



const ClassList: React.FC = () => {


    // const classOptions = useStudentClass() || []
    const teachers = useTeacherList()
    


    const pageSchema: PageSchema = {
        searchFields:[
            {
                label: '班级名称',
                name: 'className',
                type: 'input',
                placeholder: '请输入班级名称',
            },

            // {
            //     label: '班主任姓名',
            //     name: 'headTeacherName',
            //     type: 'input',
            //     placeholder: '请输入班主任姓名',
            // },
            
            
        ],
        initSearchParams : {
            name: '',
            gender: '',
            studentNo: '',
            birthDate: []
        },

        editFields:[{
             label:'班级名称',
             name:'className',
             rules:[{ max: 5, message: '班级名称最多5个字符' }],
             type:'input',
            },
          
           {
            label:'语文老师',
            name:'chineseTeacherId',
            type:'select',
            options: teachers.cheinese,
            placeholder:'请选择语文老师',
           },
           {
            label:'数学老师',
            name:'mathTeacherId',
            type:'select',
            options: teachers.math,
            placeholder:'请选择数学老师',
           },
           {
            label:'英语老师',
            name:'englishTeacherId',
            type:'select',
            options: teachers.english,
            placeholder:'请选择英语老师',
           },
           {
            label:'状态',
            name:'status',
            type:'select',
            options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }],
            placeholder:'请选择状态',
           },
           {
            label:'描述',
            name:'description',
            type:'textarea',
            placeholder:'请输入描述',
           }
        ],
        columns : [
            {
                title: '班级名称',
                dataIndex: 'className',
                key: 'className',
            },
            // {
            //     title: '班主任姓名',
            //     dataIndex: 'headTeacherName',
            //     key: 'headTeacherName',
            // },
            {
                title: '语文老师',
                dataIndex: 'chineseTeacherName',
                key: 'chineseTeacherName',
            },
            {
                title: '数学老师',
                dataIndex: 'mathTeacherName',
                key: 'mathTeacherName',
               
                
            },
            {
                title: '英语老师',
                dataIndex: 'englishTeacherName',
                key: 'englishTeacherName',
    
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                dict: 'classStatus',
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
                      permission: "class:update"
                    },
                    {
                      text: "删除",
                      action: "delete",
                      permission: "class:delete",
                      danger: true
                    }
                  ]
            },
        ],


        toolbar: {
            add: true,
            addPermission: "student:add",
          
          }
    }


  

    
    return (
        <PageComponent 
        pageSchema={pageSchema}
       
        getListApi={getClassList}
        deleteApi={(id: string) => deleteClass(Number(id))}
        
        addApi={addClass}
        editApi={editClass}
        />
    )
}


export default ClassList