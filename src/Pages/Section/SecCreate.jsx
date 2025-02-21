import { Button, Form, Input, Modal, Row, Col, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react';
import { useSection } from './SectionStore';

function SecCreate({ isCreating, handleClose, handleCreate }) {
    const [form] = useForm();
    const { warehouse, getWarehouse } = useSection(); // Fetch warehouses

    useEffect(() => {
        getWarehouse(); // Load warehouses when component mounts
    }, []);

    return (
        <Modal width={800} open={isCreating} onCancel={handleClose} footer={false} title="Yangi Bo'lim Qo'shish">
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
                        <Form.Item
                            name="w_id"
                            label="Sklad nomi"
                            rules={[{ required: true, message: "Sklad nomini tanlang!" }]}
                        >
                            <Select
                                showSearch
                                placeholder="Skladni tanlang"
                                optionFilterProp="label"
                                options={warehouse.map((wh) => ({
                                    value: wh.id, // Send ID instead of name
                                    label: wh.name,
                                }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="sec_name"
                            label="Bo'lim nomi"
                            rules={[{ required: true, message: "Bo'lim nomini kiriting!" }]}
                        >
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

export default SecCreate;
