import Input from "../components/input";
import Content from "../components/content";

import styles from "../styles/messages.module.css"

export const handleRenderComponentAction = (props, type) => {
    const componentMap = {
      message_content: Content,
      message_input: Input,
    }
  
    const ComponentToRender = componentMap?.[type] || null;
  
    return (
      <ComponentToRender {...props}/>
    )
  }

  export const handleRenderFormDataAction = (componentState, type) => {
    const {
      formData: {
          messages: {
            emptyContactListContent,
            inactiveConversationContent
          } = {}
      } = {},
    } = componentState || {};
  
    const formData = {
        empty_contact_list_content: emptyContactListContent,
        inactive_conversation_content: inactiveConversationContent
    };
  
    return formData?.[type];
  };

  export const handleMessageComponentContentRenderAction = (componentState, newComponent, socket) => {
     const {
         contactList,
         selectedContact,
     } = componentState || {}


     const contactTextIndicatorClassName = styles?.messages_contact_text_indicator
     const contentWrapperClassName = styles?.messages_content_wrapper

     const emptyContentListContentFormData = handleRenderFormDataAction(componentState, "empty_contact_list_content")
     const inactiveConversationContentFormData = handleRenderFormDataAction(componentState, "inactive_conversation_content")

     const renderContent = (className, content) => {
        if(className && content) return <div className={className}>{content}</div>
        else return null
     }


     const isBlockedByEveryContact = contactList?.every((contact) => {
      const { sent_request: sentRequest, status, blocker } = contact;
  
      return (
        (sentRequest && status === "pending") ||
        (!sentRequest && status === "blocked" && !blocker) ||
        (!blocker && status === "blocked")
      );
    });
    
    if(!Boolean(contactList?.length) || (Boolean(contactList?.length) && isBlockedByEveryContact)) return renderContent(contactTextIndicatorClassName, emptyContentListContentFormData)
    else if(!Boolean(selectedContact)) return renderContent(contactTextIndicatorClassName, inactiveConversationContentFormData)
  else if(selectedContact) {
    const components = (
      <>
           {handleRenderComponentAction(
            { socket, componentState, component: newComponent },
            "message_content"
          )}
           {handleRenderComponentAction(
            { socket, componentState, component: newComponent },
            "message_input"
          )}
      </>
     )
     
     return renderContent(contentWrapperClassName, components)}
    else return null
  }