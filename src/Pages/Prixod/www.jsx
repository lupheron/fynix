import { Button, Card, Col, Divider, Drawer, Dropdown, Form, Input, Row, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useComing } from './ComingStore';
import axios from 'axios';
import { useProducts } from '../Params/Products/ProductStore';
import { PlusOutlined } from '@ant-design/icons';
import Add from '../Params/Products/Add';

function Coming(props) {
    let { searchItem, sitems, scolumns, selected, setSelected, create } = useComing()
    let { getProducts, products } = useProducts()
    let [open, setOpen] = useState(false)
    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            <Drawer title="Maxsulot qo'shish" width={"80%"} open={open} onClose={() => setOpen(false)}>
                <Add />
            </Drawer>
            <Row gutter={16}>
                <Col span={18}>
                    <Form>
                        <Row gutter={16}>
                            <Col span={2}>
                                <Button onClick={() => setOpen(true)} style={{ backgroundColor: 'indigo' }} type="primary" block icon={<PlusOutlined />} />
                            </Col>
                            <Col span={20}>
                                <Dropdown
                                    menu={{
                                        items: sitems.map((item) => ({
                                            key: item.id,
                                            label: item.nameuz,
                                            onClick: () => { setSelected(item); }
                                        })),
                                    }}
                                >
                                    <Form.Item placeholder="Iltimos Tovar nomi, Skladdagi kodi, yoki unikal kodini kiriting" name={'param'}>
                                        <Input onInput={(e) => { searchItem(e.target.value) }} />
                                    </Form.Item>
                                </Dropdown>
                            </Col>
                            <Col span={2}>
                                <Form.Item>
                                    <Button type='primary' htmlType='submit'>Topish</Button>
                                </Form.Item>
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
                                <Form.Item name={'date'} label='Qabul qilingan sanasi'>
                                    <Input type='date' />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={'deliver'} label='Olib keluvchi'>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={'suplier'} label='Kimdan xarid qilindi'>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={'auto'} label='Mashina raqami'>
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item name={'document'} label='Hujjat raqami'>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item>
                            <Button type='primary' htmlType='submit'>Saqlash</Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={6}>
                    <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(2, 1fr)', boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.1)', height: '100%', overflow: 'auto', padding: '10px', alignContent: 'start', borderRadius: '15px' }}>
                        {products.map((item) => (
                            <Card key={item.id} size='small' onClick={() => setSelected(item)} hoverable cover={<img alt="example" src={item.img} />} ><h4>{item.nameuz}</h4></Card>
                        ))}

                    </div>
                </Col>
            </Row>
        </>
    );
}

export default Coming;
