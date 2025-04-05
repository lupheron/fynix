import { create } from "zustand";
import axios from "axios";
import { Button, Space } from "antd";

export const useCountry = create((set, get) => ({
    country: [],
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
            title: 'country_name_en',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'country_name_ru',
            dataIndex: 'name_ru',
            key: 'name_ru',
        },
        {
            title: 'country_name',
            dataIndex: 'name_uz',
            key: 'name_uz',
        },
        {
            title: 'tools',
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

    getCountry: () => {
        axios.get("http://opsurt.test/api/country")
            .then((res) => {
                set({ country: res.data })
            })

            .catch((error) => console.error("Error fetching countries:", error));
    },
    handleEdit: (cn) => {
        // console.log("Editing product:", wh); // Debugging: Log the product being edited
        set({ selectedProduct: cn, isEditing: true }); // Open the Edit modal and set the selected product
    },

    handleUpdate: (values) => {
        axios.put(`http://opsurt.test/api/editcountry/${values.id}`, values)
            .then((response) => {
                console.log("Update response:", response.data); // Debugging: Log success
                set({ isEditing: false, selectedProduct: null }); // Close the modal and reset selected product
                get().getCountry(); // Refresh the product list
            })
            .catch((error) => console.error("Error updating country:", error)); // Log errors
    },
    handleDelete: (countryId) => {
        axios.delete(`/delcountry/${countryId}`)
            .then(() => get().getCountry())
            .catch((error) => console.error("Error deleting country:", error));
    },

    handleCreate: (formData) => {
        axios.post("http://opsurt.test/api/createcountry", formData)
            .then((response) => {
                if (response.data.status === 200) {
                    set({ isCreating: false, selectedProduct: null });
                    get().getCountry();
                } else {
                    console.error("Error creating country:", response.data.message);
                }
            })
            .catch((error) => console.error("Error creating country:", error));
    },

    handleOpenCreate: () => set({ isCreating: true, isEditing: false, selectedProduct: null }), // Open Create modal, close Edit modal
    handleClose: () => set({ isCreating: false, isEditing: false, selectedProduct: null }), // Close both modals
}));