import React, { useEffect } from 'react';
import { Button, Divider, Table } from 'antd';
import styles from '../../assets/css/index.module.css';
import { useWarehouse } from './Wareh';
import EditWarehouse from './EditWarehouse';
import CreateWarehouse from './CreateWarehouse';
import { useTranslation } from 'react-i18next';

function Warehouse() {
    const { warehouse, handleOpenCreate, columns, getWarehouse, isCreating, isEditing, handleClose, selectedProduct, handleUpdate, handleCreate } = useWarehouse();
    const { t } = useTranslation(); // Get translation function

    useEffect(() => {
        getWarehouse();
    }, []);

    const translatedColumns = columns.map(col => ({
        ...col,
        title: t(`warehouses.${col.title.toLowerCase().replace(/\s+/g, '_')}`) // Dynamically translate title
    }));

    return (
        <div>
            <div className={styles.create_btn}>
                <Button onClick={handleOpenCreate} type="primary">
                    {t('warehouses.warehouse_create_title')} {/* Translate the button text */}
                </Button>
            </div>
            <br />
            <Divider />
            <Table
                rowKey={'id'}
                columns={translatedColumns}
                dataSource={warehouse}
                bordered
            />

            <EditWarehouse
                title={t('warehouses.warehouse_edit_title')}
                isEditing={isEditing}
                handleClose={handleClose}
                selectedItem={selectedProduct}
                handleUpdate={handleUpdate}
            />

            {/* Reuse the generic Create modal */}
            <CreateWarehouse
                title={t('warehouses.warehouse_edit_title')}
                isCreating={isCreating}
                handleClose={handleClose}
                handleCreate={handleCreate}
            />
        </div>
    );
}

export default Warehouse;
