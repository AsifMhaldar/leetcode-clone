import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const useSocket = (userId) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    const socket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ['websocket', 'polling']
    });

    socket.on('connect', () => {
      socket.emit('join-feed', userId);
    });

    socketRef.current = socket;

    return () => {
      socket.emit('leave-feed', userId);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId]);

  return socketRef;
};
