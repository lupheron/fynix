import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { Button, message, Space } from "antd";
import axios from "axios";
import { create } from "zustand";

export const useOut = create((set, get) => ({
    out: [],
    sitems: [],
    selected: [],
    isEditing: false,
    selectedProduct: null,

    setSelected: (s) => {
        let existingProduct = get().selected.find((item) => item.id === s.id);

        if (existingProduct) {
            let updatedSelection = get().selected.map((item) => {
                if (item.id === s.id) {
                    return {
                        ...item,
                        count: item.count + 1,
                        summa: (item.count + 1) * item.price // Fix summa calculation
                    };
                }
                return item;
            });

            set({ selected: updatedSelection });
        } else {
            set({
                selected: [
                    ...get().selected,
                    {
                        id: s.id,
                        pr_id: s.id,
                        name: s.name,
                        count: 1,
                        price: s.price,
                        summa: s.price // Fix initial summa
                    }
                ]
            });
        }
    },

    searchItem: (param) => {
        if (param.length >= 3) {
            axios.get(`/product/${param}`).then(res => {
                set({ sitems: res.data })
            })
        }
    },

    getOut: () => {
        axios.get('/out').then(res => {
            console.log("Fetched Data:", res.data);
            set({ out: res.data });
        });
    },

    create: (data) => {
        axios.post('/createout', data).then(res => {
            message.success("Muvaffaqiyatli qo'shildi!");
            set((state) => ({
                out: [...state.out, res.data],
                selected: []
            }));
        }).catch(err => {
            message.error("Xatolik yuz berdi: " + err.message);
        });
    },

    scolumns: [
        {
            title: 'product_name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'product_count',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: 'product_price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'product_summa',
            dataIndex: 'subTotal',
            key: 'subTotal',
            render: (_, rec) => rec.count * rec.price
        },
    ],


    // PRIXODFLOW

    expandColumns: [
        {
            title: 'product_name',
            dataIndex: 'product',
            key: 'product',
        },
        {
            title: 'product_count',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: 'product_price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'product_summa',
            dataIndex: 'summa',
            key: 'summa',
        },
        {
            title: 'product_status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                return status === 1 ? (
                    <CheckCircleTwoTone twoToneColor="#52c41a" title="Exists" />
                ) : (
                    <CloseCircleTwoTone twoToneColor="#f5222d" title="Doesn't exist" />
                );
            }
        },
        {
            title: 'tools',
            key: 'actions',
            render: (_, coming) => {
                return (
                    <Space>
                        <Button onClick={() => get().handleEdit(coming)}>✏️</Button>
                        <Button danger onClick={() => get().handleDelete(coming.id)}>🗑️</Button>
                    </Space>
                )
            }
        },
    ],

    columns: [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: "sold_day",
            dataIndex: 'day',
            key: 'day',
        },
        {
            title: "sold_month",
            dataIndex: 'month',
            key: 'month',
        },
        {
            title: "sold_year",
            dataIndex: 'year',
            key: 'year',
        },
        {
            title: 'out_summa',
            dataIndex: 'summa',
            key: 'summa',
        }
    ],


    handleEdit: (out) => {
        console.log("Editing out:", out); // Debugging: Log the out being edited
        set({ selectedProduct: out, isEditing: true }); // Open the Edit modal and set the selected product
    },

    handleUpdate: (values) => {
        const updatedValues = {
            ...values,
            status: values.status === 1 ? 1 : 0 // Enforcing status as 1 or 0
        };

        axios.put(`http://opsurt.test/api/updateout/${values.id}`, updatedValues)
            .then((response) => {
                console.log("Response from API:", response.data);
                set({ isEditing: false, selectedProduct: null });
                get().getOut();
            })
            .catch((error) => console.error("Error updating out:", error));
    },

    handleDelete: (outId) => {
        axios.delete(`/deleteout/${outId}`)
            .then(() => {
                message.success("O'chirildi!");
                get().getOut(); // Fetch latest data
            })
            .catch((error) => {
                message.error("Xatolik yuz berdi: " + error.message);
            });
    },

    handleClose: () => set({ isCreating: false, isEditing: false, selectedProduct: null }), // Close both modals
}))
