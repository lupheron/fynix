import { Button, Form, Input, Modal, Row, Col } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react';

function EditWarehouse({ isEditing, handleClose, selectedItem, handleUpdate }) {
    const [form] = useForm();

    useEffect(() => {
        if (selectedItem) {
            form.setFieldsValue(selectedItem);
        }
    }, [selectedItem]);

    return (
        <Modal width={800} open={isEditing} onCancel={handleClose} footer={false} title="Mahsulotni Tahrirlash">
            <Form
                onFinish={(values) => {
                    handleUpdate(values);
                    form.resetFields();
                }}
                layout="vertical"
                form={form}
            >
                <Row gutter={16}>
                    <Form.Item hidden name={'id'}>
                        <Input />
                    </Form.Item>
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

export default EditWarehouse;
