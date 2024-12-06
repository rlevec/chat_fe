import React from "react";
import styles from "./styles/notifications.module.css";

import {
  handleNotificationTypeAction,
  handleRenderNotificationContentAction,
  handleCloseNotificationAction,
  handleClassNamesAction,
  handleImageSourceAction,
} from "./utils";

import {handleRenderLazyLoadImageComponentAction} from "../../utils"

export default function Notifications(props) {
  const { componentState, component } = props || {};

  const newComponent = `${component}_notifications`;

  const notificationType = handleNotificationTypeAction(componentState);

  if (!notificationType) return null;

  return (
    <div
      key={newComponent}
      className={handleClassNamesAction(
        notificationType,
        "notifications_wrapper"
      )}
    >
      <div className={styles.notifications_container}>
        <div className={styles.notifications_content}>
          {handleRenderNotificationContentAction(componentState)}
        </div>
        <button
          className={styles.close_btn}
          onClick={() => handleCloseNotificationAction(componentState)}
        >
          {handleRenderLazyLoadImageComponentAction(
            handleImageSourceAction(componentState),
            "",
            12.5,
            15
          )}
        </button>
      </div>
    </div>
  );
}
