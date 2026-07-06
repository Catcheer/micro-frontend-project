import React from 'react';

import { 
    getOptionLogList,
   
 } from '@/api/optionLog'

import './index.less'

import PageComponent from '@/components/PageComponent'




const OperationLog: React.FC = () => {


    const pageSchema: PageSchema = {
        editFields: [],
        searchFields:[
            {
                label: '操作人',
                name: 'username',
                type: 'input',
                placeholder: '请输入姓名',
            },
            {
                label: '模块',
                name: 'module',
                
                type: 'input',
                placeholder: '请输入模块',
            },
            {
                label: '操作时间',
                name: 'createTime',
                type:'RangePicker',
                placeholder:'请选择操作时间',
            },
            
           

            
        ],
        initSearchParams : {
            username: '',
            module: '',
            createTime: [],
          
        },

       
        columns : [
            {
                title: '操作人',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '模块',
                dataIndex: 'module',
                key: 'module',
                
            },
           
            {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
              
                
            },
            {
                title: '操作时间',
                dataIndex: 'createTime',
                key: 'createTime',
                width: 180,
                format: 'YYYY-MM-DD HH:mm:ss',
                
            },
            {
                title: '请求方式',
                dataIndex: 'requestMethod',
                key: 'requestMethod',
                
            },
            {
                title: 'url',
                dataIndex: 'requestUri',
                key: 'requestUri',
              
               
            },
            
            {
                title: '请求参数',
                dataIndex: 'params',
                key: 'params',
                width: 150,
                ellipsis: true,
                showOverflowTooltip: true,
                
            },
            {
                title: '请求结果',
                dataIndex: 'result',
                key: 'result',
                width: 150,
                ellipsis: true,
                showOverflowTooltip: true,
               
                
            },
            {
                title: '接口耗时',
                dataIndex: 'executionTime',
                key: 'executionTime',
               
                
            },
           
            
        ],


        
    }


  

    
    return (
        <PageComponent 
        pageSchema={pageSchema}
       
        getListApi={getOptionLogList}
        
        />
    )
}


export default OperationLog