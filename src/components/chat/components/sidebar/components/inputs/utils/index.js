import styles from "../styles/inputs.module.css"

import { handleRenderComponentAction} from "../../../../../utils"

export const handleRenderFormDataAction = (componentState, type) => {
    const {
        formData: {
          sidebar: {
              inputFilters = []
          }
        } = {},
      } = componentState || {}
  

      const formData = {
        input_filters: inputFilters
      }

    return formData?.[type]
  }
  
  export const handleRenderComponentConditionAction = (componentState) => {

    const inputFilters = handleRenderFormDataAction(componentState, "input_filters")
  
    return Boolean(inputFilters?.length)
  }
  


  export const handleImageSourceAction = (inputFilter, componentState) => {

    const {
      sidebarInputType
    } = componentState || {}

    const inputFilterFrontendSlug = handleInputFiltersArrayContentAction(inputFilter, "input_filter_frontend_slug")
    const inputFilterIcon = handleInputFiltersArrayContentAction(inputFilter, "input_filter_icon")
    const inputFilterIconActive = handleInputFiltersArrayContentAction(inputFilter, "input_filter_icon_active")

    if(sidebarInputType === inputFilterFrontendSlug ) return inputFilterIconActive
    else return inputFilterIcon
  }

  export const handleButtonClassNameAction = (inputFilter, componentState) => {
    const {
      sidebarInputType
    } = componentState || {}

    const inputFilterFrontendSlug = handleInputFiltersArrayContentAction(inputFilter, "input_filter_frontend_slug")

    const defaultClassName = styles?.inputs_filter_button
    const activeClassName = styles?.inputs_filter_button_active

    if(sidebarInputType === inputFilterFrontendSlug) return `${defaultClassName} ${activeClassName}`
    else return defaultClassName
  }

  

  export const handleSearchInputFilterButtonAction = (componentState, inputFilter) => {

    const {
      setQuery,
      setFieldError,
      setSidebarInputType,
      setFilteredContactList,
      contactList
    } = componentState || {}

    const inputFilterFrontendSlug = handleInputFiltersArrayContentAction(inputFilter, "input_filter_frontend_slug")

    const inputFilterFrontendSlugs = handleExtractInputFrontendSlugsAction(componentState)

    setQuery((prevQuery) => {
      const newQuery = { ...prevQuery };
    
      inputFilterFrontendSlugs.forEach((frontendSlug) => {
        newQuery[frontendSlug] = "";
      });
    
      return newQuery;
    });
    setFieldError((prevFieldError) => {
      const newFieldError = { ...prevFieldError };
    
      inputFilterFrontendSlugs.forEach((frontendSlug) => {
        newFieldError[frontendSlug] = "";
      });
    
      return newFieldError;
    });
    setSidebarInputType(inputFilterFrontendSlug);
    setFilteredContactList(contactList)
  }

  export const handleInputTypeRenderCondition = (componentState, type) => {
    const {
      sidebarInputType
    } = componentState || {}

     return sidebarInputType === type
  }

  export const handleInputFiltersArrayContentAction = (inputFilter, type) => {
    const { id: inputFilterId, frontendSlug: inputFilterFrontendSlug, icon: inputFilterIcon, iconActive: inputFilterIconActive } = inputFilter;

    const inputFilterContent = {
      input_filter_id: inputFilterId,
      input_filter_frontend_slug: inputFilterFrontendSlug,
      input_filter_icon: inputFilterIcon,
      input_filter_icon_active: inputFilterIconActive
    }

    return inputFilterContent?.[type]
  }

  export const handleinputFiltersArrayItemKeyAction = (inputFilter) => {
    const inputFilterId = handleInputFiltersArrayContentAction(inputFilter, "input_filter_id")
    const inputFilterFrontendSlug = handleInputFiltersArrayContentAction(inputFilter, "input_filter_frontend_slug")

    return `${inputFilterId}-${inputFilterFrontendSlug}`
  }

  export const handleExtractInputFrontendSlugsAction = (componentState) => {
     const inputFrontendSlugs = []

     const inputFilters = handleRenderFormDataAction(componentState, "input_filters")

     if(inputFilters?.length > 0) {
      inputFilters?.forEach((inputFilter) => {
        const {
            frontendSlug: inputFilterFrontendSlug
        } = inputFilter || {}

        if(inputFilterFrontendSlug) inputFrontendSlugs?.push(inputFilterFrontendSlug)
      })
     }

     return inputFrontendSlugs
  }

export const handleRenderInputFilterComponentsAction = (
  componentState,
  socket,
  newComponent
) => {
  if(handleInputTypeRenderCondition(componentState, "addContact")) {
    return handleRenderComponentAction(
        { componentState, component: newComponent, socket },
        "add_contact_input"
      )
  } else if(handleInputTypeRenderCondition(componentState, "searchContact")) {
    return handleRenderComponentAction(
      { componentState, component: newComponent, socket },
      "search_contact_input"
    )
  } else return null
}