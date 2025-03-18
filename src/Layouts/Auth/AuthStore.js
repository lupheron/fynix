import axios from "axios";
import { create } from "zustand";

export const useAuth = create((set, get) => ({
    users: [],
    status: "",

    setFormData: (data) => set({ formData: data }),

    getUsers: () => {
        axios.get("http://opsurt.test/api/users")
            .then(res => {
                set({ users: res.data });
            }).catch(error => {
                console.log(error)
            })
    },

    handleRegister: (value) => {
        axios.post("http://opsurt.test/api/register", value)
            .then(res => {
                set({ status: "success" });  
                get().getUsers(); 
            })
            .catch(error => {
                set({ status: "error" }); 
                console.log(error);
            });
    },

    handleLogin: (values) => {
        axios.post("http://opsurt.test/api/login", values)
            .then(res => {
                if (res.data.token) {
                    localStorage.setItem("token", res.data.token);
                    set({ status: "success" });
                }
            })
            .catch(error => {
                set({ status: "error" })
                console.log(error)
            })

    },
}));
