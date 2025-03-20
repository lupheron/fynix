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
            title: 'Maxsulot nomi',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Soni',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: 'Narxi',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Summa',
            dataIndex: 'subTotal',
            key: 'subTotal',
            render: (_, rec) => rec.count * rec.price
        },
    ],


    // PRIXODFLOW

    expandColumns: [
        {
            title: 'Maxsulot',
            dataIndex: 'product',
            key: 'product',
        },
        {
            title: 'Soni',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: 'Narx',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Jami',
            dataIndex: 'summa',
            key: 'summa',
        },
        {
            title: 'Holati',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                if (status === 1) {
                    return "Mavjud"
                } else {
                    return "O'chrilgan"
                }
            }
        },
        {
            title: 'Uskunalar',
            key: 'actions',
            render: (_, out) => {
                return (
                    <Space>
                        <Button onClick={() => get().handleEdit(out)}>✏️</Button>
                        <Button danger onClick={() => get().handleDelete(out.id)}>🗑️</Button>
                    </Space>
                )
            }
        },
    ],

    columns: [
        {
            title: 'TR',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: "Prixod bo'lgan kun",
            dataIndex: 'day',
            key: 'day',
        },
        {
            title: "Prixod bo'lgan oy",
            dataIndex: 'month',
            key: 'month',
        },
        {
            title: "Prixod bo'lgan yil",
            dataIndex: 'year',
            key: 'year',
        },
        {
            title: 'Jami qiymati',
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
