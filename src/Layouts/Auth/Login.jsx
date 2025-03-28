import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Result, Button } from 'antd';
import css from '../../assets/css/index.module.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

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
            axios.post('http://opsurt.test/api/login', formData)
                .then((response) => {
                    console.log('Response:', response.data);
                    localStorage.setItem('token', JSON.stringify(response.data.token));
                    localStorage.setItem('username', response.data.name);  // Store username
                    setStatus('success');
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

    useEffect(() => {
        if (status === 'success') {
            navigate('/admin');
        }
    }, [status, navigate]);

    const renderResult = () => {
        if (status === 'success') {
            return (
                <Result
                    status="success"
                    title="Muvaffaqiyatli login!"
                    subTitle="Sizning ma'lumotlaringiz to'g'ri."
                />
            );
        }

        if (status === 'error') {
            return (
                <Result
                    status="warning"
                    title="Login qilinishda xatolik yuzaga keldi."
                    extra={[
                        <Button type="primary" key="console" onClick={() => window.location.reload()}>
                            Qayta Urinish
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
                    <h2 className={css.formTitle}>Login</h2>
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

export default Login;
