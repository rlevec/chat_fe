import styles from "../styles/filter.module.css";

export const handleRenderComponentConditionAction = (componentState) => {
  const contactFilters = handleRenderFormDataAction(
    componentState,
    "contact_filters"
  );

  return Boolean(contactFilters);
};

export const handleRenderFormDataAction = (componentState, type) => {
  const {
    formData: {
      sidebar: {
        dropdownIcons: {
          active: dropdownActiveIcon,
          inactive: dropdownInactiveIcon,
        } = {},
        contactFilters,
      } = {},
    } = {},
  } = componentState || {};

  const formData = {
    dropdown_active_icon: dropdownActiveIcon || "",
    dropdown_inactive_icon: dropdownInactiveIcon || "",
    contact_filters: contactFilters || [],
  };

  return formData?.[type];
};

export const handleImageSourceAction = (
  componentState,
  type,
  contactFilter
) => {
  const {
    contactListDropdownActive,
    contactListDropdownItemHovered,
    contactListFilter,
  } = componentState || {};

  const contactFilterIcon = handleDropdownFilterContentAction(contactFilter, "contact_filter_icon")
  const contactFilterIconHover = handleDropdownFilterContentAction(contactFilter, "contact_filter_icon_hover")
  const contactFilterFrontendSlug =  handleDropdownFilterContentAction(contactFilter, "contact_filter_frontend_slug")
  const contactFiltersFormData = handleRenderFormDataAction(componentState, "contact_filters")

  if (type === "hover_active") {
    if (
      contactFilterFrontendSlug === contactListFilter ||
      contactFilterFrontendSlug === contactListDropdownItemHovered
    )
      return contactFilterIconHover;
    else return contactFilterIcon;
  } else if (type === "caret") {
    if (contactListDropdownActive)
      return handleRenderFormDataAction(componentState, "dropdown_active_icon");
    else if (!contactListDropdownActive)
      return handleRenderFormDataAction(
        componentState,
        "dropdown_inactive_icon"
      );
    else return null;
  } else if(type === "dropdown_value") {
    const matchFilterObject = contactFiltersFormData?.find((contactFilter) => contactFilter?.frontendSlug === contactListFilter)

    if(matchFilterObject) {
      const filterIcon = matchFilterObject?.icon
  
      if(filterIcon) return filterIcon
      else return null
    }
  } else return null;
};

export const handleDropdownItemStateAction = (
  componentState,
  type,
  contactFilter
) => {
  const {
    setContactListDropdownItemHovered,
    setContactListFilter,
    setContactListDropdownActive,
    contactListDropdownActive,
  } = componentState || {};

  const contactFilterFrontendSlug = handleDropdownFilterContentAction(contactFilter, "contact_filter_frontend_slug")

  if (type === "hover") {
    setContactListDropdownItemHovered(contactFilterFrontendSlug);
  } else if (type === "blur") {
    setContactListDropdownItemHovered(null);
  } else if (type === "action") {
    setContactListFilter(contactFilterFrontendSlug);
    setContactListDropdownActive(!contactListDropdownActive);
  } else return null;
};

export const handleFilterDropdownStateAction = (componentState) => {
  const {
    setContactListDropdownActive,
    contactListDropdownActive,
    setContactListDropdownItemHovered,
  } = componentState || {};

  setContactListDropdownActive(!contactListDropdownActive);
  setContactListDropdownItemHovered(null);
};

export const handleDropdownItemClassNamesAction = (
  componentState,
  contactFilter
) => {
  const { contactListFilter } = componentState || {};

  const contactFilterFrontendSlug = handleDropdownFilterContentAction(contactFilter, "contact_filter_frontend_slug")

  const defaultClassName = styles?.filter_dropdown_content_container;
  const activeClassName = styles?.filter_dropdown_content_container_active;

  if (contactListFilter === contactFilterFrontendSlug)
    return `${defaultClassName} ${activeClassName}`;
  else return `${defaultClassName}`;
};

export const handleRenderDropdownMenuConditionAction = (componentState) => {
  const { contactListDropdownActive } = componentState || {};

  return Boolean(contactListDropdownActive);
};

export const handleRenderFilterValueAction = (componentState) => {
  const { contactListFilter } = componentState || {};

  return contactListFilter || "";
};


export const handleDropdownFilterContentAction = (contactFilter, type) => {
  const { id: contactFilterId, frontendSlug: contactFilterFrontendSlug, icon: contactFilterIcon, iconHover: contactFilterIconHover, title: contactFilterTitle } = contactFilter || {}

  const dropdownFilterContent = {
    contact_filter_id: contactFilterId,
    contact_filter_frontend_slug: contactFilterFrontendSlug,
    contact_filter_icon: contactFilterIcon,
    contact_filter_icon_hover: contactFilterIconHover,
    contact_filter_title: contactFilterTitle
  }

  return dropdownFilterContent?.[type]
  
}

export const handleContactFilterItemArrayKeyAction = (contactFilter) => {
  const contactFilterFrontendSlug = handleDropdownFilterContentAction(contactFilter, "contact_filter_frontend_slug")
  const contactFilterId = handleDropdownFilterContentAction(contactFilter, "contact_filter_id")

  return `${contactFilterId}-${contactFilterFrontendSlug}`
}

