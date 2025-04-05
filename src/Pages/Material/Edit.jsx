import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react';
import { useCategory } from '../Category/CategoryStore';
import { useTranslation } from 'react-i18next';

function Edit({ isEditing, handleClose, selectedItem, handleUpdate }) {
    const [form] = useForm();
    let { category, getCategory } = useCategory();
    const { t } = useTranslation(); // Initialize the translation function

    useEffect(() => {
        getCategory();
    }, []);

    useEffect(() => {
        if (selectedItem) {
            form.setFieldsValue(selectedItem);
        }
    }, [selectedItem]);
    return (
        <div>
            <Modal width={800} open={isEditing} onCancel={handleClose} footer={false} title={t('materials.material_edit_title')}>
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
                        <Button htmlType="submit" type="primary">Saqlash</Button>
                        <Button style={{ marginLeft: "10px" }} onClick={handleClose}>Bekor qilish</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Edit;