import { useEffect, useRef } from "react";
import { handleUserGlobalStateAction } from "../../../../../../../utils";
import { handleScrollToLastMessageAction } from "../utils";

export const useHandleContentComponentEffects = (componentState, bottomRef, containerRef) => {
  const { messages, conversationParticipants} = componentState || {};

  const user = handleUserGlobalStateAction("get");
  const userUsername = user?.username;

  const matchConversationParticipant = conversationParticipants?.find(
    (conversationParticipant) =>
      conversationParticipant?.username === userUsername
  );
  const userId = matchConversationParticipant?.id;

  const isFirstRender = useRef(true);


  useEffect(() => {

    // Scroll on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (Boolean(messages?.length) && bottomRef.current) {
        handleScrollToLastMessageAction(bottomRef)
      }
      return;
    }

    // Scroll on subsequent renders if the last message is sent by the user
    if (Boolean(messages?.length) && bottomRef.current && userId) {
      const lastMessage = messages?.[messages?.length - 1];
      const isLastMessageUserSender = lastMessage?.sender_id === userId;

      if (isLastMessageUserSender) {
        handleScrollToLastMessageAction(bottomRef)
      }
    }
  }, [bottomRef, messages, userId]);
};
