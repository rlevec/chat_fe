import styles from "../styles/notifications.module.css"


export const handleNotificationTypeAction = (componentState) => {

    const {
        backendResponseMessage: {
            success = null,
            error = null
        } = {}
    } = componentState || {}

   if(success) return "success"
   else if(error) return "error"
   else return null
}

export const handleRenderNotificationContentAction = (componentState) => {
    const {
        backendResponseMessage: {
            success = null,
            error = null
        } = {}
    } = componentState || {}

    return success || error
}


export const handleCloseNotificationAction = (componentState) => {

    const {
        setBackendResponseMessage
    } = componentState || {}

    setBackendResponseMessage((prevBackendResponseMessage) => ({
        ...prevBackendResponseMessage,
        success: null,
        error: null
    }))
}

export const handleClassNamesAction = (notificationType, type) => {

    const notificationsWrapperClassName =`${styles.notifications_wrapper} ${notificationType && styles[notificationType]}`
    
    const classNames = {
        notifications_wrapper: notificationsWrapperClassName
    }

    return classNames?.[type]
}


export const handleImageSourceAction = (componentState) => {
    const {
      formData: {
        notifications: {
            icons: {
                success: notificationSuccessIcon,
                error: notificationErrorIcon
            } = {}
        } = {}
      } = {},
        backendResponseMessage: {
            success = null,
            error = null
        } = {}
    } = componentState || {}

    if(success) return notificationSuccessIcon
    else if(error) return notificationErrorIcon
    else return null
  }
  