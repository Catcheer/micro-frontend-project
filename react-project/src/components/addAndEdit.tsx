import React, { useEffect } from "react";

import { Modal, Form, Input, DatePicker, Select } from 'antd'
import dayjs from "dayjs";





type Props = {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    search: () => void;
    curRow: Student | null;
    editFields: any[];
    addApi: (data: any) => Promise<any>;
    editApi: ( data: any) => Promise<any>;
}




export default function AddAndEdit(props: Props) {
    const { visible, setVisible, search, curRow, editFields, addApi, editApi } = props
    const [form] = Form.useForm();
   
    const EditItemComponent = (item: any) => {
        switch (item.type) {
            case 'input':
                return <Input placeholder={item.placeholder} />
            case 'select':
                return <Select placeholder={item.placeholder} options={item.options || []} />
            case 'DatePicker':
                return <DatePicker placeholder={item.placeholder} />
            default:
                return null
        }
    }


    useEffect(() => {
        if (!visible) {
            return
        }
        if (curRow) {
           


            let obj: Record<string, any> ={
               
            }
          

            for (const item of editFields) {
                if (item.type === 'DatePicker') {
                    obj[item.name] = dayjs(curRow[item.name] as string)
                } else {
                    obj[item.name] = curRow[item.name] 
                }
            }   


            form.setFieldsValue(obj)

        } else {
            form.resetFields()
        }
    }, [visible, curRow, form, editFields])

    const handleCancel = () => {
        setVisible(false)
        form.resetFields()
    }

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const data = {
                ...values,
                ...(curRow ? { id: curRow.id } : {}),
            }

            for (const item of editFields) {
                if (item.type === 'DatePicker') {
                    data[item.name] = dayjs(data[item.name]).format('YYYY-MM-DD')
                }
            }


            if (curRow) {
                data.id = curRow.id
                
                await editApi( data);
            } else {
                await addApi(data);
            }

            setVisible(false)
            form.resetFields()
            search()
        } catch (error) {
            console.log('校验失败', error)
        }
    }
    return (
        <div>
            <Modal
                title={curRow ? '编辑' : '新增'}
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                destroyOnClose
            >
                <Form
                    form={form}
                    className="form_add_student"
                >
                   
                   
                   {editFields.map((item: any) => (
                    <Form.Item
                        key={item.name}
                        label={item.label}
                        name={item.name}
                        rules={item.rules}
                    >
                        {EditItemComponent(item)}
                    </Form.Item>
                    ))}
                </Form>
            </Modal>
        </div>
    )
}

