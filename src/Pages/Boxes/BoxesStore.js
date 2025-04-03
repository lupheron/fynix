import { create } from "zustand";
import axios from "axios";
import { Button, Space } from "antd";

export const useBoxes = create((set, get) => ({
    boxes: [],
    section: [],
    selectedProduct: null,
    isEditing: false, // Controls Edit modal visibility
    isCreating: false, // Controls Create modal visibility

    columns: [
        {
            title: 'id', // Keep the static text here
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'section_name', // Static text for now
            dataIndex: 'sec_name',
            key: 'sec_name',
        },
        {
            title: 'box_name', // Static text for now
            dataIndex: 'box_name',
            key: 'box_name',
        },
        {
            title: 'tools', // Static text for now
            key: 'actions',
            width: 100,
            render: (_, box) => (
                <Space>
                    <Button onClick={() => get().handleEdit(box)}>✏️</Button>
                    <Button danger onClick={() => get().handleDelete(box.id)}>🗑️</Button>
                </Space>
            )
        }
    ],

    getSection: () => {
        axios.get("http://opsurt.test/api/section")
            .then((res) => {
                set({ section: res.data })
                console.log(res.data)
            })
            .catch((error) => console.error("Error fetching warehouse", error));
    },

    getBoxes: () => {
        axios.get("http://opsurt.test/api/boxes")
            .then((res) => {
                set({ boxes: res.data })
            })
            .catch((error) => console.error("Error fetching boxes", error));
    },
    handleEdit: (sec) => {
        set({ selectedProduct: sec, isEditing: true }); // Open the Edit modal and set the selected product
    },

    handleUpdate: (values) => {
        const { selectedProduct } = get();
        if (!selectedProduct) return;

        axios.put(`http://opsurt.test/api/editbox/${values.id}`, values)
            .then((response) => {
                console.log("Update response:", response.data);
                set({ isEditing: false, selectedProduct: null });
                get().getBoxes(); // Refresh the boxes list
            })
            .catch((error) => console.error("Error updating box:", error));
    },
    handleDelete: (boxId) => {
        axios.delete(`/delbox/${boxId}`)
            .then(() => get().getBoxes())
            .catch((error) => console.error("Error deleting box:", error));
    },

    handleCreate: (formData) => {
        axios.post("http://opsurt.test/api/createbox", formData)
            .then((response) => {
                if (response.data.status === 200) {
                    set({ isCreating: false, selectedProduct: null });
                    get().getBoxes();
                } else if (response.data.status === 201) {
                    alert(response.data.message); // Show warning if section exists
                } else {
                    console.error("Error creating box:", response.data.message);
                }
            })
            .catch((error) => console.error("Error creating box:", error));
    },

    handleOpenCreate: () => set({ isCreating: true, isEditing: false, selectedProduct: null }), // Open Create modal
    handleClose: () => set({ isCreating: false, isEditing: false, selectedProduct: null }), // Close modals
}));