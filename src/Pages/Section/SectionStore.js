import { create } from "zustand";
import axios from "axios";
import { Button, Space } from "antd";

export const useSection = create((set, get) => ({
    section: [],
    warehouse: [],
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
            title: "section_name",
            dataIndex: 'sec_name',
            key: 'sec_name',
        },
        {
            title: 'box_count',
            dataIndex: 'box_count',
            key: 'box_count',
        },
        {
            title: 'tools',
            key: 'actions',
            width: 100,
            render: (_, section) => (
                <Space>
                    <Button onClick={() => get().handleEdit(section)}>✏️</Button>
                    <Button danger onClick={() => get().handleDelete(section.id)}>🗑️</Button>
                </Space>
            )
        }
    ],


    getWarehouse: () => {
        axios.get("http://opsurt.test/api/warehouse")
            .then((res) => {
                set({ warehouse: res.data })
            })
            .catch((error) => console.error("Error fetching warehosue", error));
    },

    getSection: () => {
        axios.get("http://opsurt.test/api/section")
            .then((res) => {
                set({ section: res.data })
            })

            .catch((error) => console.error("Error fetching section:", error));
    },
    handleEdit: (sec) => {
        // console.log("Editing product:", wh); // Debugging: Log the product being edited
        set({ selectedProduct: sec, isEditing: true }); // Open the Edit modal and set the selected product
    },

    handleUpdate: (values) => {
        const { selectedProduct } = get();
        if (!selectedProduct) return;
        // console.log(values, id);

        // console.log("Updating warehouse with values:", values); // Debugging: Log the form values

        axios.put(`http://opsurt.test/api/editsection/${values.id}`, values)
            .then((response) => {
                console.log("Update response:", response.data); // Debugging: Log success
                set({ isEditing: false, selectedProduct: null }); // Close the modal and reset selected product
                get().getSection(); // Refresh the product list
            })
            .catch((error) => console.error("Error updating product:", error)); // Log errors
    },
    handleDelete: (productId) => {
        axios.delete(`/delsection/${productId}`)
            .then(() => get().getSection())
            .catch((error) => console.error("Error deleting product:", error));
    },

    handleCreate: (formData) => {
        axios.post("http://opsurt.test/api/createsection", formData)
            .then((response) => {
                if (response.data.status === 200) {
                    set({ isCreating: false, selectedProduct: null });
                    get().getSection();
                } else if (response.data.status === 201) {
                    alert(response.data.message); // Show warning if section exists
                } else {
                    console.error("Error creating section:", response.data.message);
                }
            })
            .catch((error) => console.error("Error creating section:", error));
    },


    handleOpenCreate: () => set({ isCreating: true, isEditing: false, selectedProduct: null }), // Open Create modal, close Edit modal
    handleClose: () => set({ isCreating: false, isEditing: false, selectedProduct: null }), // Close both modals
}));