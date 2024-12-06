import { handleRenderLazyLoadImageComponentAction } from "../../../../../utils";
import styles from "../styles/input.module.css"
import { handleUserGlobalStateAction } from "../../../../../../../utils";

export const handleRenderFormDataAction = (componentState, type) => {
    const {
      formData: {
          messages: {
            input: {
              frontendSlug: messageInputFrontendSlug,
              id: messageInputId,
              name: messageInputName,
              placeholder: messageInputPlaceholder,
              type: messageInputType,
              validation: messageInputValidation,
              validationMessage: messageInputValidationMessage,
              fieldIcon: messageInputFieldIcon,
              emoticonIcon: messageInputEmoticonIcon,
              actionIcon: messageInputActionIcon,
              editIcon: messageInputEditActionIcon
            } = {}
          } = {}
      } = {},
    } = componentState || {};
  
    const formData = {
      messag_input_frontend_slug: messageInputFrontendSlug,
      message_input_id: messageInputId,
      message_input_name: messageInputName,
      message_input_placeholder: messageInputPlaceholder,
      message_input_type: messageInputType,
      message_input_validation: messageInputValidation,
      message_input_validation_message: messageInputValidationMessage,
      message_input_field_icon: messageInputFieldIcon,
      message_input_emoticon_icon: messageInputEmoticonIcon,
      message_input_action_icon: messageInputActionIcon,
      message_input_edit_action_icon: messageInputEditActionIcon
    };
  
    return formData?.[type];
  };


  export const handleRenderInputIconsAction = (componentState, socket) => {
    
     const messageInputFieldIconFormData = handleRenderFormDataAction(componentState ,"message_input_field_icon")
     const messageInputEmoticonIconFormData = handleRenderFormDataAction(componentState, "message_input_emoticon_icon")
     const messageInputActionIconFormData = handleRenderFormDataAction(componentState, "message_input_action_icon")
     const messageInputEditIconFormData = handleRenderFormDataAction(componentState, "message_input_edit_action_icon")

     const messageInputFieldIconContainerClassName = styles?.input_message_input_field_icon_container
     const messageInputEmoticonIconContainerClassName = styles?.input_message_input_emoticon_icon_container
     const messageInputActionIconContainerClassName = styles?.input_message_input_action_icon_container

     const {
       setEmojisModalActive,
       emojisModalActive,
       editActive
     } = componentState || {}

      
    const iconsArr = [
      {
        id: 1,
        frontendSlug: "messageInputFieldIconFormData",
        src: messageInputFieldIconFormData,
        className: messageInputFieldIconContainerClassName,
      },
      {
        id: 2,
        frontendSlug: "messageInputEmoticonIconFormData",
        src: messageInputEmoticonIconFormData,
        className: messageInputEmoticonIconContainerClassName,
        handler: () => setEmojisModalActive(!emojisModalActive)
      },
      {
        id: 3,
        frontendSlug: "messageInputActionIconFormData",
        src: editActive ? messageInputEditIconFormData : messageInputActionIconFormData,
        className: messageInputActionIconContainerClassName,
        handler: () => handleSendOrEditMessageAction(componentState, socket)
      }
    ]


    return iconsArr?.map((icon) => {
      const {
           id,
           frontendSlug,
           src,
           className,
           handler
      } = icon || {}

      return (
        <div onClick={() => handler && handler()} key={`${id}-${frontendSlug}`} className={className}>
            {handleRenderLazyLoadImageComponentAction(
              src, "", 25, 25
            )}
        </div>
      )
    })
    
  }


  export const handleSendOrEditMessageAction = (componentState, socket) => {
    const {
      selectedContact,
      message,
      setMessage,
      editActive,
      setEditActive,
      setUpdatedAtDisplayed
    } = componentState || {}

     
    const user = handleUserGlobalStateAction("get")

    const sender = user?.username || null
    const receiver = selectedContact || null
    const content = message || null

    if(sender && socket.current &&  receiver && content) {
        const broadcastObject = {
          sender,
          receiver,
          content,
          messageId: editActive
        }

        const event = editActive ? "edit_message" : "send_message"
        socket.current.emit(event, broadcastObject);
        setMessage("")
        setEditActive(null)
        setUpdatedAtDisplayed(null)
    }
  }

  export const handleMessageInputValueAction = (componentState) => {
    const {
      message
    } = componentState || {}

    return message
  }

  export const handleTypingStatusAction = (componentState, socket) => {
    const {
      setIsTyping,
      isTyping,
      conversationParticipants
    } = componentState || {};
  
    if (!isTyping) {
      setIsTyping(true);
      socket.current.emit("user_typing_status", { conversationParticipants, typing: true });
    }
  
    if (typeof window.typingTimeout !== "undefined") {
      clearTimeout(window.typingTimeout);
    }
  
    window.typingTimeout = setTimeout(() => {
      setIsTyping(false);
      socket.current.emit("user_typing_status", { conversationParticipants, typing: false });
    }, 500); 
  };
  

  export const handleMessageInputOnChangeEventAction = (event, componentState, socket) => {
    const {
      setMessage
    } = componentState || {}

    const messageValue = event?.target?.value || ""

    handleTypingStatusAction(componentState, socket)


     setMessage(messageValue)
  }

  export const handleMessageInputKeyDownEventAction = (event, componentState, socket) => {
    const {
      setMessage,
      message
    } = componentState || {}

    const keyCode = event?.key

    if(keyCode === "Escape" && message !== "") setMessage("")
    else if(keyCode === "Enter" && message !== "") return handleSendOrEditMessageAction(componentState, socket)
  else return null
  }


  export const renderTypingIndicatorAction = (componentState) => {

    const {
      receiverTyping: {
        typing,
        message
      } = {}
    } = componentState || {}
    if(typing) return <div className={styles?.input_typing_indicator}>{message}</div>
    else return null
  }