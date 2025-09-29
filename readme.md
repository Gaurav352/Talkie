# Real-Time Chat Application

A full-stack real-time chat application built with the MERN stack, Socket.IO, and DaisyUI, featuring instant messaging and online status indicators.

## Overview

This project is a modern real-time chat application that allows users to communicate instantly with real-time message delivery and online presence indicators. Built with a robust tech stack, it provides a seamless chatting experience with a beautiful, responsive UI.

## Tech Stack

### Frontend
- **React** - Frontend library for building user interfaces
- **Socket.IO Client** - Real-time bidirectional event-based communication
- **DaisyUI** - Tailwind CSS component library for beautiful UI
- **Zustand** - For state management

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data persistence
- **Mongoose** - MongoDB object modelling
- **Socket.IO** - Real-time communication engine

## Features

- ✅ Real-time messaging with Socket.IO
- ✅ Online/Offline status indicators
- ✅ User authentication and authorization
- ✅ Responsive design with DaisyUI
- ✅ Message history persistence
- ✅ User-friendly chat interface
- ✅ Real-time user presence tracking
- ✅ Private one-on-one conversations

## Installation

### Clone the repository

```bash
git clone https://github.com/Gaurav352/Talkie.git
cd chat-app
```

### Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the **Backend** directory:

```env
PORT=
MONGO_URI=
JWT_SECRET=
NODE_ENV=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### Frontend Setup

```bash
cd Frontend
npm install
```

Create a `.env` file in the **Frontend** directory:

```env
MODE=
```

## Running the Application

### Start the Backend Server

```bash
cd Backend
npm run dev
```

### Start the Frontend Application

Open a new terminal:

```bash
cd Frontend
npm run dev
```

## Future Improvements

- [ ] Group chat functionality
- [ ] Voice and video calling
- [ ] Message read receipts
- [ ] Emoji picker
- [ ] Message reactions
- [ ] Search messages functionality
- [ ] User profile customization
- [ ] Push notifications
- [ ] Typing indicators
- [ ] Last seen timestamp
- [ ] Message deletion and editing


Project Live Demo: https://chatters-a2vk.onrender.com/
