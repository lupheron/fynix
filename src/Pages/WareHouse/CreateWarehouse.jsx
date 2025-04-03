import { Button, Form, Input, Modal, Row, Col } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react';
import { useTranslation } from 'react-i18next';

function CreateWarehouse({ isCreating, handleClose, handleCreate }) {
    const [form] = useForm();
    const { t } = useTranslation(); // Get translation function

    return (
        <Modal width={800} open={isCreating} onCancel={handleClose} footer={false} title={t('warehouses.warehouse_create_title')}>
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
                        <Form.Item name="name" label={t('warehouses.warehouse_name')} rules={[{ required: true, message: t('warehouses.warehouse_name') + "!" }]}>
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
    );
}

export default CreateWarehouse;
