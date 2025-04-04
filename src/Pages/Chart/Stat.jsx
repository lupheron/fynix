import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import axios from "axios";
import css from "../../assets/css/index.module.css";
import { Card, Col, Divider, Row, Statistic } from "antd";
import { useUsers } from "../Users/UsersStore";
import { useProducts } from "../Products/ProductStore";
import { BoxPlotOutlined, DollarOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Stat() {
    const [out, setOut] = useState([]);
    const [coming, setComing] = useState([]);
    const [sum, setAnnualSumm] = useState([]);
    let { users, getUsers } = useUsers();
    let { products, getProducts } = useProducts();
    const { t } = useTranslation(); // Get translation function

    useEffect(() => {
        getUsers();
        getProducts();

        // Fetch Monthly Sales Data
        axios.get("http://opsurt.test/api/monthly-sales")
            .then(res => {
                console.log("Monthly Sales:", res.data);
                const monthData = new Array(12).fill(0);
                res.data.forEach(item => {
                    if (item.month >= 1 && item.month <= 12) {
                        monthData[item.month - 1] = parseFloat(item.total_sales || 0);
                    }
                });

                setOut([{ label: t('chart.monthly_out_summ'), data: monthData, backgroundColor: "rgba(54, 162, 235, 0.7)", borderColor: "rgba(54, 162, 235, 1)", borderWidth: 2 }]);

                // Fetch Annual Summary
                return axios.get("http://opsurt.test/api/annual-summ");
            })
            .then(res => {
                console.log("Annual Sales:", res.data);
                setAnnualSumm(res.data.total_sales);
            })
            .catch(error => console.error("Error fetching monthly sales:", error));

        // Fetch Incoming Products Data
        axios.get("http://opsurt.test/api/getMonthlyIncoming")
            .then(res => {
                console.log("Incoming Products:", res.data);
                const incomingData = new Array(12).fill(0);

                res.data.forEach(item => {
                    if (item.month >= 1 && item.month <= 12) {
                        incomingData[item.month - 1] = parseFloat(item.total_incoming || 0);
                    }
                });

                setComing([{ label: t('chart.monthly_in_summ'), data: incomingData, backgroundColor: "rgba(75, 192, 192, 0.7)", borderColor: "rgba(75, 192, 192, 1)", borderWidth: 2 }]);
            })
            .catch(error => console.error("Error fetching incoming products:", error));

    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true },
            title: { display: true, text: t('chart.monthly_out_summ_this') },
        },
        scales: {
            y: { beginAtZero: true },
        },
    };

    const data = {
        labels: t('months', { returnObjects: true }), // will auto switch based on current language
        datasets: out,
    };

    const data2 = {
        labels: t('months', { returnObjects: true }),
        datasets: coming,
    };

    const options2 = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true },
            title: { display: true, text: t('chart.monthly_in_summ_this') },
        },
        scales: {
            y: { beginAtZero: true },
        },
    };

    return (
        <div>
            <h1>Boshqaruv Paneli</h1>
            <Divider />
            <Row gutter={16}>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title={t('chart.overall_products')}
                            value={products.length}
                            prefix={<BoxPlotOutlined />}
                            suffix={t('chart.piece')}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title={t('chart.overall_users')}
                            value={users.length}
                            prefix={<UserOutlined />}
                            suffix={t('chart.users')}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title={t('chart.overall_income')}
                            value={sum}
                            prefix={<DollarOutlined />}
                            suffix={t('chart.summa')}
                        />
                    </Card>
                </Col>
            </Row>
            <Divider />
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
                <div className={css.chartContainer} style={{ width: '1200px', height: '500px', background: "#f5f5f5", borderRadius: "12px", padding: "20px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
                    <Bar data={data} options={options} />
                </div>
                <div className={css.chartContainer} style={{ width: '1200px', height: '500px', background: "#f5f5f5", borderRadius: "12px", padding: "20px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
                    <Bar data={data2} options={options2} />
                </div>
            </div>

        </div>
    );
}

export default Stat;
