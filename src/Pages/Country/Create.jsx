import { Button, Form, Input, Modal, Row, Col } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react';

function Create({ isCreating, handleClose, handleCreate }) {
    const [form] = useForm();
    return (
        <div>
            <Modal width={800} open={isCreating} onCancel={handleClose} footer={false} title="Yangi Davlat Qo'shish">
                <Form
                    onFinish={(values) => {
                        handleCreate(values);
                        form.resetFields();
                    }}
                    layout="vertical"
                    form={form}
                >
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item name="name" label="Davlat nomi" rules={[{ required: true, message: "Davlat nomini kiriting!" }]}>
                                <Input type="text" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">Saqlash</Button>
                        <Button style={{ marginLeft: "10px" }} onClick={handleClose}>Bekor qilish</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Create;