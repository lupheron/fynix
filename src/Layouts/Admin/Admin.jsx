import React, { useEffect, useState } from 'react';
import {
    BankOutlined,
    BarChartOutlined,
    BoxPlotOutlined,
    DatabaseOutlined,
    DeploymentUnitOutlined,
    DollarOutlined,
    HddOutlined,
    PartitionOutlined,
    PieChartOutlined,
    ProductOutlined,
    ProfileOutlined,
    SaveOutlined,
    ShoppingCartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Select } from 'antd';
import { NavLink, Route, Routes, useHref } from 'react-router-dom';
import Products from '../../Pages/Products/Products';
import axios from 'axios';
import Users from '../../Pages/Users/Users';
import Warehouse from '../../Pages/WareHouse/Warehouse';
import Section from '../../Pages/Section/Section';
import Boxes from '../../Pages/Boxes/Boxes';
import Prixod from '../../Pages/Prixod/Prixod';
import Country from '../../Pages/Country/Country';
import Category from '../../Pages/Category/Category';
import Material from '../../Pages/Material/Material';
import PrixodFlow from '../../Pages/Prixod/PrixodFlow/PrixodFlow';
import Out from '../../Pages/Out/Out';
import OutFlow from '../../Pages/Out/OutFlow/OutFlow';
import Stat from '../../Pages/Chart/Stat';
import Chat from '../../Pages/Chat/Chat';
import "../../i18n";
import { useTranslation } from "react-i18next";

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const Admin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    let uri = useHref();
    const { t, i18n } = useTranslation(); // ✅ FIXED: useTranslation() inside the component

    // Function to change language
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("lang", lang);
    };

    // Load stored language preference on app load
    useEffect(() => {
        const storedLang = localStorage.getItem("lang");
        if (storedLang) {
            i18n.changeLanguage(storedLang);
        }
    }, []);

    const items = [
        getItem(<NavLink to={"/admin/"}>{t("statistics")}</NavLink>, '/admin/', <BarChartOutlined />),
        getItem(t("out"), 'sub1', <PieChartOutlined />, [
            getItem(<NavLink to={"/admin/out"}>{t("cash")}</NavLink>, '/admin/out', <DollarOutlined />),
            getItem(<NavLink to={'/admin/out-flow'}>{t("out_flow")}</NavLink>, '/admin/out-flow', <HddOutlined />),
        ]),
        getItem(<NavLink to="/admin/users">{t("users")}</NavLink>, '/admin/users', <UserOutlined />),
        getItem(<NavLink to={"/admin/chat"}>{t("chat")}</NavLink>, "/admin/chat", <TeamOutlined />),
        getItem(t("parametrs"), 'sub3', <DeploymentUnitOutlined />, [
            getItem(<NavLink to={'/admin/country'}>{t("country")}</NavLink>, '/admin/country', <BankOutlined />),
            getItem(<NavLink to={'/admin/category'}>{t("category")}</NavLink>, '/admin/category', <DatabaseOutlined />),
            getItem(<NavLink to={'/admin/material'}>{t("material")}</NavLink>, '/admin/material', <PartitionOutlined />),
            getItem(<NavLink to={'/admin/warehouse'}>{t("warehouse")}</NavLink>, '/admin/warehouse', <SaveOutlined />),
            getItem(<NavLink to={'/admin/section'}>{t("section")}</NavLink>, '/admin/section', <ProfileOutlined />),
            getItem(<NavLink to={'/admin/boxes'}>{t("box")}</NavLink>, '/admin/boxes', <BoxPlotOutlined />),
            getItem(<NavLink to={'/admin/products'}>{t("product")}</NavLink>, '/admin/products', <ProductOutlined />),
        ]),
        getItem(t("in"), 'sub4', <PieChartOutlined />, [
            getItem(<NavLink to={"/admin/coming"}>{t("in")}</NavLink>, '/admin/coming', <ShoppingCartOutlined />),
            getItem(<NavLink to={'/admin/coming-flow'}>{t("in_flow")}</NavLink>, '/admin/coming-flow', <HddOutlined />),
        ]),
    ];

    axios.defaults.baseURL = "http://opsurt.test/api";
    axios.defaults.headers.common = {
        "Authorization": "Bearer " + localStorage.getItem('token')
    };

    return (
        <Layout style={{ minHeight: '150vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={uri} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        padding: "0 20px",
                        background: colorBgContainer,
                        height: '8%'
                    }}
                >
                    <Select
                        defaultValue={i18n.language}
                        style={{ width: 150 }}
                        onChange={changeLanguage}
                        options={[
                            { value: 'uz', label: '🇺🇿 Uzbek' },
                            { value: 'en', label: '🇬🇧 English' },
                            { value: 'ru', label: '🇷🇺 Russian' }
                        ]}
                    />
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Routes>
                            <Route path="/" element={<Stat />} />
                            <Route path="/users" element={<Users />} />
                            <Route path="/country" element={<Country />} />
                            <Route path="/category" element={<Category />} />
                            <Route path="/material" element={<Material />} />
                            <Route path="/warehouse" element={<Warehouse />} />
                            <Route path="/section" element={<Section />} />
                            <Route path="/boxes" element={<Boxes />} />
                            <Route path="/products" element={<Products />} />
                            {/* CHAT */}
                            <Route path="/chat" element={<Chat />} />
                            {/* OUT */}
                            <Route path="/out" element={<Out />} />
                            <Route path="/out-flow" element={<OutFlow />} />
                            {/* COMING */}
                            <Route path="/coming" element={<Prixod />} />
                            <Route path="/coming-flow" element={<PrixodFlow />} />
                        </Routes>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Admin;
