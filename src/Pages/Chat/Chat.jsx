import { SendOutlined } from "@ant-design/icons";
import { Button, Form, Input, List } from "antd";
import React, { useEffect, useState } from "react";
import css from "../../assets/css/chat.module.css";
import { useUsers } from "../Users/UsersStore";
import { io } from "socket.io-client";
import { useForm } from "antd/es/form/Form";
import { useTranslation } from "react-i18next";

const socket = io("http://localhost:4000");

function Chat() {
    const [form] = useForm();
    const [messages, setMessages] = useState([]);
    const { users, getUsers } = useUsers();

    const storedUsername = localStorage.getItem("username");
    const username = storedUsername ? storedUsername : "Guest";
    const { t } = useTranslation(); // Get translation function

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        socket.emit("join", username);

        socket.on("chatHistory", (history) => {
            setMessages(history);
        });

        socket.on("message", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        socket.on("clearChat", () => {
            setMessages([]);
        });

        return () => {
            socket.off("message");
            socket.off("chatHistory");
            socket.off("clearChat");
        };
    }, [username]);

    const sendMessage = (values) => {
        if (values.message.trim() !== "") {
            socket.emit("message", { userId: username, message: values.message });
            form.resetFields();
        }
    };

    return (
        <div>
            <h1> {t('chats.business_chat')}</h1>
            <div className={css.chat_container}>
                <aside className={css.chat_aside}>
                    <List
                        size="large"
                        header={<div> {t('chats.business_chat_history')}</div>}
                        dataSource={users}
                        renderItem={(item) => (
                            <List.Item style={{ color: "white" }}>
                                {item.name}
                            </List.Item>
                        )}
                        style={{ color: "white" }}
                    />
                </aside>

                <main className={css.chat_main}>
                    <div className={css.chat_messages_container}>
                        <div className={css.messages}>
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={
                                        msg.userId === username
                                            ? css.chat_message_me
                                            : css.chat_message
                                    }
                                >
                                    <h4>{msg.userId}</h4>
                                    <p>{msg.message}</p>
                                </div>
                            ))}
                        </div>
                        <div className={css.messages_send}>
                            <Form
                                form={form}
                                name="basic"
                                style={{ display: "flex", alignItems: "center" }}
                                onFinish={sendMessage}
                            >
                                <Form.Item name="message">
                                    <Input
                                        placeholder={t('chats.business_chat_type')}
                                        style={{ width: "400px", marginRight: "10px" }}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        {t('chats.business_chat_send')} <SendOutlined />
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Chat;