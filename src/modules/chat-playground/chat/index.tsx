import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";
import ChatList from "./chat-list";

export default function Chat() {

  return (
    <div className="w-full h-[100vh] flex flex-col">
      <ChatHeader />
      <div 
        className="flex-1 overflow-y-auto p-4"
      >
        <ChatList />
      </div>
      <div className="p-4 border-t">
        <ChatInput />
      </div>
    </div>
  );
}
