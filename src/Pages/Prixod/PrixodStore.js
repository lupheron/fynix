import { Button, message, Space } from "antd";
import axios from "axios";
import { create } from "zustand";

export const useComing = create((set, get) => ({
    coming: [],
    ed: {},
    sitems: [],
    selected: [],
    dataSource: [],
    setSelected: (s) => {

        let sfind = get().selected.find((item) => item.id === s.id)
        if (sfind?.id) {
            console.log('sfind', sfind);

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
            title: 'Keltirilgan kuni',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Yetkazuvchi',
            dataIndex: 'supplier',
            key: 'supplier',
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
            title: 'Mahsulot',
            dataIndex: 'product',
            key: 'product',
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
