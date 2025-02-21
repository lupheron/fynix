import React, { useEffect, useState } from 'react';
import { Button, Flex, Splitter, Switch, Input, Card, Row, Col, Table } from 'antd';
import { useProducts } from '../Products/ProductStore';
import axios from 'axios';

const EditableCell = ({ editing, dataIndex, record, children, ...restProps }) => {
    const [value, setValue] = useState(record?.[dataIndex] ?? ''); // Prevents undefined

    useEffect(() => {
        setValue(record?.[dataIndex] ?? ''); // Updates state when record changes
    }, [record, dataIndex]);

    return (
        <td {...restProps}>
            {editing ? (
                <Input
                    value={value}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        setValue(newValue);
                        if (record) {
                            record[dataIndex] = newValue;

                            // Ensure 'summa' updates correctly when 'count' or 'price' changes
                            if (dataIndex === 'count' || dataIndex === 'price') {
                                record.summa = (Number(record.count) * Number(record.price)).toFixed(2) || 0;
                            }
                        }
                    }}
                />
            ) : (
                children
            )}
        </td>
    );
};

function Cash() {
    const [sizes, setSizes] = useState(['70%', '50%']);
    const [enabled, setEnabled] = useState(true);
    const { products, getProducts } = useProducts();
    const [searchedProduct, setSearchedProduct] = useState([]);
    const [editingKey, setEditingKey] = useState(null);

    useEffect(() => {
        getProducts();
    }, []);

    const isEditing = (record) => record.id === editingKey;

    const edit = (record) => {
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey(null);
    };

    const save = (record) => {
        console.log('Saved record:', record);
        setEditingKey(null);
    };

    const handleSearch = (p) => {
        const searchValue = p.target.value.trim();
        if (searchValue.length === 0) {
            setSearchedProduct([]);
            return;
        }

        if (searchValue.length > 3) {
            axios.get(`/product/${searchValue}`)
                .then(res => {
                    setSearchedProduct(res.data);
                })
                .catch(err => {
                    console.error("Error fetching product:", err);
                });
        }
    };

    const columns = [
        {
            title: 'Maxsulot nomi',
            dataIndex: 'name',
            key: 'name',
            editable: true,
        },
        {
            title: 'Narx',
            dataIndex: 'price',
            key: 'price',
            editable: true,
        },
        {
            title: 'Soni',
            dataIndex: 'count',
            key: 'count',
            editable: true,
        },
        {
            title: 'Summa',
            dataIndex: 'summa',
            key: 'summa',
            render: (_, record) => (record.count * record.price).toFixed(2), // Calculate dynamically
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Button onClick={() => save(record)} type="link">Save</Button>
                        <Button onClick={cancel} type="link">Cancel</Button>
                    </span>
                ) : (
                    <Button disabled={editingKey !== null} onClick={() => edit(record)} type="link">Edit</Button>
                );
            },
        }
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) return col;
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Flex vertical gap="middle">
            <Splitter
                onResize={setSizes}
                style={{
                    height: '70vh',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    padding: 20
                }}
            >
                <Splitter.Panel size={sizes[0]} resizable={enabled}>
                    <Input.Search
                        placeholder='Mahsulot nomini kiriting'
                        style={{ width: '80%' }}
                        autoFocus
                        size='large'
                        onInput={handleSearch}
                    />
                    {searchedProduct.length > 0 && (
                        <Table
                            dataSource={searchedProduct}
                            columns={mergedColumns}
                            rowKey="id"
                            components={{
                                body: {
                                    cell: EditableCell,
                                },
                            }}
                            style={{ marginTop: '20px' }}
                        />
                    )}
                </Splitter.Panel>
                <Splitter.Panel size={sizes[1]}>
                    <div style={{ padding: '20px' }}>
                        {products.length > 0 ? (
                            <Row gutter={[16, 16]}>
                                {products.map((product) => (
                                    <Col key={product.id} xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Card
                                            title={product.name}
                                            variant="borderless"
                                            style={{
                                                cursor: 'pointer',
                                                width: '300px',
                                                gap: "30px"
                                            }}
                                        >
                                            <p><strong>Yetkazuvchi:</strong> {product.supplier}</p>
                                            <p><strong>Summa:</strong> {(product.count * product.price).toFixed(2)}</p>
                                            <p><strong>Kiritilgan kun:</strong> {product.date}</p>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <p>Mahsulotlar mavjud emas</p>
                        )}
                    </div>
                </Splitter.Panel>
            </Splitter>
            <Flex gap="middle" justify="space-between">
                <Switch
                    value={enabled}
                    onChange={() => setEnabled(!enabled)}
                    checkedChildren="Enabled"
                    unCheckedChildren="Disabled"
                />
                <Button onClick={() => setSizes(['50%', '50%'])}>Reset</Button>
            </Flex>
        </Flex>
    );
}

export default Cash;
