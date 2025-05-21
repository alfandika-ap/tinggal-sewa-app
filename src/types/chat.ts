export type ChatRole = "user" | "assistant";


export type ChatTextItem = {
  type: "text";
  data: string;
};

export type ChatDefaultItem = {
  type: "default";
  data: string;
}; 

export type FunctionName = "get_weather";

export type ChatFunctionItem = {
  type: "function_result";
  name: FunctionName;
  data: string;
};

export type ChatContent = ChatTextItem | ChatDefaultItem | ChatFunctionItem;

export type ChatItem = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
  updatedAt: string;
};
