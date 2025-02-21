import React, { useEffect } from 'react';
import { Button, Divider, Table } from 'antd';
import Edit from './Edit';
import Create from './Create';
import styles from '../../assets/css/index.module.css'
import { useCategory } from './CategoryStore';

function Category() {
    const { category, handleOpenCreate, columns, getCategory, isCreating, isEditing, handleClose, selectedProduct, handleUpdate, handleCreate } = useCategory();

    useEffect(() => {
        getCategory();
    }, []);
    return (
        <div>
            <div className={styles.create_btn}>
                <Button onClick={handleOpenCreate} type='primary'>Yangi Kategoriya Qo'shish</Button>
            </div>

            <Divider />
            <Table
                rowKey={'id'}
                columns={columns}
                dataSource={category}
                bordered
            />

            <Edit
                title="Kategoriyani taxrirlash"
                isEditing={isEditing}
                handleClose={handleClose}
                selectedItem={selectedProduct}
                handleUpdate={handleUpdate}
            />

            {/* Reuse the generic Create modal */}
            <Create
                title="Yangi Kategoriya Qo'shish"
                isCreating={isCreating}
                handleClose={handleClose}
                handleCreate={handleCreate}
            />
        </div>
    );
}

export default Category;