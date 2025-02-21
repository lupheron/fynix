import { create } from "zustand";
import axios from "axios";
import { Button, Space } from "antd";

export const useProducts = create((set, get) => ({
    products: [],
    users: [],
    selectedProduct: null,
    isEditing: false, // Controls Edit modal visibility
    isCreating: false, // Controls Create modal visibility

    columns: [
        {
            title: 'Maxsulot nomi',
            dataIndex: 'name',
            key: 'name',
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
            title: 'Davlat',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: 'Kategoriya',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Material',
            dataIndex: 'material',
            key: 'material',
        },
        {
            title: 'Sklad',
            dataIndex: 'warehouse',
            key: 'warehouse',
        },
        {
            title: "Bo'lim",
            dataIndex: 'section',
            key: 'section',
        },
        {
            title: "Quti",
            dataIndex: 'box',
            key: 'box',
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

    getProducts: () => {
        axios.get("http://opsurt.test/api/products")
            .then((res) => {
                set({ products: res.data })
                console.log(res.data)
            })

            .catch((error) => console.error("Error fetching products:", error));

        axios.get("http://opsurt.test/api/users")
            .then((res) => set({ users: res.data }))
            .catch((error) => console.error("Error fetching users:", error));
    },
    handleEdit: (product) => {
        console.log("Editing product:", product); // Debugging: Log the product being edited
        set({ selectedProduct: product, isEditing: true }); // Open the Edit modal and set the selected product
    },

    handleUpdate: (values) => {
        axios.put(`http://opsurt.test/api/updateproduct/${values.id}`, values)
            .then((response) => {
                console.log("Response from API:", response.data);
                set({ isEditing: false, selectedProduct: null });
                get().getProducts();
            })
            .catch((error) => console.error("Error updating product:", error));
    },

    handleDelete: (productId) => {
        axios.delete(`/deleteproduct/${productId}`)
            .then(() => get().getProducts())
            .catch((error) => console.error("Error deleting product:", error));
    },

    handleCreate: (formData) => {
        axios.post("http://opsurt.test/api/createproduct", formData)
            .then((response) => {
                if (response.data.status === 200) {
                    set({ isCreating: false, selectedProduct: null });
                    get().getProducts();
                } else {
                    console.error("Error creating product:", response.data.message);
                }
            })
            .catch((error) => console.error("Error creating product:", error));
    },

    handleOpenCreate: () => set({ isCreating: true, isEditing: false, selectedProduct: null }), // Open Create modal, close Edit modal
    handleClose: () => set({ isCreating: false, isEditing: false, selectedProduct: null }), // Close both modals
}));