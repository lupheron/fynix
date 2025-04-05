import { Button, Form, Input, Modal, Row, Col, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react';
import { useCategory } from '../Category/CategoryStore';
import { useTranslation } from 'react-i18next';

function Create({ isCreating, handleClose, handleCreate }) {
    let { category, getCategory } = useCategory();
    const { t } = useTranslation(); // Initialize the translation function

    useEffect(() => {
        getCategory();
    }, []);

    const [form] = useForm();

    return (
        <div>
            <Modal width={800} open={isCreating} onCancel={handleClose} footer={false} title={t('materials.material_create_title')}>
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
                            <Form.Item name="name" label={t('materials.material_name')} rules={[{ required: true, message: t('materials.material_name_required') + "!" }]}>
                                <Input type="text" />
                            </Form.Item>
                            <Form.Item name="cat_id" label={t('materials.category_name')} rules={[{ required: true, message: t('materials.category_required') + "!" }]}>
                                <Select
                                    showSearch
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
                        <Button htmlType="submit" type="primary">{t('save')}</Button>
                        <Button style={{ marginLeft: "10px" }} onClick={handleClose}>{t('cancel')}</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Create;
