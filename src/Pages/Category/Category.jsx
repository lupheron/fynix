import React, { useEffect } from 'react';
import { Button, Divider, Table } from 'antd';
import Edit from './Edit';
import Create from './Create';
import styles from '../../assets/css/index.module.css'
import { useCategory } from './CategoryStore';
import { useTranslation } from 'react-i18next';

function Category() {
    const { category, handleOpenCreate, columns, getCategory, isCreating, isEditing, handleClose, selectedProduct, handleUpdate, handleCreate } = useCategory();
    const { t } = useTranslation(); // Get translation function

    useEffect(() => {
        getCategory();
    }, []);

    // Translate columns dynamically here
    const translatedColumns = columns.map(col => ({
        ...col,
        title: t(`categories.${col.title.toLowerCase().replace(/\s+/g, '_')}`) // Dynamically translate title
    }));

    return (
        <div>
            <div className={styles.create_btn}>
                <Button onClick={handleOpenCreate} type='primary'>
                    {t('categories.category_create_title')} {/* Translate the button text */}
                </Button>
            </div>

            <Divider />
            <Table
                rowKey={'id'}
                columns={translatedColumns}
                dataSource={category}
                bordered
            />

            <Edit
                title={t('categories.category_edit_title')}
                isEditing={isEditing}
                handleClose={handleClose}
                selectedItem={selectedProduct}
                handleUpdate={handleUpdate}
            />

            {/* Reuse the generic Create modal */}
            <Create
                title={t('categories.category_create_title')}
                isCreating={isCreating}
                handleClose={handleClose}
                handleCreate={handleCreate}
            />
        </div>
    );
}

export default Category;