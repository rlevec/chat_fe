import React from "react";

import styles from "./styles/settings.module.css";

import { handleRenderLazyLoadImageComponentAction } from "../../utils";

import {
  handleAlterSettingsStateAction,
  handleRenderFormDataAction,
  handleSettingsItemImageSourceAction,
  handleRenderSettingsItemContentAction,
  handleSettingsItemRedirectAction,
  handleSettingsItemHoverAction,
  handleSettingsItemsArrayKeyAction,
} from "./utils";

export default function Settings(props) {
  const { component, componentState } = props || {};

  const newComponent = `${component}_settings`;

  return (
    <div key={newComponent} className={styles?.settings_wrapper}>
      <div className={styles?.settings_container}>
        <div className={styles?.settings_close_icon_wrapper}>
          <div
            className={styles?.settings_close_icon_container}
            onClick={() => handleAlterSettingsStateAction(componentState)}
          >
            {handleRenderLazyLoadImageComponentAction(
              handleRenderFormDataAction(componentState, "settings_close_icon"),
              "",
              25,
              32.5
            )}
          </div>
        </div>
        <div className={styles?.settings_title}>
          {handleRenderFormDataAction(componentState, "settings_title")}
        </div>
        <div className={styles?.settings_actions_container}>
          {handleRenderFormDataAction(componentState, "settings_actions")?.map(
            (action) => {
              return (
                <div
                  key={handleSettingsItemsArrayKeyAction(action)}
                  className={styles?.settings_actions_content_container}
                >
                  <div className={styles?.settings_actions_content_title}>
                    {handleRenderSettingsItemContentAction(
                      action,
                      "settings_action_title"
                    )}
                  </div>
                  <div className={styles?.settings_actions_content_description}>
                    {handleRenderSettingsItemContentAction(
                      action,
                      "settings_action_description"
                    )}
                  </div>
                  <button
                    onMouseEnter={() =>
                      handleSettingsItemHoverAction(
                        action,
                        componentState,
                        "hover"
                      )
                    }
                    onMouseLeave={() =>
                      handleSettingsItemHoverAction(
                        action,
                        componentState,
                        "blur"
                      )
                    }
                    onClick={() => handleSettingsItemRedirectAction(action)}
                    className={styles?.settings_actions_content_button}
                  >
                    {handleRenderLazyLoadImageComponentAction(
                      handleSettingsItemImageSourceAction(
                        componentState,
                        action
                      ),
                      "",
                      25,
                      25
                    )}
                  </button>
                </div>
              );
            }
          )}
        </div>
        <button
          className={styles?.settings_back_button}
          onClick={() => handleAlterSettingsStateAction(componentState)}
        >
          <div className={styles?.settings_back_button_title}>
            {handleRenderFormDataAction(
              componentState,
              "settings_back_button_title"
            )}
          </div>
          {handleRenderLazyLoadImageComponentAction(
            handleRenderFormDataAction(
              componentState,
              "settings_back_button_icon"
            ),
            "",
            25,
            25
          )}
        </button>
      </div>
    </div>
  );
}
