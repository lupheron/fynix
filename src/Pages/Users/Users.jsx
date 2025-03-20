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
            />

            {/* Reuse the generic Create modal */}
            <CreateUser
                title="Yangi Foydalanuvchi Qo'shish"
                isCreating={isCreating}
                handleClose={handleClose}
                handleCreate={handleCreate}
            />
        </div>
    );
}

export default Users;