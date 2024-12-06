import React from "react";

import styles from "./styles/chat.module.css";

import {
  handleRenderNotificationConditionAction,
  handleRenderFormDataConditionAction,
  handleLazyLoadComponentAction,
  handleRenderSettingsConditionAction,
  handleChatWrapperClassNameAction,
  handleRenderComponentAction
} from "./utils";

import { useHandleChatComponentState } from "./state";
import { useHandleChatComponentEffects } from "./effects";
import { useHandleComponentRefs } from "./refs";

const component = "chat";

export default function Chat() {
  const componentState = useHandleChatComponentState();

  const { socket } = useHandleComponentRefs();

  useHandleChatComponentEffects(componentState, component, socket);

  if (handleRenderFormDataConditionAction(componentState)) {
    return (
      <div className={handleChatWrapperClassNameAction(componentState)}>
        <div className={styles?.chat_container}>
          {handleRenderNotificationConditionAction(componentState) &&
            handleLazyLoadComponentAction(
              { componentState, component },
              "notifications"
            )}

          {handleLazyLoadComponentAction(
            { componentState, component, socket },
            "sidebar"
          )}
          {handleLazyLoadComponentAction(
            { componentState, component, socket },
            "messages"
          )}
          {handleRenderSettingsConditionAction(componentState) &&
            handleLazyLoadComponentAction(
              { componentState, component },
              "settings"
            )}
        </div>
      </div>
    );
  } else {
    return handleRenderComponentAction(
      { componentState, component },
      "fetch_indicator"
    );
  }
}
