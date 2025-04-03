import { Button, Form, Input, Modal, Row, Col } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function SecEdit({ isEditing, handleClose, selectedItem, handleUpdate }) {
    const [form] = useForm();
    const { t } = useTranslation(); // Initialize the translation function

    useEffect(() => {
        if (selectedItem) {
            form.setFieldsValue(selectedItem);
        }
    }, [selectedItem]);
    return (
        <div>
            <Modal width={800} open={isEditing} onCancel={handleClose} footer={false} title={t('sections.section_edit_title')}>
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
                            <Form.Item name="sec_name" label={t('sections.section_name')} rules={[{ required: true, message: t('sections.section_name') + "!" }]}>
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

export default SecEdit;