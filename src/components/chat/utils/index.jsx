import React, { Suspense, useEffect, lazy } from "react";

import { io } from "socket.io-client";

import styles from "../styles/chat.module.css"

import LazyLoadImage from "../../shared/lazy_load_image";

const Settings = lazy(() => import("../components/settings"));
const Notifications = lazy(() => import("../components/notifications"));
const Messages = lazy(() => import("../components/messages"));
const Sidebar = lazy(() => import("../components/sidebar"));

import FetchIndicator from "../../shared/fetch_indicator";
import Profile from "../components/sidebar/components/profile";
import List from "../components/sidebar/components/list";
import Filter from "../components/sidebar/components/filter";
import Inputs from "../components/sidebar/components/inputs";
import Search from "../components/sidebar/components/inputs/components/search";
import Add from "../components/sidebar/components/inputs/components/add";


export const handleRenderNotificationConditionAction = (componentState) => {
  const { backendResponseMessage: { success = null, error = null } = {} } =
    componentState || {};

  return error || success;
};

export const handleRenderSettingsConditionAction = (componentState) => {
  const { settingsActive = false } = componentState || {};

  return settingsActive;
};

export const handleRenderFormDataConditionAction = (componentState) => {
  return componentState?.formData && !componentState?.invalidSession?.error;
};

const handleBackendResponseMessageAction = (
  setBackendResponseMessage,
  type,
  message
) => {
  if (message) {
    if (window.backendResponseTimeout) {
      clearTimeout(window.backendResponseTimeout);
    }

    setBackendResponseMessage((prevBackendResponseMessage) => ({
      ...prevBackendResponseMessage,
      success: type === "success" ? message : null,
      error: type === "error" ? message : null,
    }));

    window.backendResponseTimeout = setTimeout(() => {
      setBackendResponseMessage((prevBackendResponseMessage) => ({
        ...prevBackendResponseMessage,
        success: null,
        error: null,
      }));

      window.backendResponseTimeout = null;
    }, 3000);
  }
};



