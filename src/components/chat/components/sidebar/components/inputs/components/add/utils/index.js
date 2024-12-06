import styles from "../styles/add.module.css"


export const handleRenderFormDataAction = (componentState, type) => {
  const {
    formData: {
      sidebar: {
        addContact: {
          input: {
            name: addInputName,
            placeholder: addInputPlaceholder,
            type: addInputType,
            searchIcon: addInputIcon,
            frontendSlug: addInputFrontendSlug,
            validation: addInputValidation,
            validationMessage: addInputValidationMessage,
            fieldIcons: {
              valid: validInputFieldIcon,
              error: errorInputFieldIcon
            }
          } = {},
          button: {
            icons: {
              valid: validButtonIcon,
              error: errorButtonIcon
            }
          }
        } = {},
        addContact
      } = {},
    } = {},
  } = componentState || {};

  const formData = {
    add_input_name: addInputName,
    add_input_placeholder: addInputPlaceholder,
    add_input_type: addInputType,
    add_input_icon: addInputIcon,
    add_input_frontend_slug: addInputFrontendSlug,
    add_input_validation: addInputValidation,
    add_input_validation_message: addInputValidationMessage,
    valid_input_field_icon: validInputFieldIcon,
    error_input_field_icon: errorInputFieldIcon,
    valid_button_icon: validButtonIcon,
    error_button_icon: errorButtonIcon,
    add_contact: addContact
  };

  return formData?.[type] || "";
};

export const handleRenderComponentConditionAction = (componentState) => {

  const addContact = handleRenderFormDataAction(componentState, "add_contact")

  return Boolean(addContact);
};


export const handleOnChangeEventAction = (
    event,
    componentState
) => {

  const frontendSlug = handleRenderFormDataAction(componentState, "add_input_frontend_slug")
  const validation =  handleRenderFormDataAction(componentState, "add_input_validation")

    const { setQuery, setFieldError } = componentState || {};
  
    const value = event?.target?.value || "";
  
    setQuery((prevQuery) => ({ ...prevQuery, [frontendSlug]: value }));
  
    let regex = new RegExp(validation);
    
  
    const isInputValueValid = regex.test(value);
  
    setFieldError((prevFieldError) => ({
      ...prevFieldError,
      [frontendSlug]: !isInputValueValid,
    }));
}


export const handleInputValueAction = (componentState) => {
  const { query } = componentState || {};

  const frontendSlug = handleRenderFormDataAction(componentState, "add_input_frontend_slug")

  return query?.[frontendSlug] || undefined;
};



export const handleIconAction = (
  componentState,
  type
) => {
  const { fieldError } = componentState || {};
  
   const frontendSlug = handleRenderFormDataAction(componentState, "add_input_frontend_slug")
  const validInputFieldIcon = handleRenderFormDataAction(componentState, "valid_input_field_icon")
  const errorInputFieldIcon = handleRenderFormDataAction(componentState, "error_input_field_icon")
  const validButtonIcon = handleRenderFormDataAction(componentState, "valid_button_icon")
  const errorButtonIcon = handleRenderFormDataAction(componentState, "error_button_icon")

  if (fieldError?.[frontendSlug]) {
    if(type === "input") {
       return errorInputFieldIcon
    } else if(type === "button") {
      return errorButtonIcon
    } else return null
  }
  else {
    if(type === "input") {
      return validInputFieldIcon
   } else if(type === "button") {
     return validButtonIcon
   } else return null
  }
};


export const handleIsInputInErrorConditionAction = (componentState) => {

  const {
    fieldError
  } = componentState || {}

  const frontendSlug = handleRenderFormDataAction(componentState, "add_input_frontend_slug")
  

  return fieldError?.[frontendSlug];
};



export const handleDisableButtonAction = (componentState) => {

  const {
    fieldError,
    query
  } = componentState || {}

  const frontendSlug = handleRenderFormDataAction(componentState, "add_input_frontend_slug")

  return query?.[frontendSlug] === "" || fieldError?.[frontendSlug]
}

export const handleInputFieldClassNamesAction = (componentState) => {
     const {
        fieldError
     } = componentState

     const frontendSlug = handleRenderFormDataAction(componentState, "add_contact")?.input?.frontendSlug

     const defaultClass = styles?.sidebar_header_add_contact_input
     const borderClass = styles?.sidebar_header_add_contact_error_border

     if(fieldError?.[frontendSlug]) return `${defaultClass} ${borderClass}`
     else return `${defaultClass}`
}

export const handleAddContactAction = (socket, componentState) => {

  const {
      query: {
        addContact: contactUsername
      } = {}
  } = componentState || {}


  if (!contactUsername) {
    console.error("No contact username provided.");
  }

  if (socket.current) {
    try {
      socket.current.emit("send_contact_request", { contactUsername });
    } catch (error) {
      console.error("Error emitting send_contact_request:", error);
    }
  } else {
    console.error("Socket is not initialized.");
  }
};
