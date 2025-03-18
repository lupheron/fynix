import React, { useEffect } from 'react';
import { Result, Button, Form, Row, Col, Input, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import css from '../../assets/css/index.module.css';
import { useAuth } from './AuthStore';
import { useForm } from 'antd/es/form/Form';

function Register() {
    const { handleRegister, status, getUsers } = useAuth();
    const navigate = useNavigate();
    const [form] = useForm();

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className={css.users}>
            {status === 'success' ? (
                <Result
                    status="success"
                    title="Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi!"
                    subTitle="Sizning ma'lumotlaringiz muvaffaqiyatli saqlandi."
                    extra={[
                        <Button type="primary" key="login" onClick={() => navigate('/login')}>
                            Log in
                        </Button>,
                    ]}
                />
            ) : status === 'error' ? (
                <Result
                    status="warning"
                    title="Ro'yxatdan o'tishda xatolik yuzaga keldi."
                    extra={[
                        <Button type="primary" key="retry" onClick={() => window.location.reload()}>
                            Qayta urinish
                        </Button>,
                    ]}
                />
            ) : (
                <Form
                    onFinish={(values) => {
                        handleRegister(values);
                        form.resetFields();
                    }}
                    layout="vertical"
                    form={form}
                    style={{ 
                        backgroundColor: "white",
                        padding: '20px',
                        border: 'none',
                        borderRadius: "10px"
                     }}
                >
                        <Col style={{ width: '340px' }}>
                            <Form.Item name="name" label="Foydalanuvchi I.F.SH" rules={[{ required: true, message: "Ismni kiriting!" }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col style={{ width: '340px' }}>
                            <Form.Item name="phone" label="Telefon Raqam" rules={[{ required: true, message: "Telefon raqamni kiriting!" }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col style={{ width: '340px' }}>
                            <Form.Item name="email" label="Email" rules={[{ required: true, message: "Emailni kiriting!" }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col style={{ width: '340px' }}>
                            <Form.Item name="role" label="Foydalanuvchi Roli" rules={[{ required: true, message: "Rolni tanlang!" }]}>
                                <Select
                                    showSearch
                                    placeholder="Rolni tanlang"
                                    optionFilterProp="label"
                                    options={[
                                        { value: 'direktor', label: 'Direktor' },
                                        { value: 'manager', label: 'Manager' },
                                        { value: 'boshqaruvchi', label: 'Boshqaruvchi' },
                                        { value: 'ischi', label: 'Ishchi' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col style={{ width: '340px' }}>
                            <Form.Item name="password" label="Parol" rules={[{ required: true, message: "Parolni kiriting!" }]}>
                                <Input.Password />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Button htmlType="submit" type="primary">Saqlash</Button>
                        </Col>
                </Form>
            )}
        </div>
    );
}

export default Register;
