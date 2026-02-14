import React, { useState } from "react";

import { Modal, Form, Input } from 'antd'

import { addStudent } from '@/api/student'


type Props = {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    search: () => void;
}

export default function AddAndEdit(props: Props) {
    const { visible, setVisible, search } = props
    const [form] = Form.useForm();


    const [initValue, setInitValue] = useState({
        name: '',
        studentNo: '',
        phone: '',
        gender: '',
        birthday: ''
    })

    const handleOk = () => {
        console.log('ok')
        console.log(form.getFieldsValue())
        addStudent(form.getFieldsValue()).then(res => {
            setVisible(false)
            search()
        })
    }
    return (
        <div>
            <Modal
                title="新增和编辑"
                open={visible}
                onOk={handleOk}
                onCancel={() => { setVisible(false) }}
            >
                <Form
                    form={form}
                    className="form_add_student"
                    initialValues={initValue}
                >
                    <Form.Item label="姓名" name="name" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                        <Input placeholder="请输入姓名" />
                    </Form.Item>
                    <Form.Item label="学号" name="studentNo" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                        <Input placeholder="请输入学号" />
                    </Form.Item>
                    <Form.Item label="手机号" name="phone" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                        <Input placeholder="请输入手机号" />
                    </Form.Item>
                    <Form.Item label="性别" name="gender" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                        <Input placeholder="请输入性别" />
                    </Form.Item>
                    <Form.Item label="班级" name="classId" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                        <Input placeholder="请输入班级" />
                    </Form.Item>
                    <Form.Item label="出生年月" name="birthday" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                        <Input placeholder="请输入出生年月" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

