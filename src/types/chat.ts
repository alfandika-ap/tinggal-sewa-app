export type ChatRole = "user" | "assistant" | "function";


export type ChatTextItem = {
  type: "text";
  data: string;
};

export type ChatDefaultItem = {
  type: "default";
  data: string;
}; 

export type FunctionName = "get_weather" | "search_properties";

export type ChatFunctionItem<T = string> = {
  type: "function_result";
  name: FunctionName;
  data: T;
};

export type ChatContent = ChatTextItem | ChatDefaultItem | ChatFunctionItem;

export type ChatItem = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
  updatedAt: string;
  function_name?: FunctionName;
};
