import CircularLoader from "../../../../../shared/circular_loader";
import LazyLoadImage from "../../../../../shared/lazy_load_image";


import styles from "../styles/button.module.css"

export const handleDisableButtonAction = (componentState) => {
    const {
      fieldError,
      query,
      isServerRequestPending,
      backendResponseMessage: { success, error },
    } = componentState || {};

    const isAnyQueryValueInvalid = Object.values(query)?.some(
      (queryValue) => queryValue === "" || queryValue === false
    );
    const isAnyInputFieldInError = Object.values(fieldError)?.some(
      (fieldError) => fieldError
    );
  
    if (
      isAnyQueryValueInvalid ||
      isAnyInputFieldInError ||
      isServerRequestPending ||
      success ||
      error
    )
      return true;
    else return false;
  };
  


  export const handleButtonTitleIconAction = (componentState) => {
    const {
      isServerRequestPending,
      backendResponseMessage,
      formData: {
        button: {
          title: buttonTitle,
          successIcon: responseSuccessIcon,
          errorIcon: responseErrorIcon,
        },
      },
    } = componentState || {}

    if(isServerRequestPending) return <CircularLoader/>
    else if(backendResponseMessage?.success) {
      return (
        <div className={styles?.button_icon_container}>
      <LazyLoadImage
      src={responseSuccessIcon}
      alt={""}
      width={25}
      height={25}
      crossOrigin={"Anyonymus"}
    />
        </div>


    )
  } 
    else if(backendResponseMessage?.error) {
      return (
        <div className={styles?.button_icon_container}>
      <LazyLoadImage
      src={responseErrorIcon}
      alt={""}
      width={25}
      height={25}
      crossOrigin={"Anyonymus"}
    />
        </div>
  
      )
    } else return buttonTitle
  }