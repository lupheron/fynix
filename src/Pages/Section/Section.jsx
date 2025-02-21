import React, { useEffect } from 'react';
import styles from '../../assets/css/index.module.css'
import { Button, Divider, Table } from 'antd';
import SecCreate from './SecCreate';
import SecEdit from './SecEdit';
import { useSection } from './SectionStore';


function Section() {
    const { section, handleOpenCreate, columns, getSection, isCreating, isEditing, handleClose, selectedProduct, handleUpdate, handleCreate } = useSection();

    useEffect(() => {
        getSection(); // ✅ Function is now callable
    }, []);

    const userFields = [
        { name: 'sec_name', label: "Bo'lim nomi", rules: [{ required: true, message: "Bo'lim nomini kiriting!" }], type: 'text' }
    ]
    return (
        <div>
            <div className={styles.create_btn}>
                <Button onClick={handleOpenCreate} type='primary'>Yangi Bo'lim Qo'shish</Button>
            </div>

            <Divider />
            <Table
                rowKey={'id'}
                columns={columns}
                dataSource={section}
                bordered
            />

            <SecEdit
                title="Bo'limni taxrirlash"
                isEditing={isEditing}
                handleClose={handleClose}
                selectedItem={selectedProduct}
                handleUpdate={handleUpdate}
                fields={userFields}
            />

            {/* Reuse the generic Create modal */}
            <SecCreate
                title="Yangi Bo'lim Qo'shish"
                isCreating={isCreating}
                handleClose={handleClose}
                handleCreate={handleCreate}
                fields={userFields}
            />
        </div>
    );
}

export default Section;