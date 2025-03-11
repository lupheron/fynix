import { Button, Form, Input, Modal, Row, Col, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect } from "react";

function Edit({ isEditing, handleClose, selectedItem, handleUpdate }) {
    const [form] = useForm();

    useEffect(() => {
        if (selectedItem) {
            const price = parseFloat(selectedItem.price) || 0;
            const count = parseFloat(selectedItem.count) || 0;
            const summa = price * count;

            form.setFieldsValue({ ...selectedItem, summa: summa || 0 });
        }
    }, [selectedItem]);


    const handleValuesChange = (_, allValues) => {
        const price = parseFloat(allValues.price) || 0;
        const count = parseFloat(allValues.count) || 0;
        const summa = price * count;

        form.setFieldsValue({ summa });
    };

    return (
        <Modal width={800} open={isEditing} onCancel={handleClose} footer={false} title="Kirimni Tahrirlash">
            <Form
                onFinish={(values) => {
                    handleUpdate(values);
                    form.resetFields();
                }}
                layout="vertical"
                form={form}
                onValuesChange={handleValuesChange}
            >
                <Row gutter={16}>
                    <Form.Item hidden name="id">
                        <Input />
                    </Form.Item>
                    <Form.Item hidden name="in_id">
                        <Input />
                    </Form.Item>
                    <Col span={8}>
                        <Form.Item name="count" label="Soni" rules={[{ required: true, message: "Mahsulot sonini kiriting!" }]}>
                            <Input type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="price" label="Narxi" rules={[{ required: true, message: "Mahsulot narxini kiriting!" }]}>
                            <Input type="number" disabled />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="summa" label="Summasi">
                            <Input type="number" disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item name="status" label="Holati" rules={[{ required: true, message: "Kirim holatini kiriting!" }]}>
                            <Select
                                showSearch
                                placeholder="Holatni tanlang"
                                options={[
                                    { value: 1, label: "Mavjud" },
                                    { value: 0, label: "O'chirilgan" }
                                ]}
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
    );
}

export default Edit;