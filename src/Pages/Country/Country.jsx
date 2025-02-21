import React, { useEffect } from 'react';
import { useCountry } from './CountryStore';
import { Button, Divider, Table } from 'antd';
import Edit from './Edit';
import Create from './Create';
import styles from '../../assets/css/index.module.css'

function Country() {
    const { country, handleOpenCreate, columns, getCountry, isCreating, isEditing, handleClose, selectedProduct, handleUpdate, handleCreate } = useCountry();

    useEffect(() => {
        getCountry();
    }, []);
    return (
        <div>
            <div className={styles.create_btn}>
                <Button onClick={handleOpenCreate} type='primary'>Yangi Davlat Qo'shish</Button>
            </div>

            <Divider />
            <Table
                rowKey={'id'}
                columns={columns}
                dataSource={country}
                bordered
            />

            <Edit
                title="Davlatni taxrirlash"
                isEditing={isEditing}
                handleClose={handleClose}
                selectedItem={selectedProduct}
                handleUpdate={handleUpdate}
            />

            {/* Reuse the generic Create modal */}
            <Create
                title="Yangi Davlat Qo'shish"
                isCreating={isCreating}
                handleClose={handleClose}
                handleCreate={handleCreate}
            />
        </div>
    );
}

export default Country;