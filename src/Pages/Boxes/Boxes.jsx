import React, { useEffect } from 'react';
import styles from '../../assets/css/index.module.css';
import { Button, Divider, Table } from 'antd';
import { useBoxes } from './BoxesStore';
import BoxEdit from './BoxEdit';
import BoxCreate from './BoxCreate';
import { useTranslation } from 'react-i18next';

function Boxes() {
    const { boxes, handleOpenCreate, columns, getBoxes, isCreating, isEditing, handleClose, selectedProduct, handleUpdate, handleCreate } = useBoxes();
    const { t } = useTranslation(); // Get translation function

    useEffect(() => {
        getBoxes(); // ✅ Function is now callable
    }, []);

    // Translate columns dynamically here
    const translatedColumns = columns.map(col => ({
        ...col,
        title: t(`boxes.${col.title.toLowerCase().replace(/\s+/g, '_')}`) // Dynamically translate title
    }));

    return (
        <div>
            <div className={styles.create_btn}>
                <Button onClick={handleOpenCreate} type="primary">
                    {t('boxes.box_create_title')} {/* Translate the button text */}
                </Button>
            </div>
            <br />
            <Divider />
            <Table
                rowKey="id"
                columns={translatedColumns} // Use translated columns here
                dataSource={boxes}
                bordered
            />

            <BoxEdit
                title={t('boxes.box_edit_title')} // Translate the modal title
                isEditing={isEditing}
                handleClose={handleClose}
                selectedItem={selectedProduct}
                handleUpdate={handleUpdate}
            />

            <BoxCreate
                title={t('boxes.box_create_title')} // Translate the modal title
                isCreating={isCreating}
                handleClose={handleClose}
                handleCreate={handleCreate}
            />
        </div>
    );
}

export default Boxes;
