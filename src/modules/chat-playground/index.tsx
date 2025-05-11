import Chats from "./chats";
import ItemResults from "./item-results";

function ChatPlayground() {
  return (
    <div className="w-full h-[100vh] flex">
      <div className="flex-1 min-w-0">
        <Chats />
      </div>
      <div className="w-[400px] flex-shrink-0 md:flex hidden">
        <ItemResults />
      </div>
    </div>
  );
}

export default ChatPlayground;
