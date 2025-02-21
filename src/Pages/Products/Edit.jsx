import { Button, Form, Input, Modal, Row, Col, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
import { useBoxes } from '../Boxes/BoxesStore';
import { useSection } from '../Section/SectionStore';
import { useWarehouse } from '../WareHouse/Wareh';
import { useMaterial } from '../Material/MaterialStore';
import { useCategory } from '../Category/CategoryStore';
import { useCountry } from '../Country/CountryStore';

function EditProduct({ isEditing, handleClose, selectedItem, handleUpdate }) {
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
        const calculatedSumma = price * count;
        setSumma(calculatedSumma);
        form.setFieldsValue({ summa: calculatedSumma });
    };

    return (
        <Modal width={800} open={isEditing} onCancel={handleClose} footer={false} title="Mahsulotni Tahrirlash">
            <Form
                onValuesChange={handleValuesChange}
                onFinish={(values) => {
                    handleUpdate({ ...values, id: selectedItem.id }); // Ensure ID is passed
                    form.resetFields();
                    setSumma(0);
                }}
                layout="vertical"
                form={form}
            >

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item name="name" label="Mahsulot nomi" rules={[{ required: true, message: "Mahsulot nomini kiriting!" }]} >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="price" label="Mahsulot narxi" rules={[{ required: true, message: "Narxni kiriting!" }]} >
                            <Input type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="count" label="Mahsulot soni" rules={[{ required: true, message: "Sonini kiriting!" }]} >
                            <Input type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="summa" label="Mahsulot summasi">
                            <Input type="number" disabled value={summa} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item name="country" label="Ishlab chiqarilgan joyi" rules={[{ required: true, message: "Ishlab chiqarilgan joyni kiriting!" }]} >
                            <Select
                                showSearch
                                placeholder="Davlatni tanlang"
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
                            label="Mahsulot kategoriyasi"
                            rules={[{ required: true, message: "Mahsulot kategoriyasini kiriting!" }]}
                        >
                            <Select
                                showSearch
                                placeholder="Kategoriyani tanlang"
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
                            label="Mahsulot materiali"
                            rules={[{ required: true, message: "Mahsulot materialini kiriting!" }]}
                        >
                            <Select
                                showSearch
                                placeholder={selectedCategory ? "Materialni tanlang" : "Avval kategoriyani tanlang"}
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
                        <Form.Item name="warehouse" label="Mahsulot skladi" rules={[{ required: true, message: "Mahsulot skladini kiriting!" }]} >
                            <Select
                                showSearch
                                placeholder="Skladni tanlang"
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
                        <Form.Item name="section" label="Mahsulot bo'limi" rules={[{ required: true, message: "Bo'limni tanlang!" }]} >
                            <Select
                                showSearch
                                onChange={(value) => {
                                    setSelectedSection(value);
                                    form.setFieldsValue({ boxes: undefined });
                                }}
                                placeholder={selectedWarehouse ? "Bo'limni tanlang" : "Avval skladni tanlang"}
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
                        <Form.Item name="box" label="Mahsulot qutisi" rules={[{ required: true, message: "Qutini tanlang!" }]} >
                            <Select
                                showSearch
                                placeholder={selectedSection ? "Qutini tanlang" : "Avval bo'limni tanlang"}
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
                    <Button htmlType="submit" type="primary">Saqlash</Button>
                    <Button style={{ marginLeft: "10px" }} onClick={handleClose}>Bekor qilish</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default EditProduct;
