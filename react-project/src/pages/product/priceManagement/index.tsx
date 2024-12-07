import React ,{useState} from "react";
import type { FormProps } from "antd";
import { Button, Card, Form, Input, Select, Table,Modal   } from "antd";


type FieldType = {
  username?: string;
  password?: string;
  order?: string;
};
const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};


const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

export default function ProductPriceManage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
const handleClickAdd = () => {
  setIsModalOpen(true)
}
const handleOk = () => {
  setIsModalOpen(false);
};

const handleCancel = () => {
  setIsModalOpen(false);
};

  return (
    <>
      <Card bordered={false}>
        <Form
          layout={"inline"}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: "100%" }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input style={{ width: "220px" }} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password style={{ width: "220px" }} />
          </Form.Item>
          <Form.Item<FieldType> label="订单号" name="order">
            <Select
              style={{ width: "220px" }}
              defaultValue="lucy"
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
                { value: "disabled", label: "Disabled", disabled: true },
              ]}
            />
          </Form.Item>

          <Form.Item label={null} style={{ width: "220px" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    <div >
      <Button type="primary" onClick={handleClickAdd}>新增</Button>
    </div>
      <div style={{padding:'0px 20px'}}>
      <Table size="middle"  dataSource={dataSource} columns={columns} />
      </div>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}
