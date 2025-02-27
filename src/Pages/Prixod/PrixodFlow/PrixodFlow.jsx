import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useComing } from '../PrixodStore';

function PrixodFlow() {
    // let { coming, getData, expandColumns, } = usePrixodFlow()
    let { columns, expandColumns, coming, getComing } = useComing()
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
                    defaultExpandedRowKeys: ['0'],
                }}
                dataSource={coming} // Changed from dataSource to coming
                rowKey={'id'} // Ensure unique row key
            />

        </>
    );
}

export default PrixodFlow;