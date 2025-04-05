import { Button, Space } from "antd";
import axios from "axios";
import { create } from "zustand";

export const useUsers = create((set, get) => ({
    users: [],
    selectedUser: null,
    isEditing: false, // Controls Edit modal visibility
    isCreating: false, // Controls Create modal visibility

    columns: [
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'tools',
            key: 'actions',
            width: 100,
            render: (_, user) => (
                <Space>
                    <Button onClick={() => get().handleEdit(user)}>✏️</Button>
                    <Button danger onClick={() => get().handleDelete(user.id)}>🗑️</Button>
                </Space>
            )
        }
    ],

    getUsers: () => {
        axios.get("http://opsurt.test/api/users")
            .then((res) => set({ users: res.data }))
            .catch((error) => console.error("Error fetching users:", error));
    },
    handleEdit: (user) => {
        console.log("Editing user:", user); // Debugging: Log the user being edited
        set({ selectedUser: user, isEditing: true }); // Open the Edit modal and set the selected user
    },

    handleUpdate: (values) => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        console.log("Updating user with values:", values); // Debugging: Log the form values

        axios.put(`http://opsurt.test/api/updateuser/${selectedUser.id}`, values)
            .then(() => {
                console.log("user updated successfully"); // Debugging: Log success
                set({ isEditing: false, selectedUser: null }); // Close the modal and reset selected user
                get().getUsers(); // Refresh the user list
            })
            .catch((error) => console.error("Error updating user:", error)); // Log errors
    },
    handleDelete: (userId) => {
        axios.delete(`/deleteuser/${userId}`)
            .then(() => get().getUsers())
            .catch((error) => console.error("Error deleting user:", error));
    },

    handleCreate: (formData) => {
        axios.post("http://opsurt.test/api/createuser", formData)
            .then((response) => {
                if (response.data.status === 200) {
                    set({ isCreating: false, selectedUser: null });
                    get().getUsers();
                } else {
                    console.error("Error creating user:", response.data.message);
                }
            })
            .catch((error) => console.error("Error creating user:", error));
    },

    handleOpenCreate: () => set({ isCreating: true, isEditing: false, selectedUser: null }), // Open Create modal, close Edit modal
    handleClose: () => set({ isCreating: false, isEditing: false, selectedUser: null }), // Close both modals
}))