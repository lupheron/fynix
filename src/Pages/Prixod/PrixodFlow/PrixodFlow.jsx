import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useComing } from '../PrixodStore';

function PrixodFlow() {
    // let { coming, getData, expandColumns, } = usePrixodFlow()
    let { dataSource, columns, expandColumns, selected, setSelected, create, coming, getComing } = useComing()
    const expandedRowRender = () => (
        <Table
            columns={expandColumns}
            dataSource={coming}
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
                    expandedRowRender,
                    defaultExpandedRowKeys: ['0'],
                }}
                dataSource={coming} // Changed from dataSource to coming
                rowKey={'id'} // Ensure unique row key
            />

        </>
    );
}

export default PrixodFlow;