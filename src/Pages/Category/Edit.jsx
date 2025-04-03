import { Button, Col, Form, Input, Modal, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function Edit({ isEditing, handleClose, selectedItem, handleUpdate }) {
    const { t } = useTranslation(); // Initialize the translation function
    const [form] = useForm();

    useEffect(() => {
        if (selectedItem) {
            form.setFieldsValue(selectedItem);
        }
    }, [selectedItem]);
    return (
        <div>
            <Modal width={800} open={isEditing} onCancel={handleClose} footer={false} title={t('categories.category_edit_title')}>
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
                            <Form.Item name="name" label={t('categories.category_name')} rules={[{ required: true, message: t('categories.category_name') + "!" }]}>
                                <Input type="text" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">{t('save')}</Button>
                        <Button style={{ marginLeft: "10px" }} onClick={handleClose}>{t('cancel')}</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Edit;