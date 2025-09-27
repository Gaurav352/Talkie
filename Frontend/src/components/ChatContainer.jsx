import React from "react";
import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react"; // Make sure useRef is imported
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
	const { messages, selectedUser, isMessagesLoading, getMessages } = useChatStore();
	const { authUser } = useAuthStore();
	const messageEndRef = useRef(null);

	// This effect fetches messages when the user changes
	useEffect(() => {
		getMessages(selectedUser._id);
	}, [selectedUser._id, getMessages]);

	// --> ADDED THIS: This effect handles the automatic scrolling
	useEffect(() => {
		// Use optional chaining (?) to prevent errors if the element isn't rendered yet
		messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]); // It runs every time the 'messages' array updates

	if (isMessagesLoading) {
		return (
			<div className='flex-1 flex flex-col overflow-auto'>
				<ChatHeader />
				<MessageSkeleton />
				<MessageInput />
			</div>
		);
	}

	return (
		<div className='flex-1 flex flex-col overflow-auto'>
			<ChatHeader />

			<div className='flex-1 overflow-y-auto p-4 space-y-4'>
				{messages.map((message) => (
					<div
						key={message._id}
						className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
						// --> MOVED/REMOVED THIS: The ref is no longer on every message
					>
						<div className=' chat-image avatar'>
							<div className='size-10 rounded-full border'>
								<img
									src={
										message.senderId === authUser._id
											? authUser.profilePic || "/avatar.png"
											: selectedUser.profilePic || "/avatar.png"
									}
									alt='profile pic'
								/>
							</div>
						</div>
						<div className='chat-header mb-1'>
							<time className='text-xs opacity-50 ml-1'>{formatMessageTime(message.createdAt)}</time>
						</div>
						<div className='chat-bubble flex flex-col'>
							{message.image && (
								<img
									src={message.image}
									alt='Attachment'
									className='sm:max-w-[200px] rounded-md mb-2'
								/>
							)}
							{message.text && <p>{message.text}</p>}
						</div>
					</div>
				))}
                
                {/* --> ADDED THIS: An empty div at the end to act as a stable scroll target */}
                <div ref={messageEndRef} />
			</div>

			<MessageInput />
		</div>
	);
};

export default ChatContainer;