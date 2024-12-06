import React from "react";

import styles from "./styles/list.module.css";

import {
  handleRenderContactListArrayAction,
  handleNoContactsRenderContentAction,
  handleSelectContactAction,
  handleRenderContactConnectionIndicatorAction,
  handleRenderContactUsernameAction,
  handleContactProfilePictureAction,
  handleRenderHandlerIconsAction,
  handleUserConnectionStatusAction,
  handleContactClassNamesAction
} from "./utils";

export default function List(props) {
  const { componentState, socket, component } = props || {};

  const newComponent = `${component}_list`;

  if (handleRenderContactListArrayAction(componentState)?.length > 0) {
    return (
      <div key={newComponent} className={styles?.list_wrapper}>
        <div className={styles?.list_container}>
          {handleRenderContactListArrayAction(componentState)?.map(
            (contact, idx) => {
              const online = handleUserConnectionStatusAction(
                componentState,
                contact
              );

              return (
                <div
                  key={`${idx}`}
                  className={handleContactClassNamesAction(
                    componentState,
                    contact,
                    "list_content_container",
                    online
                  )}
                >
                  <div
                    className={styles?.list_content_image_container}
                    onClick={() =>
                      handleSelectContactAction(componentState, contact, socket)
                    }
                  >
                    {handleContactProfilePictureAction(contact)}
                  </div>
                  <div
                    className={styles?.list_content_user_indicator_container}
                  >
                    <div className={styles?.list_content_username}>
                      {handleRenderContactUsernameAction(contact)}
                    </div>
                    <div
                      className={handleContactClassNamesAction(
                        componentState,
                        contact,
                        "list_content_indicator",
                        online
                      )}
                    >
                      {handleRenderContactConnectionIndicatorAction(online)}
                    </div>
                  </div>
                  <div className={styles?.list_content_actions_container}>
                    {handleRenderHandlerIconsAction(
                      componentState,
                      socket,
                      contact
                    )}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles?.list_wrapper}>
        <div className={styles?.list_no_contacts_container}>
          <div className={styles?.list_no_contacts_content}>
            {handleNoContactsRenderContentAction(componentState)}
          </div>
        </div>
      </div>
    );
  }
}
