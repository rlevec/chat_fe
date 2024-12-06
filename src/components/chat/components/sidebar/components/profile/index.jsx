import React from "react";

import styles from "./styles/profile.module.css";

import { handleRenderLazyLoadImageComponentAction } from "../../../../utils";

import { handleUploadProfilePictureRedirectAction } from "./utils";

import {
  handleRenderUserInfoAction,
  handleAlterSettingsStateAction,
  handleRenderFormDataAction,
  handleRenderComponentConditionAction,
  handleRenderProfilePictureConditionAction,
} from "./utils";

export default function Profile(props) {
  const { component = "", componentState = {} } = props || {};

  const newComponent = `${component}_profile`;


  if (handleRenderComponentConditionAction(componentState)) {
    return (
      <div className={styles?.profile_wrapper} key={newComponent}>
        <div
          className={styles?.sidebar_user_edit_image_container}
          onClick={() => handleUploadProfilePictureRedirectAction(componentState)}
        >
          {handleRenderLazyLoadImageComponentAction(
            handleRenderFormDataAction(componentState, "edit_icon"),
            "",
            20,
            20
          )}
        </div>
        <div className={styles.connection_indicator}>Connected</div>
        <div className={styles?.sidebar_user_wrapper}>
          <div className={styles?.sidebar_user_profile_container}>
            {handleRenderProfilePictureConditionAction() ? (
              <div className={styles?.sidebar_user_profile_image_container}>
                {handleRenderLazyLoadImageComponentAction(
                handleRenderUserInfoAction("user_profile_picture"),
                "",
                125,
                125,
                true
              )}
              </div>
            ) : (
              <div className={styles?.sidebar_user_profile_no_image_container}>
                {handleRenderUserInfoAction("letter_indicator")}
              </div>
            )}
          </div>
          <div className={styles?.sidebar_user_info_settings_wrapper}>
            <div className={styles?.sidebar_user_info_container}>
              <div className={styles?.sidebar_user_info_username}>
                {handleRenderUserInfoAction("user_username")}
              </div>
            </div>
            <div
              className={styles?.sidebar_user_settings_container}
              onClick={() => handleAlterSettingsStateAction(componentState)}
            >
              {handleRenderLazyLoadImageComponentAction(
                handleRenderFormDataAction(componentState, "settings_icon"),
                "",
                25,
                25
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else return null;
}
