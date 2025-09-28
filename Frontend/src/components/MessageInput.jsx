import React from 'react';
import { useState, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import { Image, Send, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

const MessageInput = () => {
    const [text, setText] = useState("");
    const [preview, setPreview] = useState(null);
    const [image, setImage] = useState(null);
    const { sendMessages } = useChatStore();
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const validTypes = ["image/png", "image/jpg", "image/jpeg"];
        if (!validTypes.includes(file.type)) {
            toast.error("Only PNG, JPG, and JPEG files are allowed!");
            e.target.value = "";
            return;
        }
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const removeImage = () => {
        setImage(null);
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !image) return;

        const formData = new FormData();
        if (image) {
            formData.append("image", image);
        }
        formData.append("text", text);

        await sendMessages(formData);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        setImage(null);
        setText("");
        setPreview(null);
    };

    // The root div is removed, and the form becomes the main container.
    return (
        <form onSubmit={handleSendMessage} className="p-4 flex flex-col gap-3">
            {/* 1. PREVIEW IS NOW *INSIDE* THE FORM */}
            {preview && (
                <div className="w-fit relative"> {/* w-fit on the container here */}
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                    />
                    <button
                        onClick={removeImage}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
                         flex items-center justify-center"
                        type="button"
                    >
                        <X className="size-3" />
                    </button>
                </div>
            )}

            {/* 2. ALL INPUTS ARE GROUPED IN A DIV FOR HORIZONTAL LAYOUT */}
            <div className="flex items-center gap-2">
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                    <button
                        type="button"
                        className={`hidden sm:flex btn btn-circle
                            ${preview ? "text-emerald-500" : "text-zinc-400"}`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image size={20} />
                    </button>
                </div>
                <button
                    type="submit"
                    className="btn btn-sm btn-circle"
                    disabled={!text.trim() && !preview}
                >
                    <Send size={22} />
                </button>
            </div>
        </form>
    );
}

export default MessageInput;