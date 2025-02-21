import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Result, Button } from 'antd';
import css from '../../assets/css/index.module.css';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({
        name: '', // Match backend's expected field name
        phone: '',
        email: '',
        role: '',
        password: '',
    });

    const navigate = useNavigate()
    const [submit, setSubmit] = useState(false);
    const [status, setStatus] = useState(''); // Track status: 'success' or 'error'

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmit(true); // Trigger the useEffect to post data
    };

    useEffect(() => {
        if (submit) {
            axios
                .post('http://opsurt.test/api/register', formData)
                .then((response) => {
                    console.log('Response:', response.data);
                    setStatus('success'); // Set status to success
                })
                .catch((error) => {
                    console.error('Error:', error.response ? error.response.data : error.message);
                    setStatus('error'); // Set status to error
                })
                .finally(() => {
                    setSubmit(false); // Reset submit state
                });
        }
    }, [submit, formData]);

    const renderResult = () => {
        if (status === 'success') {
            return (
                <Result
                    status="success"
                    title="Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi!"
                    subTitle="Sizning ma'lumotlaringiz muvaffaqiyatli saqlandi."
                    extra={[
                        <Button type="primary" key="console" onClick={navigate('/login')}>
                            Log in
                        </Button>,
                    ]}
                />
            );
        }

        if (status === 'error') {
            return (
                <Result
                    status="warning"
                    title="Ro'yxatdan o'tishda xatolik yuzaga keldi."
                    extra={[
                        <Button type="primary" key="console" onClick={() => window.location.reload()}>
                            Qayta urisnish
                        </Button>,
                    ]}
                />
            );
        }

        return null; // Return nothing if no status
    };

    return (
        <div className={css.users}>
            {status ? (
                renderResult() // Show success/error message if status is set
            ) : (
                <form onSubmit={handleSubmit} className={css.formContainer}>
                    <h2 className={css.formTitle}>Ro'yxatdan O'tish</h2>
                    <div className={css.inputGroup}>
                        <label htmlFor="text">Ism, Familiya va Sharifingiz</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={css.inputField}
                        />
                    </div>
                    <div className={css.inputGroup}>
                        <label htmlFor="number">Telefon Raqamingiz</label>
                        <input
                            type="number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={css.inputField}
                        />
                    </div>
                    <div className={css.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={css.inputField}
                        />
                    </div>
                    <div className={css.inputGroup}>
                        <label htmlFor="text">Rolingiz</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            className={css.selectField}
                        >
                            <option value="direktor">Direktor</option>
                            <option value="manager">Manager</option>
                            <option value="boshqaruvchi">Bo'lim Boshlig'i</option>
                            <option value="ishchi">Ishchi</option>
                        </select>
                    </div>
                    <div className={css.inputGroup}>
                        <label htmlFor="password">Parol</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={css.inputField}
                        />
                    </div>
                    <input
                        type="submit"
                        className={css.submitButton}
                        value={'Yuborish'}
                    />
                </form>
            )}
        </div>
    );
}

export default Register;
