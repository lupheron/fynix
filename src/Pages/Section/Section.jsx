import React, { useEffect } from 'react';
import styles from '../../assets/css/index.module.css'
import { Button, Divider, Table } from 'antd';
import SecCreate from './SecCreate';
import SecEdit from './SecEdit';
import { useSection } from './SectionStore';
import { useTranslation } from 'react-i18next';


function Section() {
    const { section, handleOpenCreate, columns, getSection, isCreating, isEditing, handleClose, selectedProduct, handleUpdate, handleCreate } = useSection();
    const { t } = useTranslation(); // Get translation function

    useEffect(() => {
        getSection(); // ✅ Function is now callable
    }, []);

    const translatedColumns = columns.map(col => ({
        ...col,
        title: t(`sections.${col.title.toLowerCase().replace(/\s+/g, '_')}`) // Dynamically translate title
    }));
    return (
        <div>
            <div className={styles.create_btn}>
                <Button onClick={handleOpenCreate} type="primary">
                    {t('sections.section_create_title')} {/* Translate the button text */}
                </Button>
            </div>
            <br />
            <Divider />
            <Table
                rowKey={'id'}
                columns={translatedColumns}
                dataSource={section}
                bordered
            />

            <SecEdit
                title={t('sections.section_edit_title')}
                isEditing={isEditing}
                handleClose={handleClose}
                selectedItem={selectedProduct}
                handleUpdate={handleUpdate}
            />

            {/* Reuse the generic Create modal */}
            <SecCreate
                title={t('sections.section_edit_title')}
                isCreating={isCreating}
                handleClose={handleClose}
                handleCreate={handleCreate}
            />
        </div>
    );
}

export default Section;