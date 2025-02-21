import React, { useEffect } from "react";
import styles from "../../assets/css/index.module.css";
import { useProducts } from "./ProductStore";
import Edit from "./Edit";
import { Button, Divider, Table } from "antd";
import Create from "./Create";

function Products() {
    let { products, getProducts, users, columns, handleOpenCreate, isEditing, isCreating, handleClose, handleCreate, selectedProduct, handleUpdate } = useProducts();

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className={styles.product_container}>
            <div className={styles.crat_container}>
                <div className={styles.dropdownContainer}>
                    <select className={styles.dropdown}>
                        <option value="">Mijozni tanlang</option>
                        {users.map((u) => (
                            <option key={u.id} value={u.name}>{u.name}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.create_btn}>
                    <Button type="primary" onClick={handleOpenCreate}>Mahsulot Qo'shish</Button>
                </div>
            </div>
            <Divider />
            <Table
                rowKey={'id'}
                columns={columns}
                dataSource={products}
                bordered
            />
            <Edit
                title="Mahsulotni taxrirlash"
                isEditing={isEditing}
                handleClose={handleClose}
                selectedItem={selectedProduct}
                handleUpdate={handleUpdate}
            />

            <Create
                title="Yangi mahsulot Qo'shish"
                isCreating={isCreating}
                handleClose={handleClose}
                handleCreate={handleCreate}
            />
        </div>
    );
}

export default Products;