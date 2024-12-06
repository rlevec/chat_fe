import styles from "../styles/list.module.css";

import { handleUserGlobalStateAction } from "../../../../../../../utils";

import { handleRenderLazyLoadImageComponentAction } from "../../../../../utils";


export const filterContacts = (contacts, filter) => {
  const filteredContacts =
    contacts?.filter((contact) => {
      if (!contact) return false;

      const { sent_request: sentRequest, status, blocker } = contact;

      //if user has sent the request but request is pending
      //if user has not sent the request but has been blocked by request sender
      //if user has been blocked but he is not the one who initiated blocking
      if (
        (sentRequest && status === "pending") ||
        (!sentRequest && status === "blocked" && !blocker) ||
        (!blocker && status === "blocked")
      ) {
        return false;
      }

      if (filter === "all") return true;
      else return status === filter;
    }) || [];

  return filteredContacts;
};



export const handleRenderContactListArrayAction = (componentState) => {
  const { filteredContactList, contactListFilter } = componentState || {};
  const newFilteredContactList = filterContacts(
    filteredContactList,
    contactListFilter
  );
  return newFilteredContactList;
};

export const handleUserConnectionStatusAction = (componentState, contact) => {
  const { username: contactUsername } = contact || {};

  const { connectedUsers = {} } = componentState || {};

  return Boolean(connectedUsers?.[contactUsername]);
};

export const handleRenderFormDataAction = (componentState, type) => {
  const {
    formData: {
      sidebar: {
        contactList: {
          icons: {
            accept: acceptIcon,
            decline: declineIcon,
            block: blockIcon,
            unblock: unblockIcon,
            delete: deleteIcon,
          } = {},
        } = {},
      } = {},
    },
  } = componentState || {};

  const formData = {
    accept_icon: acceptIcon,
    decline_icon: declineIcon,
    block_icon: blockIcon,
    unblock_icon: unblockIcon,
    delete_icon: deleteIcon,
  };

  return formData?.[type];
};

const handleIconHandlersAction = (
  socket,
  type,
  contactUsername,
  contactStatus
) => {
  if (type === "accept") {
    if (contactStatus === "blocked") {
      socket.current.emit("unblock_contact", { contactUsername });
    } else {
      socket.current.emit("accept_contact", { contactUsername });
    }
  }
  if (type === "block") {
    socket.current.emit("block_contact", { contactUsername });
  }
  if (type === "decline") {
    socket.current.emit("decline_contact", { contactUsername });
  }
  if (type === "delete") {
    socket.current.emit("delete_contact", { contactUsername });
  } else return null;
};

export const handleRenderHandlerIconsAction = (
  componentState,
  socket,
  contact
) => {
  const { status: contactStatus, username: contactUsername } = contact || {};

  const acceptIcon = handleRenderFormDataAction(componentState, "accept_icon");
  const deleteIcon = handleRenderFormDataAction(componentState, "delete_icon");
  const declineIcon = handleRenderFormDataAction(
    componentState,
    "decline_icon"
  );
  const blockIcon = handleRenderFormDataAction(componentState, "block_icon");
  const unblockIcon = handleRenderFormDataAction(
    componentState,
    "unblock_icon"
  );

  const iconMap = {
    pending: [
      {
        icon: acceptIcon,
        type: "accept",
      },
      {
        icon: declineIcon,
        type: "decline",
      },
    ],
    accepted: [
      {
        icon: blockIcon,
        type: "block",
      },
      {
        icon: deleteIcon,
        type: "delete",
      },
    ],
    blocked: [
      {
        icon: unblockIcon,
        type: "accept",
      },
      {
        icon: deleteIcon,
        type: "delete",
      },
    ],
  };

  return (iconMap[contactStatus] || [])?.map((iconSrc, index) => (
    <div
      className={styles?.list_content_action_icon_container}
      key={index}
      onClick={() =>
        handleIconHandlersAction(
          socket,
          iconSrc?.type,
          contactUsername,
          contactStatus
        )
      }
    >
      {handleRenderLazyLoadImageComponentAction(
        iconSrc?.icon,
        "",
        25,
        25,
        true
      )}
    </div>
  ));
};

export const handleContactClassNamesAction = (
  componentState,
  contact,
  type,
  online
) => {
  const { selectedContact } = componentState;

  const { username: contactUsername } = contact || {};

  const classNames = {
    list_content_container: `${styles?.list_content_container} ${
      selectedContact === contactUsername && styles.selected
    }`,
    list_content_indicator: `${styles?.list_content_indicator} ${
      online ? styles?.online : styles?.offline
    }`,
  };

  return classNames?.[type];
};

export const handleContactProfilePictureAction = (contact) => {
  const { username: contactUsername, profile_picture: contactProfilePicture } =
    contact || {};

  if (contactProfilePicture) {
    return handleRenderLazyLoadImageComponentAction(
      contactProfilePicture,
      "",
      75,
      75,
      true
    )
  } else {
    return (
      <div className={styles?.list_content_no_image}>
        {contactUsername?.split("")?.[0]}
      </div>
    );
  }
};

export const handleRenderContactUsernameAction = (contact) => {
  const { username: contactUsername } = contact || {};

  return contactUsername;
};

export const handleRenderContactConnectionIndicatorAction = (online) => {
  if (online) return "Online";
  else return "Offline";
};

export const handleSelectContactAction = (componentState, contact, socket) => {
  const { username: contactUsername, status } = contact;

  const {
    selectedContact,
    setSelectedContact,
    setMessage,
    setEditActive,
    setUpdatedAtDisplayed,
  } = componentState;

  const user = handleUserGlobalStateAction("get");

  const sender = user?.username || null;
  const receiver = contactUsername || null;

  if (status !== "accepted") return null;
  else {
    setMessage("");
    if (selectedContact === contactUsername) setSelectedContact(null);
    else {
      setEditActive(null);
      setUpdatedAtDisplayed(null);
      setSelectedContact(contactUsername);

      const broadcastObject = {
        sender,
        receiver,
      };

      if (socket.current) {
        socket.current.emit("get_conversation_messages", broadcastObject);
      }
    }
  }
};

export const handleNoContactsRenderContentAction = (componentState) => {
  const { contactListFilter } = componentState || {};

  if (contactListFilter) {
    const transformedContactListFilter = contactListFilter
      ? contactListFilter[0].toUpperCase() + contactListFilter.slice(1)
      : "";

    if (contactListFilter !== "all")
      return `${transformedContactListFilter} contact list is empty`;
    else return `Contact list is empty`;
  }
};
