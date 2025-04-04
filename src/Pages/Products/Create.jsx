import { Button, Form, Input, Modal, Row, Col, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
import { useCountry } from '../Country/CountryStore';
import { useCategory } from '../Category/CategoryStore';
import { useMaterial } from '../Material/MaterialStore';
import { useWarehouse } from '../WareHouse/Wareh';
import { useSection } from '../Section/SectionStore';
import { useBoxes } from '../Boxes/BoxesStore';
import { useTranslation } from 'react-i18next';

function CreateProduct({ isCreating, handleClose, handleCreate }) {
    const [form] = useForm();
    const [summa, setSumma] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);
    let { country, getCountry } = useCountry();
    let { category, getCategory } = useCategory();
    let { material, getMaterial } = useMaterial();
    let { warehouse, getWarehouse } = useWarehouse();
    let { section, getSection } = useSection();
    let { boxes, getBoxes } = useBoxes();
    const { t } = useTranslation(); // Initialize the translation function

    useEffect(() => {
        getCountry();
        getCategory();
        getMaterial();
        getWarehouse();
        getSection();
        getBoxes();
    }, []);

    const handleValuesChange = (_, allValues) => {
        const price = allValues.price || 0;
        const count = allValues.count || 0;
        setSumma(price * count);
        form.setFieldsValue({ summa: price * count });
    };

    return (
        <Modal width={1000} open={isCreating} onCancel={handleClose} footer={false} title={t('products.product_create_title')}>
            <Form
                onValuesChange={handleValuesChange}
                onFinish={(values) => {
                    handleCreate(values);
                    form.resetFields();
                    setSumma(0);
                    setSelectedCategory(null);
                    setSelectedWarehouse(null);
                    setSelectedSection(null);
                }}
                layout="vertical"
                form={form}
            >
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item name="name" label={t('products.product_name')} rules={[{ required: true, message: t('products.product_name') + "!" }]} >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="price" label={t('products.product_price_required')} rules={[{ required: true, message: t('products.product_price') + "!" }]} >
                            <Input type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="count" label={t('products.product_count_required')} rules={[{ required: true, message: t('products.product_count') + "!" }]} >
                            <Input type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="summa" label={t('products.product_summa_required')}>
                            <Input type="number" disabled value={summa} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item name="country" label={t('products.country_required')} rules={[{ required: true, message: t('products.country_required') + "!" }]} >
                            <Select
                                showSearch
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={country?.map((item) => ({
                                    value: item.id,
                                    label: item.name
                                }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="category"
                            label={t('products.category_required')}
                            rules={[{ required: true, message: t('products.category_required') + "!" }]}
                        >
                            <Select
                                showSearch
                                onChange={(value) => {
                                    setSelectedCategory(value);
                                    form.setFieldsValue({ material: undefined });
                                }}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={category?.map((item) => ({
                                    value: item.id,
                                    label: item.name
                                }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="material"
                            label={t('products.material_required')}
                            rules={[{ required: true, message: t('products.material_required') + "!" }]}
                        >
                            <Select
                                showSearch
                                disabled={!selectedCategory}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={material?.filter(item => item.cat_id === selectedCategory).map((item) => ({
                                    value: item.id,
                                    label: item.name
                                }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="warehouse"
                            label={t('products.warehouse_required')}
                            rules={[{ required: true, message: t('products.warehouse_required') + "!" }]} >
                            <Select
                                showSearch
                                onChange={(value) => {
                                    setSelectedWarehouse(value);
                                    form.setFieldsValue({ section: undefined });
                                }}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={warehouse?.map((item) => ({
                                    value: item.id,
                                    label: item.name
                                }))}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item name="section"
                            label={t('products.section_required')}
                            rules={[{ required: true, message: t('products.section_required') + "!" }]} >
                            <Select
                                showSearch
                                onChange={(value) => {
                                    setSelectedSection(value);
                                    form.setFieldsValue({ boxes: undefined });
                                }}
                                disabled={!selectedWarehouse}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={section?.filter(item => item.w_id === selectedWarehouse).map((item) => ({
                                    value: item.id,
                                    label: item.sec_name
                                }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="box"
                            label={t('products.box_required')}
                            rules={[{ required: true, message: t('products.box_required') + "!" }]} >
                            <Select
                                showSearch
                                disabled={!selectedSection}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={boxes?.filter(item => item.sec_id === selectedSection).map((item) => ({
                                    value: item.id,
                                    label: item.box_name
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
    );
}

export default CreateProduct;
