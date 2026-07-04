import {  Button, Form, Input, DatePicker,  Upload, Select, Row, Col, FormInstance } from 'antd'

import { PermissionButton } from '@/components/Permission';


const { RangePicker } = DatePicker;


interface SearchFormProps {
    
    form: FormInstance<any>;
    searchFields: any[];
    initSearchParams: any;
   
    handleSearch: () => void;
    handleReset: () => void;
  
    handleAdd: () => void;
    handleImport: (options:any) => Promise<void>;
    handleExport: () => void;
    toolbar: {
        add: boolean;
        import: boolean;
        export: boolean;
        importPermission?: string;
        exportPermission?: string;
        addPermission?: string;
    }
}


const SearchForm = ({ form, 
    searchFields, 
    initSearchParams,
    handleSearch,
    handleReset,
    handleAdd,
    handleImport,
    handleExport,
    toolbar}: SearchFormProps) => {
   

    const onSearch = () => {
        handleSearch()

    }

    const onReset = () => {

        handleReset()
    }

    const onAdd = () => {
        handleAdd()
    }

    const onImport = () => {
        handleImport(options)
    }

    const onExport = () => {
        handleExport()
    }


    
    
    const SearchItemComponent = (item: any) => {
        switch (item.type) {
            case 'input':
                return <Input placeholder={item.placeholder} />
            case 'select':
                return <Select placeholder={item.placeholder} options={item.options || []} />
            case 'RangePicker':
                return <RangePicker placeholder={item.placeholder} />
            default:
                return null
        }
    }



  return (
    <Form
    layout="horizontal"
    form={form}
    initialValues={initSearchParams}
    className='form_container'
    size="middle"
>
    <Row gutter={[16, 0]}>

        {searchFields && searchFields.length > 0 && searchFields.map((item: any) => (
            <Col xxl={5} xl={6} lg={8} md={12} sm={24} key={item.name}>
                <Form.Item label={item.label} name={item.name}>
                    {SearchItemComponent(item)}
                </Form.Item>
            </Col>
        ))}

        
        <Col span={24}>
            <div className='flex flex-wrap gap-3 justify-end'>
                <Button type="primary" onClick={onSearch}>查询</Button>
                <Button onClick={onReset}>重置</Button>
                <PermissionButton permission={toolbar.addPermission || ''} onClick={onAdd}>新增</PermissionButton>
                {toolbar.import &&   <Upload
                showUploadList={false}
            customRequest={handleImport}
        >
            <PermissionButton permission={toolbar.importPermission || ''} type="primary" onClick={onImport}>导入</PermissionButton>
        </Upload>}
                {toolbar.export && <PermissionButton permission={toolbar.exportPermission || ''} type="primary" onClick={onExport}>导出</PermissionButton>}
            </div>
        </Col>
    </Row>
</Form>  );
};

export default SearchForm;