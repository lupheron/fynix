import { create } from "zustand";
import axios from "axios";
import { Button, Space, message } from "antd";

export const usePrixodFlow = create((set, get) => ({
    coming: [],
    selectedProduct: null,
    isEditing: false,
    expandDataSource: [],
    dataSource: [],

    getData: () => {
        axios.get('coming').then((res) => {
            set({ dataSource: res.data })
        })
    },

    fetchComings: () => {
        axios.get("/coming").then((res) => {
            set({ expandDataSource: res.data });
        });
    },

    handleEdit: (record) => {
        set({ selectedProduct: record, isEditing: true });
    },

    handleUpdate: (values) => {
        axios.put(`/updatecoming/${values.id}`, values).then(() => {
            message.success("Mahsulot muvaffaqiyatli yangilandi!");
            set({ isEditing: false, selectedProduct: null });
            get().fetchComings();
        });
    },

    handleDelete: (id) => {
        axios.delete(`/deletecoming/${id}`).then(() => {
            message.success("Mahsulot o'chirildi!");
            get().fetchComings();
        });
    },

    handleClose: () => set({ isEditing: false, selectedProduct: null }),

    expandColumns: [
        {
            title: 'Keltirilgan kuni',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Yetkazuvchi',
            dataIndex: 'supplier',
            key: 'supplier',
        },
        {
            title: 'Holati',
            key: 'state',
        },
        {
            title: 'Upgrade Status',
            dataIndex: 'upgradeNum',
            key: 'upgradeNum',
        },
        {
            title: 'Uskunalar',
            key: 'actions',
            render: () => (
                <Space size="middle">
                    <Button onClick={() => get().handleEdit()}>✏️</Button>
                    <Button danger onClick={() => get().handleDelete()}>🗑️</Button>
                </Space>
            ),
        },
    ]
}));
