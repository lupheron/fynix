import { create } from "zustand";
import axios from "axios";
import { Button, Space } from "antd";

export const useCategory = create((set, get) => ({
    category: [],
    selectedProduct: null,
    isEditing: false, // Controls Edit modal visibility
    isCreating: false, // Controls Create modal visibility

    columns: [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Kategoriya nomi',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Uskunalar',
            key: 'actions',
            width: 100,
            render: (_, kt) => (
                <Space>
                    <Button onClick={() => get().handleEdit(kt)}>✏️</Button>
                    <Button danger onClick={() => get().handleDelete(kt.id)}>🗑️</Button>
                </Space>
            )
        }
    ],

    getCategory: () => {
        axios.get("http://opsurt.test/api/category")
            .then((res) => {
                set({ category: res.data })
            })

            .catch((error) => console.error("Error fetching categories:", error));
    },
    handleEdit: (kt) => {
        // console.log("Editing product:", wh); // Debugging: Log the product being edited
        set({ selectedProduct: kt, isEditing: true }); // Open the Edit modal and set the selected product
    },

    handleUpdate: (values) => {
        axios.put(`http://opsurt.test/api/editcategory/${values.id}`, values)
            .then((response) => {
                console.log("Update response:", response.data); // Debugging: Log success
                set({ isEditing: false, selectedProduct: null }); // Close the modal and reset selected product
                get().getCategory(); // Refresh the product list
            })
            .catch((error) => console.error("Error updating category:", error)); // Log errors
    },
    handleDelete: (categoryId) => {
        axios.delete(`/delcategory/${categoryId}`)
            .then(() => get().getCategory())
            .catch((error) => console.error("Error deleting category:", error));
    },

    handleCreate: (formData) => {
        axios.post("http://opsurt.test/api/createcategory", formData)
            .then((response) => {
                if (response.data.status === 200) {
                    set({ isCreating: false, selectedProduct: null });
                    get().getCategory();
                } else {
                    console.error("Error creating category:", response.data.message);
                }
            })
            .catch((error) => console.error("Error creating category:", error));
    },

    handleOpenCreate: () => set({ isCreating: true, isEditing: false, selectedProduct: null }), // Open Create modal, close Edit modal
    handleClose: () => set({ isCreating: false, isEditing: false, selectedProduct: null }), // Close both modals
}));