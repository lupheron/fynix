import { Button, Form, Input, Modal, Row, Col, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
import { useProducts } from '../Products/ProductStore';

function CreatePrixod({ isCreating, handleClose, handleCreate }) {
    const [form] = useForm();
    const [summa, setSumma] = useState(0);
    const { products, getProducts } = useProducts(); // Fetch warehouses

    const handleValuesChange = (_, allValues) => {
        const price = allValues.price || 0;
        const count = allValues.count || 0;
        setSumma(price * count);
        form.setFieldsValue({ summa: price * count });
    };

    useEffect(() => {
        getProducts(); // Load warehouses when component mounts
    }, []);
    return (
        <Modal width={800} open={isCreating} onCancel={handleClose} footer={false} title="Yangi Bo'lim Qo'shish">
            <Form
                onValuesChange={handleValuesChange}
                onFinish={(values) => {
                    handleCreate(values);
                    setSumma(0);
                    form.resetFields();
                }}
                layout="vertical"
                form={form}
            >
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="pr_id"
                            label="Mahsulot nomi"
                            rules={[{ required: true, message: "Mahsulot nomini tanlang!" }]}
                        >
                            <Select
                                showSearch
                                placeholder="Mahsulotni tanlang"
                                optionFilterProp="label"
                                options={products.map((pr) => ({
                                    value: pr.id,
                                    label: pr.name,
                                }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="date"
                            label="Keltirilgan kuni"
                            rules={[{ required: true, message: "Keltirilgan kunni kiriting!" }]}
                        >
                            <Input type="date" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="supplier"
                            label="Yetkazuvchi"
                            rules={[{ required: true, message: "Keltiruvchini kiriting!" }]}
                        >
                            <Input type="text" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="price"
                            label="Mahsulot narxi"
                            rules={[{ required: true, message: "Mahsulot narxini tanlang!" }]}
                        >
                            <Input type='number' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="count"
                            label="Mahsulot soni"
                            rules={[{ required: true, message: "Mahsulot sonini kiriting!" }]}
                        >
                            <Input type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="summa"
                            label="Summa"
                            rules={[{ required: true, message: "Mahsulot summasini kiriting!" }]}
                        >
                            <Input type="text" disabled value={summa} />
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

export default CreatePrixod;