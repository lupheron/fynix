import React, { useEffect } from 'react';
import { useCountry } from './CountryStore';
import { Button, Divider, Table } from 'antd';
import Edit from './Edit';
import Create from './Create';
import styles from '../../assets/css/index.module.css'
import { useTranslation } from 'react-i18next';

function Country() {
    const { country, handleOpenCreate, columns, getCountry, isCreating, isEditing, handleClose, selectedProduct, handleUpdate, handleCreate } = useCountry();
    const { t } = useTranslation(); // Get translation function
    useEffect(() => {
        getCountry();
    }, []);


    return (
        <div>
            <div className={styles.create_btn}>
                <Button onClick={handleOpenCreate} type="primary">
                    {t('countries.country_create_title')} {/* Translate the button text */}
                </Button>
            </div>
            <br />
            <Divider />
            <Table
                rowKey={'id'}
                columns={columns}
                dataSource={country}
                bordered
            />

            <Edit
                title={t('countries.country_edit_title')}
                isEditing={isEditing}
                handleClose={handleClose}
                selectedItem={selectedProduct}
                handleUpdate={handleUpdate}
            />

            {/* Reuse the generic Create modal */}
            <Create
                title={t('countries.country_create_title')}
                isCreating={isCreating}
                handleClose={handleClose}
                handleCreate={handleCreate}
            />
        </div>
    );
}

export default Country;