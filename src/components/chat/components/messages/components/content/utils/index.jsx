import Emojis from "../../emojis";

import styles from "../styles/content.module.css";

import { handleRenderLazyLoadImageComponentAction } from "../../../../../utils";

import { handleUserGlobalStateAction } from "../../../../../../../utils";

export const handleRenderMessagesArrayAction = (componentState) => {
    const {
      messages
    } = componentState || {}

    return messages || []
}

export const handleRenderFormDataAction = (componentState, type) => {
  const {
    formData: {
      messages: {
        icons: {
          edit: editMessageIcon,
          delete: deleteMessageIcon,
          close_edit: closeEditMessageIcon,
          sent: sentMessageIcon,
          delivered: deliveredMessageIcon,
          scroll_down: scrollDownIcon
        } = {},
      } = {},
    } = {},
  } = componentState || {};

  const formData = {
    edit_message_icon: editMessageIcon,
    delete_message_icon: deleteMessageIcon,
    close_edit_message_icon: closeEditMessageIcon,
    sent_message_icon: sentMessageIcon,
    delivered_message_icon: deliveredMessageIcon,
    scroll_down_icon: scrollDownIcon
  };

  return formData?.[type];
};

export const handleRenderEmojisModalAction = (componentState, component) => {
  const { emojisModalActive } = componentState || {};

  if (emojisModalActive)
    return <Emojis componentState={componentState} component={component} />;
  else return null;
};

