import { Button, Form, Input, Modal, Row, Col, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react';
import { useBoxes } from './BoxesStore';
import { useTranslation } from 'react-i18next'; // Import useTranslation

function BoxCreate({ isCreating, handleClose, handleCreate }) {
    const { t } = useTranslation(); // Initialize the translation function
    const [form] = useForm();
    const { section, getSection } = useBoxes(); // Fetch sections

    useEffect(() => {
        getSection(); // Load sections when component mounts
    }, []);

    return (
        <Modal width={800} open={isCreating} onCancel={handleClose} footer={false} title={t('boxes.box_create_title')}>
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
                            label={t('boxes.section_name')}
                            rules={[{ required: true, message: t('boxes.section_name') + "!" }]}
                        >
                            <Select
                                showSearch
                                placeholder={t('boxes.section_name')}
                                optionFilterProp="label"
                                options={section.map((sec) => ({
                                    value: sec.id,
                                    label: sec.sec_name,
                                }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="box_name"
                            label={t('boxes.box_name')}
                            rules={[{ required: true, message: t('boxes.box_name') + "!" }]}
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

export default BoxCreate;