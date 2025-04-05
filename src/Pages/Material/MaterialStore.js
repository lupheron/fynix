import { create } from "zustand";
import axios from "axios";
import { Button, Space } from "antd";

export const useMaterial = create((set, get) => ({
    material: [],
    selectedProduct: null,
    isEditing: false, // Controls Edit modal visibility
    isCreating: false, // Controls Create modal visibility

    columns: [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'category_name',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'material_name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'tools',
            key: 'actions',
            width: 100,
            render: (_, mt) => (
                <Space>
                    <Button onClick={() => get().handleEdit(mt)}>✏️</Button>
                    <Button danger onClick={() => get().handleDelete(mt.id)}>🗑️</Button>
                </Space>
            )
        }
    ],

    getMaterial: () => {
        axios.get("http://opsurt.test/api/material")
            .then((res) => {
                set({ material: res.data })
            })

            .catch((error) => console.error("Error fetching materials:", error));
    },
    handleEdit: (mt) => {
        // console.log("Editing product:", wh); // Debugging: Log the product being edited
        set({ selectedProduct: mt, isEditing: true }); // Open the Edit modal and set the selected product
    },

    handleUpdate: (values) => {
        axios.put(`http://opsurt.test/api/editmaterial/${values.id}`, values)
            .then((response) => {
                console.log("Update response:", response.data); // Debugging: Log success
                set({ isEditing: false, selectedProduct: null }); // Close the modal and reset selected product
                get().getMaterial(); // Refresh the product list
            })
            .catch((error) => console.error("Error updating material:", error)); // Log errors
    },
    handleDelete: (materialId) => {
        axios.delete(`/delmaterial/${materialId}`)
            .then(() => get().getMaterial())
            .catch((error) => console.error("Error deleting material:", error));
    },

    handleCreate: (formData) => {
        axios.post("http://opsurt.test/api/creatematerial", formData)
            .then((response) => {
                if (response.data.status === 200) {
                    set({ isCreating: false, selectedProduct: null });
                    get().getMaterial();
                } else {
                    console.error("Error creating material:", response.data.message);
                }
            })
            .catch((error) => console.error("Error creating material:", error));
    },

    handleOpenCreate: () => set({ isCreating: true, isEditing: false, selectedProduct: null }), // Open Create modal, close Edit modal
    handleClose: () => set({ isCreating: false, isEditing: false, selectedProduct: null }), // Close both modals
}));