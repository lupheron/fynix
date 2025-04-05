import { Button, Form, Input, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function EditUser({ isEditing, handleClose, selectedItem, handleUpdate }) {
    const [form] = useForm();
    const { t } = useTranslation(); // Initialize the translation function

    useEffect(() => {
        if (selectedItem) {
            form.setFieldsValue(selectedItem);
        }
    }, [selectedItem]);

    return (
        <Modal open={isEditing} onCancel={handleClose} footer={false} title={t('user.user_edit_title')}>
            <Form onFinish={(values) => { handleUpdate(values, selectedItem.id); form.resetFields(); }} layout="vertical" form={form}>
                <Form.Item name="name" label={t('user.name')} rules={[{ required: true, message: t('user.name_required') + "!" }]}>
                    <Input type="text" />
                </Form.Item>
                <Form.Item name="email" label={t('user.email')} rules={[{ required: true, message: t('user.email_required') + "!" }]}>
                    <Input type="email" />
                </Form.Item>
                <Form.Item name="role" label={t('user.role')} rules={[{ required: true, message: t('user.role_required') + "!" }]}>
                    <Input type="text" />
                </Form.Item>
                <Form.Item name="phone" label={t('user.phone')} rules={[{ required: true, message: t('user.phone_required') + "!" }]}>
                    <Input type="text" />
                </Form.Item>
                <Form.Item name="password" label={t('user.password')} rules={[{ required: true, message: t('user.password_required') + "!" }]}>
                    <Input type="password" />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">{t('save')}</Button>
                    <Button style={{ marginLeft: "10px" }} onClick={handleClose}>{t('cancel')}</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default EditUser;
