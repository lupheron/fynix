import { Button, Form, Input, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react';

function EditUser({ isEditing, handleClose, selectedItem, handleUpdate }) {
    const [form] = useForm();

    useEffect(() => {
        if (selectedItem) {
            form.setFieldsValue(selectedItem);
        }
    }, [selectedItem]);

    return (
        <Modal open={isEditing} onCancel={handleClose} footer={false} title="Foydalanuvchini Taxrirlash">
            <Form onFinish={(values) => { handleUpdate(values, selectedItem.id); form.resetFields(); }} layout="vertical" form={form}>
                <Form.Item name="name" label="Ism" rules={[{ required: true, message: "Ismni kiriting!" }]}>
                    <Input type="text" />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, message: "Emailni kiriting!" }, { type: 'email', message: "Email formati noto'g'ri!" }]}>
                    <Input type="email" />
                </Form.Item>
                <Form.Item name="role" label="Rol" rules={[{ required: true, message: "Rolni kiriting!" }]}>
                    <Input type="text" />
                </Form.Item>
                <Form.Item name="phone" label="Telefon raqamingiz" rules={[{ required: true, message: "Telefon Raqamingizni kiriting!" }]}>
                    <Input type="text" />
                </Form.Item>
                <Form.Item name="password" label="Parol" rules={[{ required: true, message: "Parolni kiriting!" }]}>
                    <Input type="password" />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">Saqlash</Button>
                    <Button style={{ marginLeft: "10px" }} onClick={handleClose}>Bekor qilish</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default EditUser;
