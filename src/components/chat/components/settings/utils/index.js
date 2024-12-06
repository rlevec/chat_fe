import { navigate } from "../../../../../utils"

export const handleAlterSettingsStateAction = (componentState) => {

    const {
      setSettingsActive,
      settingsActive
    } = componentState || {}

    setSettingsActive(!settingsActive)
}


export const handleRenderFormDataAction = (componentState, type) => {
    const {
        formData: {
            settings: {
              actions: settingsActions,
              title: settingsTitle,
              backButton: { title: settingsBackButtonTitle, icon: settingsBackButtonIcon },
              closeIcon: settingsCloseIcon,
            } = {},
          } = {},
    } = componentState || {}
  
  
    const formData = {
       settings_actions: settingsActions,
       settings_title: settingsTitle,
       settings_back_button_title: settingsBackButtonTitle,
       settings_back_button_icon: settingsBackButtonIcon,
       settings_close_icon: settingsCloseIcon
    }
  
    return formData?.[type]
  }
  
  

  export const handleSettingsItemImageSourceAction = (componentState, action) => {

    const {
      frontendSlug: actionFrontendSlug,
      icon: actionIcon,
      iconHover: actionIconHover
    } = action || {}

    const {
        settingsActionHovered
    } = componentState || {}

    if(settingsActionHovered === actionFrontendSlug) return actionIconHover
    else return actionIcon
  }

  export const handleRenderSettingsItemContentAction = (action, type) => {
    const {
        id: settingsActionId,
        title: settingsActionTitle,
        description: settingsActionDescription,
        frontendSlug: settingsActionFrontendSlug,
        icon: settingsActionIcon,
        iconHover: settingsActionIconHover,
        redirect: settingsActionRedirect
      } = action;

      const settingsItemContent = {
        settings_action_title: settingsActionTitle,
        settings_action_description: settingsActionDescription,
        settings_action_frontend_slug: settingsActionFrontendSlug,
        settings_action_icon: settingsActionIcon,
        settings_action_icon_hover: settingsActionIconHover,
        settings_action_redirect: settingsActionRedirect,
        settings_action_id: settingsActionId
      }

      return settingsItemContent?.[type] || ""
  }

  export const handleSettingsItemRedirectAction = (action) => {
    const settingsActionRedirect = handleRenderSettingsItemContentAction(action, "settings_action_redirect")
    
    if(settingsActionRedirect) navigate(settingsActionRedirect)
  }

  export const handleSettingsItemHoverAction = (action, componentState, type) => {

    const {
        setSettingsActionHovered
    } = componentState || {}

    const settingsActionFrontendSlug = handleRenderSettingsItemContentAction(action, "settings_action_frontend_slug")
   
    if(type === "hover") {
        setSettingsActionHovered(settingsActionFrontendSlug)
    } else if(type === "blur") {
        setSettingsActionHovered(null)
    } else return null
  }

  export const handleSettingsItemsArrayKeyAction = (action) => {
     const settingsActionId = handleRenderSettingsItemContentAction(action, "settings_action_id")
     const settingsActionFrontendSlug = handleRenderSettingsItemContentAction(action, "settings_action_frontend_slug")

     return `${settingsActionId}-${settingsActionFrontendSlug}`
  }