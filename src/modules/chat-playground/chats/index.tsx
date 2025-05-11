import { Send } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import ChatsHeader from "./chats-header";

export default function Chats() {

  const [messages, setMessages] = React.useState([
    {
      role: "agent",
      content: "Halo! Selamat datang di TinggalSewa. Saya asisten virtual yang akan membantu Anda mencari tempat tinggal. Apa yang sedang Anda cari?",
    },
    {
      role: "user",
      content: "Saya mencari kost dekat UI Depok dengan budget sekitar 1,5 juta per bulan",
    },
    {
      role: "agent",
      content: "Tentu! Saya akan membantu Anda mencari kost di sekitar UI Depok dengan budget 1,5 juta per bulan. Apakah Anda memiliki preferensi khusus seperti kamar mandi dalam, AC, atau fasilitas lainnya?",
    },
    {
      role: "user",
      content: "Ya, saya ingin ada kamar mandi dalam dan AC. Kalau bisa juga dekat dengan tempat makan.",
    },
    {
      role: "agent",
      content: "Baik, saya menemukan beberapa opsi kost di sekitar UI Depok dengan budget 1,5 juta yang memiliki kamar mandi dalam dan AC, serta dekat dengan tempat makan. Apakah Anda mencari kost khusus putri, putra, atau campuran?",
    },
    {
      role: "user", 
      content: "Kost putri, dan kalau bisa yang ada wifi-nya juga."
    },
  ]);
  const [input, setInput] = React.useState("");
  const inputLength = input.trim().length;

  return (
    <div className="w-full h-[100vh] flex flex-col">
      <ChatsHeader />
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
              message.role === "user"
                ? "ml-auto bg-primary text-primary-foreground"
                : "bg-muted"
            )}
          >
            {message.content}
          </div>
        ))}
      </div>
      <div className="px-4 pb-4">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (inputLength === 0) return;
            setMessages([
              ...messages,
              {
                role: "user",
                content: input,
              },
            ]);
            setInput("");
          }}
          className="flex w-full items-center space-x-2"
        >
          <Input
            id="message"
            placeholder="Cari properti..."
            className="flex-1"
            autoComplete="off"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button type="submit" size="icon" disabled={inputLength === 0}>
            <Send />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
