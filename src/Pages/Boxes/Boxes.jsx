import React, { useEffect } from 'react';
import styles from '../../assets/css/index.module.css'
import { Button, Divider, Table } from 'antd';
import { useBoxes } from './BoxesStore';
import BoxEdit from './BoxEdit';
import BoxCreate from './BoxCreate';

function Boxes() {
    const { boxes, handleOpenCreate, columns, getBoxes, isCreating, isEditing, handleClose, selectedProduct, handleUpdate, handleCreate } = useBoxes();

    useEffect(() => {
        getBoxes(); // ✅ Function is now callable
    }, []);

    const userFields = [
        { name: 'box_name', label: "Quti nomi", rules: [{ required: true, message: "Quti nomini kiriting!" }], type: 'text' }
    ]
    return (
        <div>
            <div className={styles.create_btn}>
                <Button onClick={handleOpenCreate} type='primary'>Yangi Quti Qo'shish</Button>
            </div>

            <Divider />
            <Table
                rowKey={'id'}
                columns={columns}
                dataSource={boxes}
                bordered
            />

            <BoxEdit
                title="Qutini taxrirlash"
                isEditing={isEditing}
                handleClose={handleClose}
                selectedItem={selectedProduct}
                handleUpdate={handleUpdate}
                fields={userFields}
            />

            {/* Reuse the generic Create modal */}
            <BoxCreate
                title="Yangi Quti Qo'shish"
                isCreating={isCreating}
                handleClose={handleClose}
                handleCreate={handleCreate}
                fields={userFields}
            />
        </div>
    );
}

export default Boxes;