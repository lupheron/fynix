import React, { useEffect } from "react";
import styles from "../../assets/css/index.module.css";
import { useProducts } from "./ProductStore";
import Edit from "./Edit";
import { Button, Divider, Table } from "antd";
import Create from "./Create";
import { useTranslation } from "react-i18next";

function Products() {
    let { products, getProducts, columns, handleOpenCreate, isEditing, isCreating, handleClose, handleCreate, selectedProduct, handleUpdate } = useProducts();
    const { t } = useTranslation(); // Get translation function

    useEffect(() => {
        getProducts();
    }, []);

    const translatedColumns = columns.map(col => ({
        ...col,
        title: t(`products.${col.title.toLowerCase().replace(/\s+/g, '_')}`) // Dynamically translate title
    }));

    return (
        <div className={styles.product_container}>
            <div className={styles.crat_container}>
                <div className={styles.create_btn}>
                    <Button onClick={handleOpenCreate} type="primary">
                        {t('products.product_create_title')} {/* Translate the button text */}
                    </Button>
                </div>
            </div>
            <br />
            <Divider />
            <Table
                rowKey={'id'}
                columns={translatedColumns}
                dataSource={products}
                bordered
            />
            <Edit
                title={t('products.product_edit_title')}
                isEditing={isEditing}
                handleClose={handleClose}
                selectedItem={selectedProduct}
                handleUpdate={handleUpdate}
            />

            <Create
                title={t('products.product_edit_title')}
                isCreating={isCreating}
                handleClose={handleClose}
                handleCreate={handleCreate}
            />
        </div>
    );
}

export default Products;