import { Button, Form, Input, Modal, Row, Col } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react';

function CreateWarehouse({ isCreating, handleClose, handleCreate }) {
    const [form] = useForm();

    return (
        <Modal width={800} open={isCreating} onCancel={handleClose} footer={false} title="Yangi Mahsulot Qo'shish">
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
                        <Form.Item name="name" label="Sklad nomi" rules={[{ required: true, message: "Mahsulot nomini kiriting!" }]}>
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
    );
}

export default CreateWarehouse;
