
import {
    Row,
    Col,
    Form,
    Input,
    Card
} from 'antd'





const UserCenter = () => {


    const initialValues = {
        name: 'hallo',
        nickName: 'sss',
        phoneNumber: ''
    }

    const [form] = Form.useForm();

    return <div className="px-8 py-8">
        <div className='flex'>

            <div className='w-80 pr-4 border-r'>
                <div className=''>
                    <img className='w-40 block mx-auto' src="/defaultAvatar.jpg" />
                    <div></div>
                </div>
            </div>

            <Form
                className='pl-4'
                initialValues={initialValues}
            >
                <Row className='pt-4' gutter={30}>
                    <Col span={12}>
                        <Form.Item
                            label="用户名"
                            name="name"
                        >
                            <Input
                                variant="borderless"
                                readOnly
                                placeholder="请输入姓名" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="昵称"
                            name="nickName"
                        >
                            <Input
                                variant="borderless"
                                readOnly
                                placeholder="请输入昵称" />
                        </Form.Item>
                    </Col>



                </Row>
                <Row gutter={30}>

                    <Col span={12}>
                        <Form.Item
                            label="手机号"
                            name="phoneNumber"
                        >
                            <Input
                                variant="borderless"
                                readOnly
                                placeholder="" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="邮箱"
                            name="email"
                        >
                            <Input
                                variant="borderless"
                                readOnly
                                placeholder="" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={30}>

                    <Col span={12}>
                        <Form.Item
                            label="创建时间"
                            name="phoneNumber"
                        >
                            <Input
                                variant="borderless"
                                readOnly
                                placeholder="" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="所属角色"
                            name="email"
                        >
                            <Input
                                variant="borderless"
                                readOnly
                                placeholder="" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={30}>

                    <Col span={12}>
                        <Form.Item
                            label="最后登录时间"
                            name="phoneNumber"
                        >
                            <Input
                                variant="borderless"
                                readOnly
                                placeholder="" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="最后登录ip"
                            name="email"
                        >
                            <Input
                                variant="borderless"
                                readOnly
                                placeholder="" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    </div>
}


export default UserCenter