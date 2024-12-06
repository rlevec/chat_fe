import { handleUserGlobalStateAction } from "../../../../../../../utils";

import { navigate } from "../../../../../../../utils";

export const handleRenderUserInfoAction = (type) => {
  const user = handleUserGlobalStateAction("get");

  const letterIndicator = user?.username?.split("")?.[0] || "";
  const userUsername = user?.username || "";
  const userProfilePicture = user?.profile_picture || ""

  const info = {
    letter_indicator: letterIndicator,
    user_username: userUsername,
    user_profile_picture: userProfilePicture
  };

  return info?.[type];
};

export const handleAlterSettingsStateAction = (componentState) => {
  const { setSettingsActive, settingsActive } = componentState || {};

  setSettingsActive(!settingsActive);
};

export const handleRenderFormDataAction = (componentState, type) => {
  const {
    formData: {
      sidebar: {
        user: {
          settings: { 
            icon: settingsIcon 
          } = {},
          edit: {
            redirect: editRedirect,
            icon: editIcon
          }
        } = {},
        user
      } = {},
    },
  } = componentState || {};

  const formData = {
    settings_icon: settingsIcon || "",
    edit_icon: editIcon || "",
    edit_redirect: editRedirect || "",
    user: user
  }

  return formData?.[type]
};


export const handleRenderComponentConditionAction = (componentState) => {

  const user = handleRenderFormDataAction(componentState, "user")

  return Boolean(user)
}



export const handleRenderProfilePictureConditionAction = () => {
  const user = handleUserGlobalStateAction("get");

  return Boolean(user?.profile_picture)
}


export const handleUploadProfilePictureRedirectAction = (componentState) => {

 const redirect = handleRenderFormDataAction(componentState, "edit_redirect")

 if(redirect) navigate(redirect)
}