import { Button, Form, Input, Modal, Row, Col } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react';
import { useTranslation } from 'react-i18next';

function Create({ isCreating, handleClose, handleCreate }) {
    const { t } = useTranslation(); // Initialize the translation function
    const [form] = useForm();
    return (
        <div>
            <Modal width={800} open={isCreating} onCancel={handleClose} footer={false} title={t('countries.country_create_title')}>
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
                            <Form.Item name="name" label="Country name (EN)" rules={[{ required: true, message: "Enter the country name!" }]}>
                                <Input type="text" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="name_ru" label="Имена строны (RU)" rules={[{ required: true, message: "Введите название страны!" }]}>
                                <Input type="text" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="name_uz" label="Davlat nomi (UZ)" rules={[{ required: true, message: "Davlat nomini kiriting!" }]}>
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

export default Create;