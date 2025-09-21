import { ChatInputSkeleton } from "@/components/skeletons/chat-skeletons";
import Button from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Send } from "lucide-react";
import { User } from "next-auth";
import React, { useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
export default function ChatInput({
  chatPartner,
  chatId,
}: {
  chatPartner: User | undefined;
  chatId: string;
}) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [input, setInput] = useState("");
  const utils = trpc.useUtils();
  const { mutate: sendMessage, isPending } = trpc.chats.sendMessage.useMutation(
    {
      onSuccess: () => {
        setInput("");
        utils.chats.getInitialChatMessages.invalidate();
      },
    }
  );

  return (
    <div className="border-t sticky bottom-0 bg-background    border-zinc-800 px-4 py-4 mb-2 flex gap-2 items-end ">
      {!chatPartner ? (
        <div className="flex-1">
          <ChatInputSkeleton />
        </div>
      ) : (
        <>
          {" "}
          <div className="relative flex-1  my-auto overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-primary focus-within:ring-2 transition-all">
            <TextareaAutosize
              ref={textAreaRef}
              onKeyDown={(e) => {
                if (isPending) {
                  return;
                }
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage({
                    receiverId: chatPartner.id,
                    text: input,
                    chatId,
                  });
                }
              }}
              onChange={(e) => setInput(e.target.value)}
              rows={1}
              value={input}
              placeholder={`Message ${chatPartner.name}`}
              className="block w-full resize-none min-h-10 text-sm  sm:min-h-24 border-0 p-2 bg-transparent text-gray-50 placeholder:text-gray-500 font-medium focus:ring-0 sm:py-1.5 sm:leading-6"
            />
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              sendMessage({
                receiverId: chatPartner.id,
                text: input,
                chatId,
              });
            }}
            isLoading={isPending}
            className="  h-10  sm:hidden"
          >
            <Send />{" "}
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              sendMessage({
                receiverId: chatPartner.id,
                text: input,
                chatId,
              });
            }}
            isLoading={isPending}
            className="  h-10  hidden sm:inline-flex absolute right-6 bottom-6"
          >
            <Send />
          </Button>
        </>
      )}
    </div>
  );
}
