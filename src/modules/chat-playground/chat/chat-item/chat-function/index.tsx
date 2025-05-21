import type { ChatContent } from "@/types/chat";
import WeatherFunction from "./weather-function";

export default function ChatFunction({ chat }: { chat: ChatContent }) {
  switch (chat.type) {
    case "function_result":
      return <WeatherFunction chat={chat} />;
    default:
      return <p>Unknown function</p>;
  }
}