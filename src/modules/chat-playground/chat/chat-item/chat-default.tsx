import type { ChatContent } from '@/types/chat';

function ChatDefault({ chat }: { chat: ChatContent }) {
  return (
    <>
      <div>Maaf, tidak bisa menampilkan hasil</div>
      <pre>{JSON.stringify(chat, null, 2)}</pre>
    </>
  );
}

export default ChatDefault;
