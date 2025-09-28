import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set,get) => ({
    messages: [],
    users: [],
    isUsersLoading: false,
    isMessagesLoading: false,
    selectedUser: JSON.parse(localStorage.getItem("selectedUser")) || null,
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
    subscribeToMessages:()=>{
        const {selectedUser}=get();
        if(!selectedUser)return ;
        const socket = useAuthStore.getState().socket;
        socket.on("new-message",(message)=>{
            if(message.senderId !== selectedUser._id)return ;

            set({
                messages:[...get().messages,message]
            });
        })
    },
    unsubscribeToMessages:()=>{
        
        const socket=useAuthStore.getState().socket;
        if(!socket)return ;
        socket.off("new-message");  
    },
    setSelectedUser: (user) => {
    localStorage.setItem("selectedUser", JSON.stringify(user));
    set({ selectedUser: user });
  },
  
clearSelectedUser: () => {
    localStorage.removeItem("selectedUser");
    set({ selectedUser: null });
},

}))