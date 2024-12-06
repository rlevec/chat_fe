import styles from "../styles/inputs.module.css"

export const handleInputFieldClassNamesAction = (
    frontendSlug,
    componentState
  ) => {
    const isInputInError = handleIsInputInErrorConditionAction(frontendSlug, componentState)
  
    if(isInputInError) return `${styles?.inputs_input_field} ${styles?.inputs_input_field_error}`
    else return styles?.inputs_input_field
  }
  
  export const handleInputPasswordFieldTypeAction = (
    frontendSlug,
    componentState,
    type
  ) => {
    const { passwordFieldInputType } = componentState || {};
  
    return passwordFieldInputType?.[frontendSlug] || type;
  };


  export const handleInputOnChangeEventAction = (
    event,
    frontendSlug,
    validation,
    componentState
  ) => {
    const { setQuery, setFieldError } = componentState || {};
  
    let value;
  
    if (frontendSlug === "terms") value = event?.target?.checked || false;
    else value = event?.target?.value || "";
  
    setQuery((prevQuery) => ({ ...prevQuery, [frontendSlug]: value }));
  
    let regex = new RegExp(validation);
    
  
    const isInputValueValid = regex.test(value);
  
    setFieldError((prevFieldError) => ({
      ...prevFieldError,
      [frontendSlug]: !isInputValueValid,
    }));
  };

  export const handleInputValueAction = (componentState, frontendSlug) => {
    const { query } = componentState || {};
  
    return query?.[frontendSlug] || "";
  };

  

  export const handleInputFieldIconAction = (
    frontendSlug,
    fieldIcons,
    componentState
  ) => {
    const { fieldError } = componentState || {};
  
    const { valid: validIcon, error: errorIcon } = fieldIcons || {};
  
    if (fieldError?.[frontendSlug]) return errorIcon;
    else return validIcon;
  };

  
  export const handleIsInputInErrorConditionAction = (
    frontendSlug,
    componentState
  ) => {
    const { fieldError } = componentState || {};
  
    return fieldError?.[frontendSlug];
  };


  export const handlePasswordTypeToggleAction = (
    frontendSlug,
    componentState
  ) => {
    const { passwordFieldInputType, setPasswordFieldInputType } =
      componentState || {};
  
    if (passwordFieldInputType?.[frontendSlug] === "password")
      setPasswordFieldInputType((prevPasswordFieldInputType) => ({
        ...prevPasswordFieldInputType,
        [frontendSlug]: "text",
      }));
    else if (passwordFieldInputType?.[frontendSlug] === "text")
      setPasswordFieldInputType((prevPasswordFieldInputType) => ({
        ...prevPasswordFieldInputType,
        [frontendSlug]: "password",
      }));
    else return null;
  };


  export const handleInputPasswordFieldTypeIconAction = (
    frontendSlug,
    componentState,
    passwordTypeIcons
  ) => {
    const { passwordFieldInputType, fieldError } = componentState;
  
    const {
      show: { valid: passwordIconShowValid, error: passwordIconShowError },
      hide: { valid: passwordIconHideValid, error: passwordIconHideError },
    } = passwordTypeIcons || {};
  
    if (
      passwordFieldInputType?.[frontendSlug] === "password" &&
      fieldError?.[frontendSlug]
    )
      return passwordIconHideError;
    else if (
      passwordFieldInputType?.[frontendSlug] === "password" &&
      !fieldError?.[frontendSlug]
    )
      return passwordIconHideValid;
    else if (
      passwordFieldInputType?.[frontendSlug] === "text" &&
      fieldError?.[frontendSlug]
    )
      return passwordIconShowError;
    else if (
      passwordFieldInputType?.[frontendSlug] === "text" &&
      !fieldError?.[frontendSlug]
    )
      return passwordIconShowValid;
    else return null;
  };


  export const handleTermsLabelClassNamesAction = (isLink) => {
    if(isLink) return `${styles?.inputs_terms_field_labels_container} ${styles?.inputs_terms_field_label_with_link}`
    else return styles?.inputs_terms_field_labels_container
 }

 export const handleTermsInputFieldClassNamesAction = (
    frontendSlug,
    componentState
  ) => {
    const isInputInError = handleIsInputInErrorConditionAction(frontendSlug, componentState)
  
    if(isInputInError) return `${styles?.inputs_terms_field} ${styles?.inputs_terms_field_error}`
    else return styles?.inputs_terms_field
  }

