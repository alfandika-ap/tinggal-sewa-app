import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import useChatSearchResultStore from "@/store/chat-search-result-store";
import { useEffect, useState } from "react";
import Chat from "./chat";
import ItemResults from "./item-results";

function ChatPlayground() {
  const [sidebarSize, setSidebarSize] = useState(20);
  const chat = useChatSearchResultStore(state => state.chat);

  const minSidebarSize = chat ? 35 : 15; 
  const maxSidebarSize = 50;
  
  useEffect(() => {
    const storedSize = localStorage.getItem("chat-sidebar-size");
    if (storedSize) {
      setSidebarSize(Number(storedSize));
    }
  }, []);
  
  const handleResize = (sizes: number[]) => {
    if (sizes && sizes.length > 1 && typeof sizes[1] === 'number') {
      const newSize = sizes[1]; 
      setSidebarSize(newSize);
      localStorage.setItem("chat-sidebar-size", String(newSize));
    }
  };
  
  return (
    <div className="w-full h-[100vh]">
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={handleResize}
        className="h-full"
      >
        <ResizablePanel 
          defaultSize={100 - sidebarSize}
          minSize={50}
          className="relative"
        >
          <Chat />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel 
          defaultSize={sidebarSize}
          minSize={minSidebarSize}
          maxSize={maxSidebarSize}
          className="relative"
        >
          <ItemResults />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default ChatPlayground;
