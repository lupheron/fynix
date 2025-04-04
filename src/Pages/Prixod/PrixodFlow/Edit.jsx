import { Button, Form, Input, Modal, Row, Col, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

function Edit({ isEditing, handleClose, selectedItem, handleUpdate }) {
    const [form] = useForm();
    const { t } = useTranslation(); // Initialize the translation function

    useEffect(() => {
        if (selectedItem) {
            const price = parseFloat(selectedItem.price) || 0;
            const count = parseFloat(selectedItem.count) || 0;
            const summa = price * count;

            form.setFieldsValue({ ...selectedItem, summa: summa || 0 });
        }
    }, [selectedItem]);


    const handleValuesChange = (_, allValues) => {
        const price = parseFloat(allValues.price) || 0;
        const count = parseFloat(allValues.count) || 0;
        const summa = price * count;

        form.setFieldsValue({ summa });
    };

    return (
        <Modal width={800} open={isEditing} onCancel={handleClose} footer={false} title={t('coming.coming_edit')}>
            <Form
                onFinish={(values) => {
                    handleUpdate(values);
                    form.resetFields();
                }}
                layout="vertical"
                form={form}
                onValuesChange={handleValuesChange}
            >
                <Row gutter={16}>
                    <Form.Item hidden name="id">
                        <Input />
                    </Form.Item>
                    <Form.Item hidden name="in_id">
                        <Input />
                    </Form.Item>
                    <Col span={8}>
                        <Form.Item name="count" label={t('products.product_count')} rules={[{ required: true, message: t('products.product_count_required') }]}>
                            <Input type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="price" label={t('products.product_price')} rules={[{ required: true, message: t('products.product_price_required') }]}>
                            <Input type="number" disabled />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="summa" label={t("products.product_summa")}>
                            <Input type="number" disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item name="status" label={t('coming.status')} rules={[{ required: true, message: t('coming.status_required') + " !" }]}>
                            <Select
                                showSearch
                                placeholder={t('coming.status_required')}
                                options={[
                                    { value: 1, label: t("coming.status_1") },
                                    { value: 0, label: t("coming.status_2") }
                                ]}
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
    );
}

export default Edit;