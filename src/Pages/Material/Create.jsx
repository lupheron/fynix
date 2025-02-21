import { Button, Form, Input, Modal, Row, Col, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react';
import { useCategory } from '../Category/CategoryStore';

function Create({ isCreating, handleClose, handleCreate }) {
    let { category, getCategory } = useCategory();

    useEffect(() => {
        getCategory();
    }, []);

    const [form] = useForm();

    return (
        <div>
            <Modal width={800} open={isCreating} onCancel={handleClose} footer={false} title="Yangi Material Qo'shish">
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
                            <Form.Item name="name" label="Material nomi" rules={[{ required: true, message: "Material nomini kiriting!" }]}>
                                <Input type="text" />
                            </Form.Item>
                            <Form.Item name="cat_id" label="Kategoriya nomi" rules={[{ required: true, message: "Kategoriyani tanlang!" }]}>
                                <Select
                                    showSearch
                                    placeholder="Kategoriyani tanlang"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={category.map((item) => ({
                                        value: item.id,  // Assuming each category has a unique `id`
                                        label: item.name // Assuming `name` represents the category name
                                    }))}
                                />
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
