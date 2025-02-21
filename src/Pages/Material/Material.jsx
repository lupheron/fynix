import React, { useEffect } from 'react';
import { Button, Divider, Table } from 'antd';
import Edit from './Edit';
import Create from './Create';
import styles from '../../assets/css/index.module.css'
import { useMaterial } from './MaterialStore';

function Material() {
    const { material, handleOpenCreate, columns, getMaterial, isCreating, isEditing, handleClose, selectedProduct, handleUpdate, handleCreate } = useMaterial();

    useEffect(() => {
        getMaterial();
    }, []);
    return (
        <div>
            <div className={styles.create_btn}>
                <Button onClick={handleOpenCreate} type='primary'>Yangi Material Qo'shish</Button>
            </div>

            <Divider />
            <Table
                rowKey={'id'}
                columns={columns}
                dataSource={material}
                bordered
            />

            <Edit
                title="Materialni taxrirlash"
                isEditing={isEditing}
                handleClose={handleClose}
                selectedItem={selectedProduct}
                handleUpdate={handleUpdate}
            />

            {/* Reuse the generic Create modal */}
            <Create
                title="Yangi Material Qo'shish"
                isCreating={isCreating}
                handleClose={handleClose}
                handleCreate={handleCreate}
            />
        </div>
    );
}

export default Material;