import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useOut } from '../OutStore';
import Edit from './Edit';
import { useTranslation } from 'react-i18next';

function OutFlow() {
    let { columns, expandColumns, out, getOut, isEditing, handleClose, selectedProduct, handleUpdate } = useOut()
    const { t } = useTranslation(); // Initialize the translation function
    const translatedColumns = columns.map(col => ({
        ...col,
        title: t(`outcome.${col.title.toLowerCase().replace(/\s+/g, '_')}`) // Dynamically translate title
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
        getOut()
    }, [])
    return (
        <>
            <Table
                columns={translatedColumns}
                expandable={{
                    expandedRowRender: (rec) => expandedRowRender(rec.items),
                    rowExpandable: (rec) => rec.items.length > 0,
                }}
                dataSource={out.filter(rec => rec.items.length > 0)} // Filter out empty inouts
                rowKey={'id'}
            />

            <Edit
                title={t("outcome.out_edit")}
                isEditing={isEditing}
                handleClose={handleClose}
                selectedItem={selectedProduct}
                handleUpdate={handleUpdate}
            />
        </>
    );
}

export default OutFlow;