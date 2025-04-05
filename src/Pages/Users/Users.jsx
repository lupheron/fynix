import { Button, Divider, Table } from 'antd';
import React, { useEffect } from 'react';
import { useUsers } from './UsersStore';
import EditUser from './EditUser';
import CreateUser from './CreateUser';
import styles from '../../assets/css/index.module.css'
import { useTranslation } from 'react-i18next';

function Users() {
    let { users, columns, getUsers, handleOpenCreate, isCreating, isEditing, selectedUser, handleClose, handleUpdate, handleCreate } = useUsers();
    const { t } = useTranslation(); // Get translation function

    useEffect(() => {
        getUsers();
    }, []);

    const translatedColumns = columns.map(col => ({
        ...col,
        title: t(`user.${col.title.toLowerCase().replace(/\s+/g, '_')}`) // Dynamically translate title
    }));


    return (
        <div>
            <div className={styles.create_btn}>
                <Button onClick={handleOpenCreate} type='primary'>{t("user.user_create_title")}</Button>
            </div>
            <br />
            <Divider />
            <Table
                rowKey={'id'}
                columns={translatedColumns}
                dataSource={users}
                bordered
            />

            {/* Reuse the generic Edit modal */}
            <EditUser
                title={t("user.user_edit_title")}
                isEditing={isEditing}
                handleClose={handleClose}
                selectedItem={selectedUser}
                handleUpdate={handleUpdate}
            />

            {/* Reuse the generic Create modal */}
            <CreateUser
                title={t("user.user_create_title")}
                isCreating={isCreating}
                handleClose={handleClose}
                handleCreate={handleCreate}
            />
        </div>
    );
}

export default Users;