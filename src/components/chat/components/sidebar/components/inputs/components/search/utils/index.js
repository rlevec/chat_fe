export const handleRenderFormDataAction = (componentState, type) => {
  const {
    formData: {
      sidebar: {
        searchContact: {
          input: {
            name: searchInputName,
            placeholder: searchInputPlaceholder,
            type: searchInputType,
            searchIcon: searchInputIcon,
            frontendSlug: searchInputFrontendSlug,
          } = {},
        } = {},
        searchContact
      } = {},
    } = {},
  } = componentState || {};

  const formData = {
    search_input_name: searchInputName,
    search_input_placeholder: searchInputPlaceholder,
    search_input_type: searchInputType,
    search_input_icon: searchInputIcon,
    search_input_frontend_slug: searchInputFrontendSlug,
    search_contact: searchContact
  };

  return formData?.[type] || "";
};

export const handleRenderComponentConditionAction = (componentState) => {

  const searchContact = handleRenderFormDataAction(componentState, "search_contact")

  return Boolean(searchContact);
};

export const handleOnChangeEventAction = (event, componentState) => {
  const {
    setQuery,
    setFilteredContactList,
    contactList,
  } = componentState || {};

  const frontendSlug = handleRenderFormDataAction(componentState, "search_input_frontend_slug")

  const value = event?.target?.value || "";

  setQuery((prevQuery) => ({
    ...prevQuery,
    [frontendSlug]: value,
  }));

  if (value !== "") {
    const newFilteredContactList = contactList?.filter((contact) =>
      contact?.username?.toLowerCase()?.includes(value?.toLowerCase())
    );
    setFilteredContactList(newFilteredContactList);
  } else setFilteredContactList(contactList);
};

export const handleInputValueAction = (componentState) => {
  const { 
    query
   } = componentState || {};

   const frontendSlug = handleRenderFormDataAction(componentState, "search_input_frontend_slug")

  return query?.[frontendSlug] || undefined;
};