export const useHandleWebsocketEventsAction = (componentState, socket) => {
  const {
    setBackendResponseMessage,
    setContactList,
    setFilteredContactList,
    setConnectedUsers,
    setMessages,
    setConversationParticipants,
    messages,
    setReceiverTyping,
    setUnreadMessages
  } = componentState || {};

  useEffect(() => {
    socket.current = io("http://localhost:3060", { transports: ["websocket"] });

    const events = [
      {
        event: "connect",
        action: () => {
          socket.current.emit("get_contact_list");
        },
      },
      {
        event: "user_connected",
        action: (broadcastObject) => {
          handleBackendResponseMessageAction(
            setBackendResponseMessage,
            "success",
            broadcastObject?.message
          );
        },
      },
      {
        event: "send_contact_request",
        action: (broadcastObject) => {
          handleBackendResponseMessageAction(
            setBackendResponseMessage,
            "success",
            broadcastObject?.message
          );
          socket.current.emit("get_contact_list");
        },
      },
      {
        event: "decline_contact_request",
        action: (broadcastObject) => {
          handleBackendResponseMessageAction(
            setBackendResponseMessage,
            "success",
            broadcastObject?.message
          );
          socket.current.emit("get_contact_list");
        },
      },
      {
        event: "delete_contact",
        action: (broadcastObject) => {
          handleBackendResponseMessageAction(
            setBackendResponseMessage,
            "success",
            broadcastObject?.message
          );
          socket.current.emit("get_contact_list");
        },
      },
      {
        event: "user_disconnected",
        action: (broadcastObject) => {
          handleBackendResponseMessageAction(
            setBackendResponseMessage,
            "success",
            broadcastObject?.message
          );
        },
      },
      {
        event: "block_contact_request",
        action: (broadcastObject) => {
          handleBackendResponseMessageAction(
            setBackendResponseMessage,
            "success",
            broadcastObject?.message
          );
          socket.current.emit("get_contact_list");
        },
      },
      {
        event: "unblock_contact_request",
        action: (broadcastObject) => {
          handleBackendResponseMessageAction(
            setBackendResponseMessage,
            "success",
            broadcastObject?.message
          );
          socket.current.emit("get_contact_list");
        },
      },
      {
        event: "delete_contact",
        action: (broadcastObject) => {
          handleBackendResponseMessageAction(
            setBackendResponseMessage,
            "success",
            broadcastObject?.message
          );
          socket.current.emit("get_contact_list");
        },
      },
      {
        event: "connection_feedback",
        action: (broadcastObject) => {
          handleBackendResponseMessageAction(
            setBackendResponseMessage,
            "success",
            broadcastObject?.message
          );
          socket.current.emit("get_contact_list");
        },
      },
      {
        event: "online_users",
        action: (broadcastObject) => {
          if (broadcastObject?.success && broadcastObject?.data) {
            setConnectedUsers(broadcastObject?.data);
          }
        },
      },
      {
        event: "get_contact_list",
        action: (broadcastObject) => {
          if (broadcastObject?.success && broadcastObject?.data) {
            const contactList = broadcastObject?.data;

            if (Array.isArray(contactList)) {
              setContactList(contactList);
              setFilteredContactList(contactList);
            }
          }
        },
      },
      {
        event: "change_username",
        action: (broadcastObject) => {
          handleBackendResponseMessageAction(
            setBackendResponseMessage,
            "success",
            broadcastObject?.message
          );
          socket.current.emit("get_contact_list");
        },
      },
      {
        event: "delete_account",
        action: (broadcastObject) => {
          handleBackendResponseMessageAction(
            setBackendResponseMessage,
            "success",
            broadcastObject?.message
          );
          socket.current.emit("get_contact_list");
        },
      },
      {
        event: "update_profile_picture",
        action: (broadcastObject) => {
          handleBackendResponseMessageAction(
            setBackendResponseMessage,
            "success",
            broadcastObject?.message
          );
          socket.current.emit("get_contact_list");
        },
      },
      {
        event: "get_conversation_messages",
        action: (broadcastObject) => {
          if (broadcastObject?.success && broadcastObject?.data) {
            const messages = broadcastObject?.data;

            const conversationParticipants =
              broadcastObject?.conversationParticipants;

            if (Array.isArray(messages)) {
              setMessages(messages);
            }
            if (Array?.isArray(conversationParticipants)) {
              setConversationParticipants(conversationParticipants);
            }
          }
        },
      },
      {
        event: "new_message",
        action: (broadcastObject) => {
          const newMessage = broadcastObject?.data;

          setMessages((prevMessages) => {
            return [...prevMessages, newMessage];
          });
        },
      },
      {
        event: "edit_message",
        action: async(broadcastObject) => {
          const messageId = broadcastObject?.data?.id;
          const messageData = broadcastObject?.data;

      

          if (messageId) {
              setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                

                const messageIndex = updatedMessages?.findIndex(
                  (message) => message?.id === messageId
                );
              
                if(messageIndex !== 1) {
                  updatedMessages[messageIndex] = {
                    ...updatedMessages[messageIndex],
                    ...messageData,
                  };
                }

          
                return updatedMessages;
              });
          }
          
        },
      },
      {
        event: "remove_message",
        action: (broadcastObject) => {
          const messageId = broadcastObject?.data?.id;
      
          if (messageId) {
            setMessages((prevMessages) => {
              const newMessages = [...prevMessages];
      
              const messageIndex = newMessages?.findIndex((message) => message?.id === messageId);
      
              if (messageIndex !== -1) {
                newMessages.splice(messageIndex, 1);
              }
      
              return newMessages;
            });
          }
        },
      },
      {
        event: "user_typing_status",
        action: (broadcastObject) => {

         const {
            message,
            isTyping
         } = broadcastObject || {}

         setReceiverTyping((prevReceiverTyping) => ({
          ...prevReceiverTyping,
           message,
           typing: isTyping
         }))
         
        },
      },
      {
        event: "read_status_update",
        action: (broadcastObject) => {
            
            const messageId = broadcastObject?.data?.id;          
            const messageData = broadcastObject?.data;
    
            if (messageId && messageData) {
                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages];
    
                    const messageIndex = updatedMessages?.findIndex(
                        (message) => message?.id === messageId
                    );
                    
              
                    if (messageIndex !== -1) {
                        const currentMessage = updatedMessages[messageIndex];
    
                        // update if the message read status status is false
                        if (!currentMessage?.is_read) {
                            updatedMessages[messageIndex] = {
                                ...currentMessage,
                                ...messageData,
                            };
                        }
                    }
    
                    return updatedMessages;
                });
            }
        }
    },
      {
        event: "error",
        action: (broadcastObject) => {
          handleBackendResponseMessageAction(
            setBackendResponseMessage,
            "error",
            broadcastObject?.message
          );
        },
      },
    ];

    if (socket.current) {
      events?.forEach(({ event, action }) => socket.current.on(event, action));
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);
};

export const handleRenderComponentAction = (props, type) => {
  const componentMap = {
    fetch_indicator: FetchIndicator,
    add_contact_input: Add,
    search_contact_input: Search,
    add_search_contact_inputs: Inputs,
    contact_filter: Filter,
    user_profile: Profile,
    contact_list: List,
  };

  const ComponentToRender = componentMap?.[type] || null;

  return <ComponentToRender {...props} />;
};

export const handleLazyLoadComponentAction = (props, type) => {
  const componentMap = {
    settings: Settings,
    notifications: Notifications,
    messages: Messages,
    sidebar: Sidebar,
  };

  const ComponentToLoad = componentMap?.[type] || null;

  return (
    <Suspense fallback={<FetchIndicator {...props} />}>
      <ComponentToLoad {...props} />
    </Suspense>
  );
};

export const handleRenderLazyLoadImageComponentAction = (
  src,
  alt,
  width,
  height,
  cache
) => {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      crossOrigin={"Anyonymus"}
      cache={cache}
    />
  );
};


export const useHandleSelectedContactValidityAction = (componentState) => {

  const {
    selectedContact,
    contactList,
    setSelectedContact
  } = componentState || {}
  useEffect(() => {


  if (!contactList || !selectedContact) {
    return; 
  }

  const isSelectedContactValid = contactList?.some((contact) => {
      const { status, username } = contact || {};

      //unselect contact if it is blocked or it does not exist in contactList array
      return username === selectedContact && status === "accepted";
  });

  if (!isSelectedContactValid) {
    setSelectedContact(null);
  }
  }, [contactList, selectedContact]);
}




export const handleChatWrapperClassNameAction = (compponentState) => {
   const {
    disablePointerEvents
   } = compponentState || {}

   const defaultClassName = styles?.chat_wrapper;
   const additionalClassName = styles?.chat_disable_pointer_events;

   if(disablePointerEvents) return `${defaultClassName} ${additionalClassName}`
   else return defaultClassName
}