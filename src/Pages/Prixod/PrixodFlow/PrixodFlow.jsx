import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useComing } from '../PrixodStore';
import Edit from './Edit';
import { useTranslation } from 'react-i18next';

function PrixodFlow() {
    let { columns, expandColumns, coming, getComing, isEditing, handleClose, selectedProduct, handleUpdate } = useComing()
    const { t } = useTranslation(); // Initialize the translation function
    const translatedColumns = columns.map(col => ({
        ...col,
        title: t(`coming.${col.title.toLowerCase().replace(/\s+/g, '_')}`) // Dynamically translate title
    }));
    const translatedColumn2 = expandColumns.map(col => ({
        ...col,
        title: t(`products.${col.title.toLowerCase().replace(/\s+/g, '_')}`) // Dynamically translate title
    }));
    const expandedRowRender = (items) => (
        <Table
            columns={translatedColumn2}
            dataSource={items}
            pagination={false}
            rowKey={'id'}
        />
    );

    useEffect(() => {
        getComing()
    }, [])
    return (
        <>
            <Table
                columns={translatedColumns}
                expandable={{
                    expandedRowRender: (rec) => expandedRowRender(rec.items),
                    rowExpandable: (rec) => rec.items.length > 0,
                }}
                dataSource={coming.filter(rec => rec.items.length > 0)} // Filter out empty incomings
                rowKey={'id'}
            />

            <Edit
                title={t('coming.coming_edit')}
                isEditing={isEditing}
                handleClose={handleClose}
                selectedItem={selectedProduct}
                handleUpdate={handleUpdate}
            />
        </>
    );
}

export default PrixodFlow;