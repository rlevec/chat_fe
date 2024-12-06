import React from "react";

import styles from "./styles/content.module.css";

import { useHandleContentComponentRefs } from "./refs";
import { useHandleContentComponentEffects } from "./effects";

import {
  handleRenderEmojisModalAction,
  handleRenderMessageActionIcons,
  handleRenderMessageStatusIconAction,
  handleEmitReadStatusAction,
  handleClassNamesAction,
  handleMessageDateFormatsAction,
  handleMessageContentAction,
  handleRenderEditedContentAction,
  handleMessageArrayKeyAction,
  handleRenderMessagesArrayAction,
  handleMessageArrayContentRendererAction,
  handleRenderFormDataAction,
  handleScrollToLastMessageAction,
  handleLastMessageRefAction,
  handleProfilePictureSourceAction
} from "./utils";

import { handleRenderLazyLoadImageComponentAction } from "../../../../utils";

export default function Content(props) {
  const { componentState, component, socket } = props || {};

  const { bottomRef, containerRef } = useHandleContentComponentRefs();

  useHandleContentComponentEffects(componentState, bottomRef, containerRef);

  const newComponent = `${component}_content`;


  return (
    <div className={styles?.content_wrapper} key={newComponent}>
      <div className={styles?.content_container}>
        <div className={styles?.content_messages_wrapper} ref={containerRef}>
            <div
              className={styles?.content_messages_scroll_icon_container}
              onClick={() => handleScrollToLastMessageAction(bottomRef)}
            >
              {handleRenderLazyLoadImageComponentAction(
                handleRenderFormDataAction(componentState, "scroll_down_icon"),
                "",
                50,
                50
              )}
            </div>
          {handleRenderMessagesArrayAction(componentState)?.map(
            (message, idx) => {
              handleEmitReadStatusAction(componentState, message, socket);
              return (
                <div
                  className={handleClassNamesAction(
                    componentState,
                    message,
                    "content_message_wrapper_class_name"
                  )}
                  key={handleMessageArrayKeyAction(message, idx)}
                  ref={handleLastMessageRefAction(
                    componentState, idx, bottomRef
                  )}
                >
                  <div className={styles?.content_messages_container}>
                    <div className={styles?.content_messages_left_container}>
                      <div
                        className={
                          styles?.content_messages_profile_picture_container
                        }
                      >
                        {handleProfilePictureSourceAction(message)}
                      </div>
                    </div>
                    <div className={styles?.content_messages_right_container}>
                      <div
                        className={handleClassNamesAction(
                          componentState,
                          message,
                          "content_message_username_action_icons_container_class_name"
                        )}
                      >
                        <div>
                          {handleMessageArrayContentRendererAction(
                            message,
                            "username"
                          )}
                        </div>
                        <div
                          className={
                            styles?.content_message_action_icons_container
                          }
                        >
                          {handleRenderMessageActionIcons(
                            componentState,
                            socket,
                            message
                          )}
                        </div>
                      </div>
                      <div
                        className={styles?.content_message_text_dates_container}
                      >
                        <div className={styles?.content_message_text}>
                          {handleMessageContentAction(message)}
                          {handleRenderMessageStatusIconAction(
                            message,
                            componentState
                          )}
                        </div>
                        <div className={styles?.content_dates_container}>
                          <div>
                            {handleMessageDateFormatsAction(message, "sent")}
                          </div>
                          {handleRenderEditedContentAction(
                            message,
                            componentState
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
        {handleRenderEmojisModalAction(componentState, newComponent)}
      </div>
    </div>
  );
}
