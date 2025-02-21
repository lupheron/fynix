import { Button, Divider, Table } from 'antd';
import React, { useEffect } from 'react';
import styles from '../../assets/css/index.module.css'
import { usePrixod } from './PrixodStore';
import EditPrixod from './EditPrixod';
import CreatePrixod from './CreatePrixod';

function Prixod() {
    let { prixod, getPrixod, columns, handleOpenCreate, isEditing, isCreating, handleClose, handleCreate, selectedProduct, handleUpdate } = usePrixod();

    useEffect(() => {
        getPrixod();
    }, []);
    return (
        <div>
            <div className={styles.create_btn}>
                <Button type="primary" onClick={handleOpenCreate}>Qabul qilib olish</Button>
            </div>

            <Divider />

            <Table
                rowKey={'id'}
                columns={columns}
                dataSource={prixod}
                bordered
            />
            <EditPrixod
                title="Kirimni taxrirlash"
                isEditing={isEditing}
                handleClose={handleClose}
                selectedItem={selectedProduct}
                handleUpdate={handleUpdate}
            />

            {/* Reuse the generic Create modal */}
            <CreatePrixod
                title="Yangi kirimni Qo'shish"
                isCreating={isCreating}
                handleClose={handleClose}
                handleCreate={handleCreate}
            />
        </div>
    );
}

export default Prixod;