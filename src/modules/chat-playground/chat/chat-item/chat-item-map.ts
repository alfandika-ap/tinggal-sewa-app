import ChatText from "./chat-text";
import ChatDefault from "./chat-default";
import ChatFunction from "./chat-function";

export const chatItemMap = {
  text: ChatText,
  default: ChatDefault,
  function_result: ChatFunction,
};