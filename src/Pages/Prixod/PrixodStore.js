import { message } from "antd";
import axios from "axios";
import { create } from "zustand";

export const useComing = create((set, get) => ({
    coming: [],
    ed: {},
    sitems: [],
    selected: [],
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
            dataIndex: 'pr_name',
            key: 'pr_name',
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
    create: (data) => {
        axios.post('/createcoming', data).then(res => {
            message.success("Muvaffaqiyatli qo'shildi!")
            set({ selected: [] })
        })
    },
    getComing: () => {
        axios.get('/createcoming').then(res => {
            set({ coming: res.data })
        })
    }
}))
