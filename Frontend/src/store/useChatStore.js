import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useChatStore = create((set,get) => ({
    messages: [],
    users: [],
    isUsersLoading: false,
    isMessagesLoading: false,
    selectedUser:null,
    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/getUsersForSidebar");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },
    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },
    sendMessages:async (messageData)=>{
        const {messages,selectedUser}=get();
        try {
            const res=await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);
            set({messages:[...messages,res.data]});
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    setSelectedUser:(selectedUser)=>set({selectedUser}),

}))