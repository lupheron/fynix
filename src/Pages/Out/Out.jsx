import { Button, Card, Col, Divider, Form, Input, Row, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useProducts } from '../Products/ProductStore';
import { useOut } from './OutStore';

function Out() {
    let { searchItem, sitems, scolumns, selected, setSelected, create } = useOut()
    let { getProducts, products } = useProducts()
    useEffect(() => {
        getProducts()
    }, [])

    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");


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
                                    placeholder="Iltimos, tovar nomini yoki kodini kiriting"
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
                        columns={scolumns}
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
                                <Form.Item name='day' label='Sotilgan kuni'>
                                    <Input
                                        type="number"
                                        placeholder="Kun"
                                        min="1"
                                        max="31"
                                        onChange={(e) => setDay(e.target.value)}
                                        value={day}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name='month' label='Sotilgan Oyi'>
                                    <Input
                                        type="number"
                                        placeholder="Oy"
                                        min="1"
                                        max="12"
                                        onChange={(e) => setMonth(e.target.value)}
                                        value={month}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name='year' label='Sotilgan Yili'>
                                    <Input
                                        type="number"
                                        placeholder="Yil"
                                        min="1900"
                                        max="2100"
                                        onChange={(e) => setYear(e.target.value)}
                                        value={year}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item>
                            <Button type='primary' htmlType='submit'>Sotish</Button>
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

export default Out;
