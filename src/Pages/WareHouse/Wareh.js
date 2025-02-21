import { create } from "zustand";
import axios from "axios";
import { Button, Space } from "antd";

export const useWarehouse = create((set, get) => ({
    warehouse: [],
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
            title: 'Sklad nomi',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: "Bo'limlar soni",
            dataIndex: 'section_count',
            key: 'section_count',
        },
        {
            title: 'Qutilar soni',
            dataIndex: 'box_count',
            key: 'box_count',
        },
        {
            title: 'Uskunalar',
            key: 'actions',
            width: 100,
            render: (_, wh) => (
                <Space>
                    <Button onClick={() => get().handleEdit(wh)}>✏️</Button>
                    <Button danger onClick={() => get().handleDelete(wh.id)}>🗑️</Button>
                </Space>
            )
        }
    ],


    getWarehouse: () => {
        axios.get("http://opsurt.test/api/warehouse")
            .then((res) => {
                set({ warehouse: res.data })
            })

            .catch((error) => console.error("Error fetching products:", error));
    },
    handleEdit: (wh) => {
        // console.log("Editing product:", wh); // Debugging: Log the product being edited
        set({ selectedProduct: wh, isEditing: true }); // Open the Edit modal and set the selected product
    },

    handleUpdate: (values) => {
        axios.put(`http://opsurt.test/api/editwarehouse/${values.id}`, values)
            .then((response) => {
                console.log("Update response:", response.data); // Debugging: Log success
                set({ isEditing: false, selectedProduct: null }); // Close the modal and reset selected product
                get().getWarehouse(); // Refresh the product list
            })
            .catch((error) => console.error("Error updating product:", error)); // Log errors
    },
    handleDelete: (productId) => {
        axios.delete(`/delwarehouse/${productId}`)
            .then(() => get().getWarehouse())
            .catch((error) => console.error("Error deleting product:", error));
    },

    handleCreate: (formData) => {
        axios.post("http://opsurt.test/api/createwarehouse", formData)
            .then((response) => {
                if (response.data.status === 200) {
                    set({ isCreating: false, selectedProduct: null });
                    get().getWarehouse();
                } else {
                    console.error("Error creating product:", response.data.message);
                }
            })
            .catch((error) => console.error("Error creating product:", error));
    },

    handleOpenCreate: () => set({ isCreating: true, isEditing: false, selectedProduct: null }), // Open Create modal, close Edit modal
    handleClose: () => set({ isCreating: false, isEditing: false, selectedProduct: null }), // Close both modals
}));