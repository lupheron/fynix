import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useOut } from '../OutStore';
import Edit from './Edit';

function OutFlow() {
    let { columns, expandColumns, out, getOut, isEditing, handleClose, selectedProduct, handleUpdate } = useOut()
    const expandedRowRender = (items) => (
        <Table
            columns={expandColumns}
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
                columns={columns}
                expandable={{
                    expandedRowRender: (rec) => expandedRowRender(rec.items),
                    rowExpandable: (rec) => rec.items.length > 0,
                }}
                dataSource={out.filter(rec => rec.items.length > 0)} // Filter out empty inouts
                rowKey={'id'}
            />

            <Edit
                title="Chiqimni taxrirlash"
                isEditing={isEditing}
                handleClose={handleClose}
                selectedItem={selectedProduct}
                handleUpdate={handleUpdate}
            />
        </>
    );
}

export default OutFlow;