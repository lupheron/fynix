import { Button, Form, Input, Modal, Row, Col, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react';
import { useSection } from './SectionStore';
import { useTranslation } from 'react-i18next';

function SecCreate({ isCreating, handleClose, handleCreate }) {
    const [form] = useForm();
    const { warehouse, getWarehouse } = useSection(); // Fetch warehouses
    const { t } = useTranslation(); // Initialize the translation function

    useEffect(() => {
        getWarehouse(); // Load warehouses when component mounts
    }, []);

    return (
        <Modal width={800} open={isCreating} onCancel={handleClose} footer={false} title={t('sections.section_create_title')}>
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
                            label={t('sections.section_name')}
                            rules={[{ required: true, message: t('sections.section_name') + "!" }]}
                        >
                            <Select
                                showSearch
                                placeholder={t('sections.warehouse_name')}
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
                            label={t('sections.section_name')}
                            rules={[{ required: true, message: t('sections.section_name') + "!" }]}
                        >
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

export default SecCreate;