export const handleRenderMessageActionIcons = (
  componentState,
  socket,
   message
) => {

  const isUserSender = handleIsUserSenderAction(message)

  if(!isUserSender) return null

   const {
   id:messageId,
    content: messageContent,
    sender_id: senderId,
    receiver_id: receiverId
   } = message || {}

  const editMessageIcon = handleRenderFormDataAction(
    componentState,
    "edit_message_icon"
  );
  const deleteMessageIcon = handleRenderFormDataAction(
    componentState,
    "delete_message_icon"
  );
  const closeEditMessageIcon = handleRenderFormDataAction(
    componentState,
    "close_edit_message_icon"
  );

  const { setEditActive, editActive, setMessage } = componentState || {};

  const iconsToRender = [
    {
      id: 1,
      frontendSlug:
        editActive === messageId
          ? "close_edit_message_icon"
          : "edit_message_icon",
      src: editActive === messageId ? closeEditMessageIcon : editMessageIcon,
      action: () => {
        if (editActive === messageId) {
          setEditActive(null);
          setMessage("");
        } else {
          setEditActive(messageId);
          setMessage(messageContent);
        }
      },
    },
    {
      id: 2,
      frontendSlug: "delete_message_icon",
      src: deleteMessageIcon,
      action: () => {
        if (editActive === messageId) {
          setEditActive(null);
        }
        socket.current.emit("remove_message", {
          messageId,
          receiverId,
          senderId,
        });
      },
    },
  ];

  return iconsToRender?.map((icon) => {
    const { id, frontendSlug, src, action } = icon || {};

    return (
      <div
        key={`${id}-${frontendSlug}`}
        className={styles?.content_message_action_icon_container}
        onClick={() => action()}
      >
        {handleRenderLazyLoadImageComponentAction(src, "", 17.5, 17.5)}
      </div>
    );
  });
};


 const handleFormatISODateAction = (isoString) => {
  const date = new Date(isoString);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

 const handleUpdatedAtAction = (messageId, componentState) => {
  const { updatedAtDisplayed, setUpdatedAtDisplayed } = componentState || {};

  if (messageId === updatedAtDisplayed) setUpdatedAtDisplayed(null);
  else setUpdatedAtDisplayed(messageId);
};

const handleRenderEditFieldsAction = (
  message,
  componentState
) => {
  const { updatedAtDisplayed } = componentState || {};

  const {
    id: messageId,
  } = message || {}

  if (messageId === updatedAtDisplayed)
    return handleMessageDateFormatsAction(message, "updated") || null;
  else return "Edited";
};

export const handleRenderMessageStatusIconAction = (
  message,
  componentState
) => {

  const {
    is_read: isMessageRead,
  } = message || {}
  
  const isUserSender = handleIsUserSenderAction(message);

  if(!isUserSender) return null

  const sentMessageIcon = handleRenderFormDataAction(
    componentState,
    "sent_message_icon"
  );
  const deliveredMessageIcon = handleRenderFormDataAction(
    componentState,
    "delivered_message_icon"
  );

  return (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      {handleRenderLazyLoadImageComponentAction(
        isMessageRead ? deliveredMessageIcon : sentMessageIcon,
        "",
        15,
        15
      )}
    </span>
  );
};

export const handleIsUserSenderAction = (message) => {
  const { username } = message || {};

  const user = handleUserGlobalStateAction("get");

  return username === user?.username;
};

 const handleIsMessageEditedAction = (message) => {
  const { created_at: messageSentAt, updated_at: messageUpdatedAt } =
    message || {};

  const isEdited =
    new Date(messageSentAt).getTime() !== new Date(messageUpdatedAt).getTime();

  return isEdited;
};

export const handleEmitReadStatusAction = (componentState, message, socket) => {
  const { conversationParticipants } = componentState || {};

  const { id: messageId, is_read: isMessageRead } = message || {};

  const isUserSender = handleIsUserSenderAction(message);

  const user = handleUserGlobalStateAction("get");

  const userUsername = user?.username;

  const validReceiver = conversationParticipants?.find(
    (participant) => participant?.username !== userUsername
  );

  if (!isUserSender && !isMessageRead && validReceiver) {
    socket.current.emit("read_status", {
      messageId,
      receiverId: validReceiver?.id,
    });
  }
};

export const handleClassNamesAction = (componentState, message, type) => {
  const { editActive } = componentState || {};

  const { id: messageId } = message || {};

  const isUserSender = handleIsUserSenderAction(message);

  const contentMessageWrapperClassName = `${styles?.content_message_wrapper} ${
    messageId === editActive ? styles?.edit_active : undefined
  } ${isUserSender ? styles?.sender : styles?.receiver}`;

  const contentMessageUsernameActionIconsContainerClassName = `${
    styles?.content_message_username_action_icons_container
  } ${
    isUserSender ? styles?.sender_icon_actions : styles?.receiver_icon_actions
  }`;

  const classNames = {
    content_message_wrapper_class_name: contentMessageWrapperClassName,
    content_message_username_action_icons_container_class_name: contentMessageUsernameActionIconsContainerClassName
  };

  return classNames[type];
};


export const handleMessageDateFormatsAction = (message, type) => {
    const {
      created_at: messageSentAt,
      updated_at: messageUpdatedAt,
    } = message || {}

    if(type === "sent") return handleFormatISODateAction(messageSentAt)
      else if(type === "updated") return handleFormatISODateAction(messageUpdatedAt)
    else return null
}

export const handleMessageContentAction = (message) => {
  const {
      content: messageContent
  } = message || {}

  if(messageContent) return messageContent
  else return null
}

export const handleRenderEditedContentAction = (message,componentState ) => {

  const {
       id: messageId
  } = message || {}

  const isEdited = handleIsMessageEditedAction(message)

   if(isEdited) {
    return (
      <div
      className={styles?.content_update_date_container}
      onClick={() =>
        handleUpdatedAtAction(messageId, componentState)
      }
    >
      <div>|</div>
      <div className={styles?.content_update_date}>
        {handleRenderEditFieldsAction(
          message,
          componentState
        )}
      </div>
    </div>
    )
   } else return null

}


export const handleMessageArrayKeyAction = (message, idx) => {
  const {
    id: messageId
  } = message || {}

  if(messageId) return messageId
  else return idx
}

export const handleMessageArrayContentRendererAction = (message, type) => {

  const {
    id: messageId,
    sender_id: messageSenderId,
    receiver_id: messageReceiverId,
    content: messageContent,
    is_read: messageIsRead,
    created_at: messageCreatedAt,
    updated_at: messageUpdatedAt,
    username: messageUsername,
    profile_picture: messageProfilePicture,
  } = message

  const messageContentFormData = {
    id: messageId,
    sender_id: messageSenderId,
    receiver_id: messageReceiverId,
    content: messageContent,
    is_read: messageIsRead,
    created_at: messageCreatedAt,
    updated_at: messageUpdatedAt,
    username: messageUsername,
    profile_picture: messageProfilePicture,
  }

   return messageContentFormData?.[type] || null
}

export const handleScrollToLastMessageAction = (bottomRef) => {
  if (bottomRef.current) {
    bottomRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
};



export const handleLastMessageRefAction = (componentState, idx, bottomRef) => {
  
  const messagesArrayLength = handleRenderMessagesArrayAction(componentState)?.length
   
  if(messagesArrayLength - 1 === idx) return bottomRef
  else return null

                  
}

export const handleProfilePictureSourceAction = (message) => {

  console.log("message", message)
   const profilePicture = handleMessageArrayContentRendererAction(message, "profile_picture")
   const username = handleMessageArrayContentRendererAction(message, "username")

   if(!profilePicture) {
    return handleRenderLazyLoadImageComponentAction(
      profilePicture,
      "",
      125,
      125,
      true
    )
   } else {
      return (
        <div className={styles?.content_messages_no_image}>{username?.split("")?.[0]}</div>
      )
   }
}