import { Button, Form, Input, Modal, Row, Col, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react';
import { useBoxes } from './BoxesStore';

function BoxCreate({ isCreating, handleClose, handleCreate }) {
    const [form] = useForm();
    const { section, getSection } = useBoxes(); // Fetch warehouses

    useEffect(() => {
        getSection(); // Load warehouses when component mounts
    }, []);
    return (
        <Modal width={800} open={isCreating} onCancel={handleClose} footer={false} title="Yangi Quti Qo'shish">
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
                            name="sec_id"
                            label="Bo'lim nomi"
                            rules={[{ required: true, message: "Bo'lim nomini tanlang!" }]}
                        >
                            <Select
                                showSearch
                                placeholder="Bo'limni tanlang"
                                optionFilterProp="label"
                                options={section.map((sec) => ({
                                    value: sec.id, // Send ID instead of name
                                    label: sec.sec_name,
                                }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="box_name"
                            label="Quti nomi"
                            rules={[{ required: true, message: "Quti nomini kiriting!" }]}
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

export default BoxCreate;