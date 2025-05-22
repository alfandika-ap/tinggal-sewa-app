import type { ChatContent, ChatFunctionItem } from "@/types/chat";
import WeatherFunction from "./weather-function";
import SearchPropertiesFunction from "./search-properties-function";

export default function ChatFunction({ chat }: { chat: ChatContent }) {
  const chatFunction = chat as ChatFunctionItem;
  switch (chatFunction.name) {
    case "get_weather":
      return <WeatherFunction chat={chat} />;
    case "search_properties":
      return <SearchPropertiesFunction chat={chat} />;
    default:
      return <p>Unknown function</p>;
  }
}