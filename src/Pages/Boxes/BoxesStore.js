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
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: "Bo'lim nomi",
            dataIndex: 'sec_name',
            key: 'sec_name',
        },
        {
            title: "Quti nomi",
            dataIndex: 'box_name',
            key: 'box_name',
        },
        {
            title: 'Uskunalar',
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
            .catch((error) => console.error("Error fetching warehosue", error));
    },

    getBoxes: () => {
        axios.get("http://opsurt.test/api/boxes")
            .then((res) => {
                set({ boxes: res.data })
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

        axios.put(`http://opsurt.test/api/editbox/${values.id}`, values)
            .then((response) => {
                console.log("Update response:", response.data); // Debugging: Log success
                set({ isEditing: false, selectedProduct: null }); // Close the modal and reset selected product
                get().getBoxes(); // Refresh the product list
            })
            .catch((error) => console.error("Error updating product:", error)); // Log errors
    },
    handleDelete: (boxId) => {
        axios.delete(`/delbox/${boxId}`)
            .then(() => get().getBoxes())
            .catch((error) => console.error("Error deleting product:", error));
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
                    console.error("Error creating section:", response.data.message);
                }
            })
            .catch((error) => console.error("Error creating section:", error));
    },


    handleOpenCreate: () => set({ isCreating: true, isEditing: false, selectedProduct: null }), // Open Create modal, close Edit modal
    handleClose: () => set({ isCreating: false, isEditing: false, selectedProduct: null }), // Close both modals
})); 