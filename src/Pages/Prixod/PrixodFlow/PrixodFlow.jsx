import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useComing } from '../PrixodStore';
import Edit from './Edit';

function PrixodFlow() {
    // let { coming, getData, expandColumns, } = usePrixodFlow()
    let { columns, expandColumns, coming, getComing, isEditing, handleClose, selectedProduct, handleUpdate } = useComing()
    const expandedRowRender = (items) => (
        <Table
            columns={expandColumns}
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
            columns={columns}
            expandable={{
                expandedRowRender: (rec) => expandedRowRender(rec.items),
                rowExpandable: (rec) => rec.items.length > 0,
            }}
            dataSource={coming.filter(rec => rec.items.length > 0)} // Filter out empty incomings
            rowKey={'id'}
        />

        <Edit
            title="Mahsulotni taxrirlash"
            isEditing={isEditing}
            handleClose={handleClose}
            selectedItem={selectedProduct}
            handleUpdate={handleUpdate}
        />
    </>
    );
}

export default PrixodFlow;