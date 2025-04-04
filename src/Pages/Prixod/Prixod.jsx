import { Button, Card, Col, Divider, Form, Input, Row, Select, Table } from 'antd';
import React, { useEffect } from 'react';
import { useComing } from './PrixodStore';
import { useProducts } from '../Products/ProductStore';
import { useTranslation } from 'react-i18next';

function Prixod() {
    let { searchItem, sitems, scolumns, selected, setSelected, create } = useComing()
    let { getProducts, products } = useProducts()
    const { t } = useTranslation(); // Initialize the translation function
    const translatedColumns = scolumns.map(col => ({
        ...col,
        title: t(`products.${col.title.toLowerCase().replace(/\s+/g, '_')}`) // Dynamically translate title
    }));
    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            <Row gutter={16}>
                <Col span={18}>
                    <Form>
                        <Row gutter={16}>
                            <Col span={20}>
                                <Select
                                    showSearch
                                    style={{ width: "100%" }}
                                    placeholder={t("coming.enter_product_data")}
                                    onSearch={(value) => searchItem(value)}
                                    onSelect={(value) => {
                                        const selectedProduct = sitems.find((item) => item.id === value);
                                        if (selectedProduct) {
                                            setSelected(selectedProduct);
                                        }
                                    }}
                                    filterOption={false}
                                >
                                    {sitems.map((item) => (
                                        <Select.Option key={item.id} value={item.id}>
                                            {item.name}
                                        </Select.Option>
                                    ))}
                                </Select>

                            </Col>
                        </Row>
                    </Form>
                    <Divider />
                    <Table
                        columns={translatedColumns}
                        dataSource={selected}
                        rowKey={'id'}
                    />
                    <Divider />
                    <Form layout='vertical' onFinish={(values) => {
                        values.items = selected
                        let summa = selected.reduce((sum, item) => sum + (item.price * item.count), 0)
                        values.summa = summa
                        create(values);
                    }}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name={'date'} label={t("coming.came_date")}>
                                    <Input type='date' />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={'supplier'} label={t("coming.supplier")}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item>
                            <Button type='primary' htmlType='submit'>{t("save")}</Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={6}>
                    <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(2, 1fr)', boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.1)', height: '100%', overflow: 'auto', padding: '10px', alignContent: 'start', borderRadius: '15px' }}>
                        {products.map((item) => (
                            <Card style={{ cursor: 'pointer' }} key={item.id} size='small' onClick={() => setSelected(item)} ><h4>{item.name}</h4></Card>
                        ))}

                    </div>
                </Col>
            </Row>
        </>
    );
}

export default Prixod;
