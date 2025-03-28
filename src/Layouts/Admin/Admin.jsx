import React, { useState } from 'react';
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
import { Breadcrumb, Layout, Menu, theme } from 'antd';
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
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem(<NavLink to={"/admin/"}>Statistika</NavLink>, '/admin/', <BarChartOutlined />),
    getItem('Chiqim', 'sub1', <PieChartOutlined />, [
        getItem(<NavLink to={"/admin/out"}>Kassa</NavLink>, '/admin/out', <DollarOutlined />),
        getItem(<NavLink to={'/admin/out-flow'}>Chiqim bo'yicha hisobotlar</NavLink>, '/admin/out-flow', <HddOutlined />),
    ]),
    getItem(<NavLink to="/admin/users">Foydalanuvchilar</NavLink>, '/admin/users', <UserOutlined />),
    getItem(<NavLink to={"/admin/chat"}>Chat</NavLink>, "/admin/chat", <TeamOutlined />),
    getItem('Parametrlar', 'sub3', <DeploymentUnitOutlined />, [
        getItem(<NavLink to={'/admin/country'}>Davlatlar</NavLink>, '/admin/country', <BankOutlined />),
        getItem(<NavLink to={'/admin/category'}>Kategoriyalar</NavLink>, '/admin/category', <DatabaseOutlined />),
        getItem(<NavLink to={'/admin/material'}>Materiallar</NavLink>, '/admin/material', <PartitionOutlined />),
        getItem(<NavLink to={'/admin/warehouse'}>Skladlar</NavLink>, '/admin/warehouse', <SaveOutlined />),
        getItem(<NavLink to={'/admin/section'}>Bo'lmlar</NavLink>, '/admin/section', <ProfileOutlined />),
        getItem(<NavLink to={'/admin/boxes'}>Qutilar</NavLink>, '/admin/boxes', <BoxPlotOutlined />),
        getItem(<NavLink to={'/admin/products'}>Mahsulotlar</NavLink>, '/admin/products', <ProductOutlined />),
    ]),
    getItem('Kirim', 'sub4', <PieChartOutlined />, [
        getItem(<NavLink to={"/admin/coming"}>Kirim</NavLink>, '/admin/coming', <ShoppingCartOutlined />),
        getItem(<NavLink to={'/admin/coming-flow'}>Kirim bo'yicha hisobotlar</NavLink>, '/admin/coming-flow', <HddOutlined />),
    ]),
];
const Admin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    let uri = useHref()


    axios.defaults.baseURL = "http://opsurt.test/api";
    axios.defaults.headers.common = {
        "Authorization": "Bearer " + localStorage.getItem('token')
    }

    return (
        <Layout
            style={{
                minHeight: '150vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={uri} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        height: '8%'
                    }}
                >
                </Header>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
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