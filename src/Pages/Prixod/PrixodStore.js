import { Button, message, Space } from "antd";
import axios from "axios";
import { create } from "zustand";

export const useComing = create((set, get) => ({
    coming: [],
    ed: {},
    sitems: [],
    selected: [],
    dataSource: [],
    in_items: [],
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
                summa: s.price * s.count  // Problem here
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
            title: 'Uskunalar',
            key: 'actions',
            render: () => (
                <Space size="middle">
                    <Button onClick={() => get().handleEdit()}>✏️</Button>
                    <Button danger onClick={() => get().handleDelete()}>🗑️</Button>
                </Space>
            ),
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
        },
        {
            title: 'Action',
            key: 'operation',
            render: () => <a>Publish</a>,
        },
    ],

    create: (data) => {
        axios.post('/createcoming', data).then(res => {
            message.success("Muvaffaqiyatli qo'shildi!");

            // Add the new order to `coming` state
            set((state) => ({
                coming: [...state.coming, res.data],
                selected: []
            }));
        }).catch(err => {
            message.error("Xatolik yuz berdi: " + err.message);
        });
    },

    getComing: () => {
        axios.get('/coming').then(res => {
            set({ coming: res.data })

        })
    },
}))
