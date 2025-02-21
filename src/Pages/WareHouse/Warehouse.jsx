import React, { useEffect } from 'react';
import { Button, Divider, Table } from 'antd';
import styles from '../../assets/css/index.module.css';
import { useWarehouse } from './Wareh';
import EditWarehouse from './EditWarehouse';
import CreateWarehouse from './CreateWarehouse';

function Warehouse() {
    const { warehouse, handleOpenCreate, columns, getWarehouse, isCreating, isEditing, handleClose, selectedProduct, handleUpdate, handleCreate } = useWarehouse();

    useEffect(() => {
        getWarehouse();
    }, []);

    return (
        <div>
            <div className={styles.create_btn}>
                <Button onClick={handleOpenCreate} type='primary'>Yangi Sklad Qo'shish</Button>
            </div>

            <Divider />
            <Table
                rowKey={'id'}
                columns={columns}
                dataSource={warehouse}
                bordered
            />

            <EditWarehouse
                title="Skladni taxrirlash"
                isEditing={isEditing}
                handleClose={handleClose}
                selectedItem={selectedProduct}
                handleUpdate={handleUpdate}
            />

            {/* Reuse the generic Create modal */}
            <CreateWarehouse
                title="Yangi Sklad Qo'shish"
                isCreating={isCreating}
                handleClose={handleClose}
                handleCreate={handleCreate}
            />
        </div>
    );
}

export default Warehouse;
