import styles from "../styles/sidebar.module.css";

import { handleLogoutAction } from "../../../../../utils";

export const handleSidebarAlterationClassNamesAction = (
  componentState,
  type
) => {
  const { sidebarOpened } = componentState || {};

  const sidebarWrapperClassNames = `${styles?.sidebar_wrapper} ${
    sidebarOpened ? styles?.sidebar_opened : styles?.sidebar_closed
  }`;

  const sidebarHeaderWrapperClassNames = `${styles?.sidebar_header_wrapper} ${
    sidebarOpened
      ? styles?.sidebar_header_wrapper_opened
      : styles?.sidebar_header_wrapper_closed
  }`;

  const sidebarHeaderContainerClassNames = `${
    styles?.sidebar_header_container
  }  ${
    sidebarOpened
      ? styles?.sidebar_header_opened
      : styles?.sidebar_header_closed
  }`;

  const classNames = {
    sidebar_wrapper: sidebarWrapperClassNames,
    sidebar_header_wrapper: sidebarHeaderWrapperClassNames,
    sidebar_header_container: sidebarHeaderContainerClassNames,
  };

  return classNames?.[type];
};

export const handleLogoutButtonAction = (componentState) => {
    const {
       setSelectedContact,
       setConversationParticipants
    } = componentState

    const cb = () => {
      setSelectedContact(null)
      setConversationParticipants([])
    }

  handleLogoutAction(componentState, cb);
}

export const handleAlterSidebarStateButtonAction = (componentState) => {
  const { setSidebarOpened, sidebarOpened } = componentState || {};

  setSidebarOpened(!sidebarOpened);
};

export const handleAlterSidebarStateButtonSourceAction = (componentState) => {
  const { sidebarOpened } = componentState || {};

  const sidebarOpenedIcon = handleRenderFormDataAction(
    componentState,
    "sidebar_opened_icon"
  );
  const sidebarClosedIcon = handleRenderFormDataAction(
    componentState,
    "sidebar_closed_icon"
  );

  if (sidebarOpened) return sidebarOpenedIcon;
  else return sidebarClosedIcon;
};

export const handleSidebarStateRenderConditionAction = (componentState) => {
  const { sidebarOpened } = componentState || {};

  return sidebarOpened;
};

export const handleRenderFormDataAction = (componentState, type) => {
  const {
    formData: {
      sidebar: {
        header: {
          status: {
            opened: { icon: sidebarOpenedIcon } = {},
            closed: { icon: sidebarClosedIcon } = {},
          } = {},
          logout: { icon: logoutIcon } = {},
        } = {},
        user: { settings: { icon: settingsIcon } = {} } = {},
      } = {},
      sidebar,
    } = {},
  } = componentState || {};

  const formData = {
    settings_icon: settingsIcon,
    logout_icon: logoutIcon,
    sidebar_opened_icon: sidebarOpenedIcon,
    sidebar_closed_icon: sidebarClosedIcon,
    sidebar,
  };

  return formData?.[type];
};

export const handleRenderComponentConditionAction = (componentState) => {
  const sidebar = handleRenderFormDataAction(componentState, "sidebar");

  return Boolean(sidebar);
};


export const handleAlterSettingsStateAction = (componentState) => {
  const { setSettingsActive, settingsActive } = componentState || {};

  setSettingsActive(!settingsActive);
};
