import { Button, Divider, Table } from 'antd';
import React, { useEffect } from 'react';
import { useUsers } from './UsersStore';
import EditUser from './EditUser';
import CreateUser from './CreateUser';
import styles from '../../assets/css/index.module.css'

function Users() {
    let { users, columns, getUsers, handleOpenCreate, isCreating, isEditing, selectedUser, handleClose, handleUpdate, handleCreate } = useUsers();

    useEffect(() => {
        getUsers();
    }, []);

    // Define fields for the Edit and Create modals
    const userFields = [
        { name: 'name', label: 'Foydalanuvchi ismi', rules: [{ required: true, message: "Foydalanuvchi ismini kiriting!" }] },
        { name: 'email', label: 'Email', rules: [{ required: true, message: "Emailni kiriting!" }, { type: 'email', message: "To'g'ri email kiriting!" }] },
        { name: 'role', label: 'Rol', rules: [{ required: true, message: "Rolni kiriting!" }] },
        { name: 'phone', label: 'Telefon raqami', rules: [{ required: true, message: "Telefon raqamini kiriting!" }] },
        { name: 'password', label: 'Paroli', rules: [{ required: true, message: "Parolni kiriting!" }] },
    ];

    return (
        <div>
            <div className={styles.create_btn}>
                <Button onClick={handleOpenCreate} type='primary'>Yangi Foydalanuvchi Qo'shish</Button>
            </div>

            <Divider />

            <Table
                rowKey={'id'}
                columns={columns}
                dataSource={users}
                bordered
            />

            {/* Reuse the generic Edit modal */}
            <EditUser
                title="Foydalanuvchini taxrirlash"
                isEditing={isEditing}
                handleClose={handleClose}
                selectedItem={selectedUser}
                handleUpdate={handleUpdate}
                fields={userFields}
            />

            {/* Reuse the generic Create modal */}
            <CreateUser
                title="Yangi Foydalanuvchi Qo'shish"
                isCreating={isCreating}
                handleClose={handleClose}
                handleCreate={handleCreate}
                fields={userFields}
            />
        </div>
    );
}

export default Users;