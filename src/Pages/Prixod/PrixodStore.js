import { create } from "zustand";
import axios from "axios";
import { Button, Space } from "antd";

export const usePrixod = create((set, get) => ({
    prixod: [],
    selectedProduct: null,
    isEditing: false, // Controls Edit modal visibility
    isCreating: false, // Controls Create modal visibility

    columns: [
        {
            title: 'Maxsulot nomi',
            dataIndex: 'pr_name',
            key: 'pr_name',
        },
        {
            title: 'Narxi',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Soni',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: 'Summa',
            dataIndex: 'summa',
            key: 'summa',
        },
        {
            title: 'Qabul Qilingan Kuni',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Yetkazuvchi',
            dataIndex: 'supplier',
            key: 'supplier',
        },
        {
            title: 'Uskunalar',
            key: 'actions',
            width: 100,
            render: (_, product) => (
                <Space>
                    <Button onClick={() => get().handleEdit(product)}>✏️</Button>
                    <Button danger onClick={() => get().handleDelete(product.id)}>🗑️</Button>
                </Space>
            )
        }
    ],

    getPrixod: () => {
        axios.get("http://opsurt.test/api/coming")
            .then((res) => {
                set({ prixod: res.data })
                console.log(res.data)
            })

            .catch((error) => console.error("Error fetching products:", error));
    },
    handleEdit: (prixod) => {
        console.log("Editing product:", prixod); // Debugging: Log the product being edited
        set({ selectedProduct: prixod, isEditing: true }); // Open the Edit modal and set the selected product
    },

    handleUpdate: (values) => {
        axios.put(`http://opsurt.test/api/updatecoming/${values.id}`, values)
            .then((response) => {
                console.log("Response from API:", response.data);
                set({ isEditing: false, selectedProduct: null });
                get().getPrixod();
            })
            .catch((error) => console.error("Error updating product:", error));
    },

    handleDelete: (prixodId) => {
        axios.delete(`/deletecoming/${prixodId}`)
            .then(() => get().getPrixod())
            .catch((error) => console.error("Error deleting product:", error));
    },

    handleCreate: (formData) => {
        axios.post("http://opsurt.test/api/createcoming", formData)
            .then((response) => {
                if (response.data.status === 200) {
                    set({ isCreating: false, selectedProduct: null });
                    get().getPrixod();
                } else {
                    console.error("Error creating product:", response.data.message);
                }
            })
            .catch((error) => console.error("Error creating product:", error));
    },

    handleOpenCreate: () => set({ isCreating: true, isEditing: false, selectedProduct: null }), // Open Create modal, close Edit modal
    handleClose: () => set({ isCreating: false, isEditing: false, selectedProduct: null }), // Close both modals
}));