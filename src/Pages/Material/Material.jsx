import React, { useEffect } from 'react';
import { Button, Divider, Table } from 'antd';
import Edit from './Edit';
import Create from './Create';
import styles from '../../assets/css/index.module.css'
import { useMaterial } from './MaterialStore';
import { useTranslation } from 'react-i18next';

function Material() {
    const { material, handleOpenCreate, columns, getMaterial, isCreating, isEditing, handleClose, selectedProduct, handleUpdate, handleCreate } = useMaterial();
    const { t } = useTranslation(); // Get translation function

    useEffect(() => {
        getMaterial();
    }, []);

    const translatedColumns = columns.map(col => ({
        ...col,
        title: t(`materials.${col.title.toLowerCase().replace(/\s+/g, '_')}`) // Dynamically translate title
    }));
    return (
        <div>
            <div className={styles.create_btn}>
                <Button onClick={handleOpenCreate} type='primary'>{t("materials.material_create_title")}</Button>
            </div>
            <br />
            <Divider />
            <Table
                rowKey={'id'}
                columns={translatedColumns}
                dataSource={material}
                bordered
            />

            <Edit
                title={t("materials.material_edit_title")}
                isEditing={isEditing}
                handleClose={handleClose}
                selectedItem={selectedProduct}
                handleUpdate={handleUpdate}
            />

            {/* Reuse the generic Create modal */}
            <Create
                title={t("materials.material_create_title")}
                isCreating={isCreating}
                handleClose={handleClose}
                handleCreate={handleCreate}
            />
        </div>
    );
}

export default Material;