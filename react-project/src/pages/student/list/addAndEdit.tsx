import React, { useEffect } from "react";

import { Modal, Form, Input, DatePicker, Select } from 'antd'
import dayjs from "dayjs";

import { addStudent, editStudent } from '@/api/student'
import { useStudentClass } from '@/pages/student/hooks/useStudentClass'

const genderOptions = [
    { value: 1, label: '男' },
    { value: 2, label: '女' },
]

type Props = {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    search: () => void;
    curRow: Student | null;
}

export default function AddAndEdit(props: Props) {
    const { visible, setVisible, search, curRow } = props
    const [form] = Form.useForm();
    const classList = useStudentClass() || []

    useEffect(() => {
        if (!visible) {
            return
        }
        if (curRow) {
            form.setFieldsValue({
                name: curRow.name,
                studentNo: curRow.studentNo,
                phone: curRow.phone,
                gender: curRow.gender != null ? Number(curRow.gender) : undefined,
                classId: curRow.classId,
                birthday: curRow.birthday ? dayjs(curRow.birthday) : undefined,
            })
        } else {
            form.resetFields()
        }
    }, [visible, curRow, form])

    const handleCancel = () => {
        setVisible(false)
        form.resetFields()
    }

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const birthday = values.birthday ? dayjs(values.birthday).format('YYYY-MM-DD') : '';
            const data = {
                ...values,
                birthday,
                ...(curRow ? { id: curRow.id } : {}),
            }

            if (curRow) {
                await editStudent(data);
            } else {
                await addStudent(data);
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
                    <Form.Item
                        label="姓名"
                        name="name"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        rules={[{ max: 5, message: '姓名最多5个字符' }]}
                    >
                        <Input placeholder="请输入姓名" />
                    </Form.Item>
                    <Form.Item
                        label="学号"
                        name="studentNo"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        rules={[{ max: 10, message: '学号最多10个字符' }]}
                    >
                        <Input placeholder="请输入学号" />
                    </Form.Item>
                    <Form.Item
                        label="手机号"
                        name="phone"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        rules={[{ pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }]}
                    >
                        <Input placeholder="请输入手机号" />
                    </Form.Item>
                    <Form.Item label="性别" name="gender" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                        <Select placeholder="请选择性别" options={genderOptions} />
                    </Form.Item>
                    <Form.Item label="班级" name="classId" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                        <Select
                            placeholder="请选择班级"
                            options={[...classList]}
                            fieldNames={{
                                label: 'className',
                                value: 'id',
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="出生年月" name="birthday" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                        <DatePicker placeholder="请选择出生年月" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

