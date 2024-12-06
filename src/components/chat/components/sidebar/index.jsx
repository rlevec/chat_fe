import React from "react";

import styles from "./styles/sidebar.module.css";

import {handleRenderLazyLoadImageComponentAction, handleRenderComponentAction } from "../../utils";

import {
  handleSidebarAlterationClassNamesAction,
  handleLogoutButtonAction,
  handleAlterSidebarStateButtonAction,
  handleAlterSidebarStateButtonSourceAction,
  handleSidebarStateRenderConditionAction,
  handleRenderFormDataAction,
  handleRenderComponentConditionAction,
  handleAlterSettingsStateAction
} from "./utils";


export default function Sidebar(props) {
  const { socket, component, componentState } = props || {};

  const newComponent = `${component}_sidebar`;

  if (handleRenderComponentConditionAction(componentState)) {
    return (
      <div
        key={newComponent}
        className={handleSidebarAlterationClassNamesAction(
          componentState,
          "sidebar_wrapper"
        )}
      >
        <div className={styles?.sidebar_container}>
          <div
            className={handleSidebarAlterationClassNamesAction(
              componentState,
              "sidebar_header_wrapper"
            )}
          >
            <div
              className={handleSidebarAlterationClassNamesAction(
                componentState,
                "sidebar_header_container"
              )}
            >
              <div
                className={styles?.sidebar_header_image_container}
                onClick={() => handleLogoutButtonAction(componentState)}
              >
                {handleRenderLazyLoadImageComponentAction(
                  handleRenderFormDataAction(
                    componentState,
                    "logout_icon"
                  ),
                  "",
                  35,
                  35
                )}
              </div>
              {!handleSidebarStateRenderConditionAction(componentState) && (
                <div className={styles?.sidebar_header_separator} />
              )}
              {!handleSidebarStateRenderConditionAction(componentState) && (
                <div
                  className={styles?.sidebar_header_settings_container}
                  onClick={() =>
                    handleAlterSettingsStateAction(componentState)
                  }
                >
                  {handleRenderLazyLoadImageComponentAction(
                    handleRenderFormDataAction(
                      componentState,
                      "settings_icon"
                    ),
                    "",
                    25,
                    25
                  )}
                </div>
              )}
              {!handleSidebarStateRenderConditionAction(componentState) && (
                <div className={styles?.sidebar_header_separator} />
              )}
              <div
                className={styles?.sidebar_header_image_container}
                onClick={() =>
                  handleAlterSidebarStateButtonAction(componentState)
                }
              >
                {handleRenderLazyLoadImageComponentAction(
                  handleAlterSidebarStateButtonSourceAction(
                    componentState
                  ),
                  "",
                  25,
                  35
                )}
              </div>
            </div>
          </div>
          {handleSidebarStateRenderConditionAction(componentState) &&
            handleRenderComponentAction(
              { componentState, component: newComponent },
              "user_profile"
            )}
          {handleSidebarStateRenderConditionAction(componentState) &&
            handleRenderComponentAction(
              { socket, componentState, component: newComponent },
              "add_search_contact_inputs"
            )}
          {handleSidebarStateRenderConditionAction(componentState) &&
            handleRenderComponentAction(
              { componentState, component: newComponent },
              "contact_filter"
            )}
          {handleSidebarStateRenderConditionAction(componentState) &&
            handleRenderComponentAction(
              { socket, componentState, component: newComponent },
              "contact_list"
            )}
        </div>
      </div>
    );
  }
}
