"use client";

import Pusher from "pusher-js";
import { useEffect, useState } from "react";

export default function ChatMessages() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    Pusher.logToConsole = true; // debug connection
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("chat-channel");
    channel.bind("new-message", (data: any) => {
      setMessages((prev) => {
        const updated = [...prev, data];
        console.log("Received:", updated);
        return updated;
      });
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []);

  return (
    <div>
      {messages.map((m, i) => (
        <p key={i}>{m.text}</p>
      ))}
    </div>
  );
}
