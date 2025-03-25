import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import axios from "axios";
import css from "../../assets/css/index.module.css";
import { Card, Col, Divider, Row, Statistic } from "antd";
import { useUsers } from "../Users/UsersStore";
import { useProducts } from "../Products/ProductStore";
import { BoxPlotOutlined, DollarOutlined, UserOutlined } from "@ant-design/icons";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Stat() {
    const [out, setOut] = useState([]);
    const [coming, setComing] = useState([]);
    const [sum, setAnnualSumm] = useState([]);
    let { users, getUsers } = useUsers();
    let { products, getProducts } = useProducts();

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

                setOut([{ label: "Oylik chiqim summasi", data: monthData, backgroundColor: "rgba(54, 162, 235, 0.7)", borderColor: "rgba(54, 162, 235, 1)", borderWidth: 2 }]);

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

                setComing([{ label: "Oylik kirim summasi", data: incomingData, backgroundColor: "rgba(75, 192, 192, 0.7)", borderColor: "rgba(75, 192, 192, 1)", borderWidth: 2 }]);
            })
            .catch(error => console.error("Error fetching incoming products:", error));

    }, []);



    const data = {
        labels: [
            "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
            "Iyul", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
        ],
        datasets: out,
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true },
            title: { display: true, text: "Oylik chiqim summasi (Joriy yil)" },
        },
        scales: {
            y: { beginAtZero: true },
        },
    };

    const data2 = {
        labels: [
            "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
            "Iyul", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
        ],
        datasets: coming,
    };

    const options2 = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true },
            title: { display: true, text: "Oylik kirim summasi (Joriy yil)" },
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
                            title="Jami Mahsulotlar"
                            value={products.length}
                            prefix={<BoxPlotOutlined />}
                            suffix={"dona"}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Jami foydalanuvchilar"
                            value={users.length}
                            prefix={<UserOutlined />}
                            suffix={"dona"}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Jami yildagi tushum"
                            value={sum}
                            prefix={<DollarOutlined />}
                            suffix={"sum"}
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
