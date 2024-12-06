import { useState } from "react";

export const useHandleChatComponentState = () => {
  const [formData, setFormData] = useState([]);
  const [isServerRequestPending, setIsServerRequestPending] = useState(false);
  const [isServerRequestInError, setIsServerRequestInError] = useState(false);
  const [backendResponseMessage, setBackendResponseMessage] = useState({
    error: false,
    success: false,
  });
  const [invalidSession, setInvalidSession] = useState({
    error: null,
    message: null,
    redirect: null,
  });
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const [query, setQuery] = useState({
    addContact: "",
    searchContact: "",
  });

  const [fieldError, setFieldError] = useState({
    addContact: false,
    searchContact: false,
  });

  const [connectedUsers, setConnectedUsers] = useState({});

  const [contactList, setContactList] = useState([]);

  const [selectedContact, setSelectedContact] = useState(null);

  const [sidebarInputType, setSidebarInputType] = useState("addContact");

  const [filteredContactList, setFilteredContactList] = useState([]);

  const [contactListFilter, setContactListFilter] = useState("all");

  const [contactListDropdownActive, setContactListDropdownActive] =
    useState(false);

  const [contactListDropdownItemHovered, setContactListDropdownItemHovered] =
    useState(null);

  const [settingsActive, setSettingsActive] = useState(false);

  const [settingsActionHovered, setSettingsActionHovered] = useState(null);

  const [conversation, setConversation] = useState(null)

  const [message, setMessage] = useState("")

  const [messages, setMessages] = useState([])

  const [emojisModalActive, setEmojisModalActive] = useState(false)

  const [emojiFilter, setEmojiFilter] = useState(0)

  const [conversationParticipants, setConversationParticipants] = useState([])

  const [updatedAtDisplayed, setUpdatedAtDisplayed] = useState(null)

  const [editActive, setEditActive] = useState(null)

  const [isTyping, setIsTyping] = useState(false)

  const [receiverTyping, setReceiverTyping] = useState({
    typing: false,
    message: ""
  })

  const [unreadMessages, setUnreadMessages] = useState([])

  const [disablePointerEvents, setDisablePointerEvents] = useState(false)

  return {
    formData,
    setFormData,
    isServerRequestPending,
    setIsServerRequestPending,
    isServerRequestInError,
    setIsServerRequestInError,
    backendResponseMessage,
    setBackendResponseMessage,
    invalidSession,
    setInvalidSession,
    sidebarOpened,
    setSidebarOpened,
    query,
    setQuery,
    fieldError,
    setFieldError,
    contactList,
    setContactList,
    connectedUsers,
    setConnectedUsers,
    selectedContact,
    setSelectedContact,
    sidebarInputType,
    setSidebarInputType,
    filteredContactList,
    setFilteredContactList,
    contactListFilter,
    setContactListFilter,
    contactListDropdownActive,
    setContactListDropdownActive,
    contactListDropdownItemHovered,
    setContactListDropdownItemHovered,
    settingsActive,
    setSettingsActive,
    settingsActionHovered,
    setSettingsActionHovered,
    conversation,
    setConversation,
    message,
    setMessage,
    emojisModalActive,
    setEmojisModalActive,
    emojiFilter,
    setEmojiFilter,
    messages,
    setMessages,
    conversationParticipants,
    setConversationParticipants,
    updatedAtDisplayed,
    setUpdatedAtDisplayed,
    editActive,
    setEditActive,
    isTyping,
    setIsTyping,
    receiverTyping,
    setReceiverTyping,
    unreadMessages,
    setUnreadMessages,
    disablePointerEvents,
    setDisablePointerEvents
  };
};
