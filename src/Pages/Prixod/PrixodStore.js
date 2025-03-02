import { Button, message, Space } from "antd";
import axios from "axios";
import { create } from "zustand";

export const useComing = create((set, get) => ({
    coming: [],
    sitems: [],
    selected: [],
    isEditing: false,
    selectedProduct: null,

    setSelected: (s) => {
        let sfind = get().selected.find((item) => item.id === s.id)
        if (sfind?.id) {
            let other = get().selected.filter((item) => item.id !== s.id)
            sfind.count = ++sfind.count
            sfind.summa = sfind.count * sfind.price
            set({ selected: [...other, sfind] })
        } else {
            s = {
                id: s.id,
                pr_id: s.id,
                name: s.name,
                count: 1,
                price: s.price,
                summa: s.price * s.count
            }
            set({ selected: [...get().selected, s] })
        }
    },

    searchItem: (param) => {
        if (param.length >= 3) {
            axios.get(`/product/${param}`).then(res => {
                set({ sitems: res.data })
            })
        }
    },

    getComing: () => {
        axios.get('/coming').then(res => {
            console.log("Fetched Data:", res.data);
            set({ coming: res.data });
        });
    },

    create: (data) => {
        axios.post('/createcoming', data).then(res => {
            message.success("Muvaffaqiyatli qo'shildi!");
            set((state) => ({
                coming: [...state.coming, res.data],
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
            title: 'TR',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Qabul qilingan sana',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Yetkazib beruvchi',
            dataIndex: 'supplier',
            key: 'supplier',
        },
        {
            title: 'Jami qiymati',
            dataIndex: 'summa',
            key: 'summa',
        }
    ],


    handleEdit: (coming) => {
        console.log("Editing coming:", coming); // Debugging: Log the coming being edited
        set({ selectedProduct: coming, isEditing: true }); // Open the Edit modal and set the selected product
    },

    handleUpdate: (values) => {
        axios.put(`http://opsurt.test/api/updatecoming/${values.id}`, values)
            .then((response) => {
                console.log("Response from API:", response.data);
                set({ isEditing: false, selectedProduct: null });
                get().getComing();
            })
            .catch((error) => console.error("Error updating coming:", error));
    },

    handleDelete: (comingId) => {
        axios.delete(`/deletecoming/${comingId}`)
            .then(() => {
                message.success("O'chirildi!");
                get().getComing(); // Fetch latest data
            })
            .catch((error) => {
                message.error("Xatolik yuz berdi: " + error.message);
            });
    },

    handleClose: () => set({ isCreating: false, isEditing: false, selectedProduct: null }), // Close both modals
}))
