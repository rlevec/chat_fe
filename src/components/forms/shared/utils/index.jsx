import { routes } from "../../../../routes";

import { navigate } from "../../../../utils";

import {
  handleUserGlobalStateAction,
  handleLogoutAction,
} from "../../../../utils";

import React, { lazy, Suspense } from "react";

import styles from "../styles/form.module.css";

const Header = lazy(() => import("../components/header"));
const Button = lazy(() => import("../components/button"));
const Statuses = lazy(() => import("../components/statuses"));
const Inputs = lazy(() => import("../components/inputs"));
const Description = lazy(() => import("../components/description"));
const FileInput = lazy(() => import("../components/file_input"));

import FetchIndicator from "../../../shared/fetch_indicator";

const handleDisablePointerEventsAction = (componentState) => {
  const {
    backendResponseMessage: { success: responseSuccess, error: responseError },
    isServerRequestPending,
    isServerRequestInError,
  } = componentState;

  if (
    responseSuccess ||
    responseError ||
    isServerRequestPending ||
    isServerRequestInError
  )
    return true;
  else return false;
};

export const handleFormWrapperClassNamesAction = (componentState) => {
  const disablePointerEvents = handleDisablePointerEventsAction(componentState);

  const defaultClassName = styles?.form_wrapper;
  const additionalClassName = styles?.disable_pointer_events;

  if (disablePointerEvents) {
    return `${defaultClassName} ${additionalClassName}`;
  } else return defaultClassName;
};

export const handleFormRenderConditionAction = (componentState) => {

  const { formData, query, fieldError, invalidSession } = componentState || {};

  return !invalidSession?.error && formData && fieldError && query;
};

export const handleComponentRenderAction = (componentState, component) => {
  const {
    formData: {
      renderConditions: {
        header,
        description,
        inputs,
        statuses,
        button,
        fileInput,
      } = {},
    } = {},
  } = componentState || {};

  return (
    <Suspense
      fallback={
        <FetchIndicator component={component} componentState={componentState} />
      }
    >
      {header && (
        <Header componentState={componentState} component={component} />
      )}
      {description && (
        <Description componentState={componentState} component={component} />
      )}
      {inputs && (
        <Inputs componentState={componentState} component={component} />
      )}
      {fileInput && (
        <FileInput componentState={componentState} component={component} />
      )}
      {statuses && (
        <Statuses componentState={componentState} component={component} />
      )}
      {button && (
        <Button componentState={componentState} component={component} />
      )}
    </Suspense>
  );
};


export const handleFormClassNamesAction = (componentState) => {
  const {
    backendResponseMessage: {
      success: successResponse,
      error: errorResponse
    }
  } = componentState || {}


  const defaultClassName = styles?.form_container
  const additionalClassNameError = styles?.form_container_error
  const additionalClassNameSuccess= styles?.form_container_success

  if(successResponse) return `${defaultClassName} ${additionalClassNameSuccess}`
  else if(errorResponse) return `${defaultClassName} ${additionalClassNameError}`
  else return defaultClassName
}

export const handlePopulateInitialStateValuesAction = (componentState) => {
 
  const {
    formData = {}, 
    setQuery,
    setFieldError,
  } = componentState || {}; 
  const { formFields = [], termsInput = {} } = formData; 

  const newQueryState = {};
  const newFieldErrorState = {};


  if (formFields?.length) {
    formFields.forEach((formField) => {
      const { frontendSlug, initialValue } = formField;

      newQueryState[frontendSlug] = initialValue;
      newFieldErrorState[frontendSlug] = false;
    });
  }


  if (termsInput?.frontendSlug) {
    newQueryState[termsInput.frontendSlug] = termsInput.initialValue;
    newFieldErrorState[termsInput.frontendSlug] = false;
  }

  setQuery(newQueryState);
  setFieldError(newFieldErrorState);
};


export const handlePasswordComparisonAction = (
  passwordOneValue,
  passwordTwoValue,
  targetKey,
  setFieldError
) => {
  if (passwordOneValue !== passwordTwoValue) {
    setFieldError((prevFieldError) => ({
      ...prevFieldError,
      [targetKey]: true,
    }));
  } else
    setFieldError((prevFieldError) => ({
      ...prevFieldError,
      [targetKey]: false,
    }));
};

export const handlePostFormDataAction = async (
  event,
  componentState,
  component
) => {
  event?.preventDefault();

  const { query, setIsServerRequestPending, setIsServerRequestInError } =
    componentState;

  const serverRootRoute = routes?.server?.root;
  const targetRoute = routes?.server?.[component];

  const endpoint = `${serverRootRoute}${targetRoute}`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
      credentials: "include",
    });

    setIsServerRequestPending(true);
    const responseData = await response.json();

    handleResponseAction(responseData, componentState);
  } catch (error) {
    setIsServerRequestInError(true);
    console.error("Error posting form data:", error);
  } finally {
    setIsServerRequestPending(false);
  }
};

export const handlePutFormDataAction = (
  event,
  token,
  component,
  componentState
) => {
  if (event) event?.preventDefault();

  const user = handleUserGlobalStateAction("get");

  const {
    setBackendResponseMessage,
    setIsServerRequestPending,
    setIsServerRequestInError,
    query,
  } = componentState || {};

  const serverRootRoute = routes?.server?.root;
  const targetRoute = routes?.server?.[component];

  let endpoint = "";

  const userAsQueryParam = [
    "change_password",
    "change_email",
    "change_username",
  ];

  if (userAsQueryParam?.includes(component)) {
    endpoint = `${serverRootRoute}${targetRoute}?username=${user?.username}`;
  } else {
    endpoint = `${serverRootRoute}${targetRoute}?token=${token}`;
  }

  const sendBody = [
    "change_password",
    "reset_password",
    "change_email",
    "change_username",
  ];

  (async () => {
    try {
      setIsServerRequestPending(true);

      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendBody.includes(component) ? query : {}),
        credentials: "include",
      });

      const responseData = await response.json();

      handleResponseAction(responseData, componentState);
    } catch (error) {
      setIsServerRequestInError(true);
      console.error("Error on put request:", error);
    } finally {
      setIsServerRequestPending(false);
    }
  })();
};

export const handleDeleteFormDataAction = (
  event,
  component,
  componentState
) => {
  event.preventDefault();

  const user = handleUserGlobalStateAction("get");

  const { setIsServerRequestPending, setIsServerRequestInError } =
    componentState;

  const serverRootRoute = routes?.server?.root;

  const targetRoute = routes?.server?.[component];

  const endpoint = `${serverRootRoute}${targetRoute}?username=${user?.username}`;

  (async () => {
    setIsServerRequestPending(true);

    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const responseData = await response.json();

      handleResponseAction(responseData, componentState);
    } catch (error) {
      setIsServerRequestInError(true);
      console.error("Error on delete request:", error);
    } finally {
      setIsServerRequestPending(false);
    }
  })();
};

const handleResponseAction = async (response, componentState) => {
  const {
    error,
    success,
    message,
    data,
    redirect,
    setUser,
    removeUser,
    removePreview,
    removeImage,
    imageFrontendSlug,
    abort,
  } = response || {};

  const { setBackendResponseMessage, setPreviewFile, setQuery } =
    componentState || {};

 
  setBackendResponseMessage((prevBackendResponseMessage) => ({
    ...prevBackendResponseMessage,
    error: error ? message : null,
    success: success ? message : null,
  }));

  let timeout = setTimeout(async () => {
  
    setBackendResponseMessage((prevBackendResponseMessage) => ({
      ...prevBackendResponseMessage,
      success: null,
      error: null,
    }));

   
    if (abort) {
      setPreviewFile(null);
      setQuery((prevQuery) => ({
        ...prevQuery,
        [imageFrontendSlug]: null,
      }));
    }
    if (removePreview) {
      setPreviewFile(null);
    }
    if (removeImage) {
      setQuery((prevQuery) => ({
        ...prevQuery,
        [imageFrontendSlug]: null,
      }));
    }
    if (setUser && data) {
      await handleUserGlobalStateAction("set", data);
    }
    if (removeUser) {
      await handleLogoutAction(componentState);
    }
    if (redirect) {
      navigate(redirect);
    }
  }, 3000);

 
  return () => clearTimeout(timeout);
};

export const handleUploadImageAction = async (
  event,
  componentState,
  component
) => {
  const {
    query = {},
    setIsServerRequestPending,
    setIsServerRequestInError,
  } = componentState || {};
  const serverRootRoute = routes?.server?.root;
  const targetRoute = routes?.server?.upload_profile_picture 

  const frontendSlugByComponent = {
    upload_profile_picture: "uploadProfilePicture",
  };

  const directoryNameByComponent = {
    upload_profile_picture: "profile_pictures",
  };

 

  const directoryName = directoryNameByComponent?.[component];
  const frontendSlug = frontendSlugByComponent?.[component];

  let endpoint = `${serverRootRoute}${targetRoute}`;

  event.preventDefault();

  const file = query?.[frontendSlug] || null;

  const queryParams = new URLSearchParams();
  const { username } = handleUserGlobalStateAction("get");

  if (frontendSlug) queryParams?.append("formDataName", frontendSlug);
  if (username) queryParams?.append("username", username);
  if (directoryName) queryParams?.append("directoryName", directoryName);

  if (queryParams.toString()) {
    endpoint += `?${queryParams.toString()}`;
  }

  if (!file) return;

  const formData = new FormData();
  formData.append(frontendSlug, file);


  try {
    setIsServerRequestPending(true);


    // credentials include on file upload do not work
    // without being on the same domain
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
      //credentials: "include"
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    handleResponseAction(responseData, componentState);
  } catch (error) {
  
      setIsServerRequestInError(true);

      const customCatchResponseData = {
        error: true,
        message: error?.message || "Internal server error",
        removeUser: true,
        redirect: "/login",
        removePreview: true,
        removeImage: true,
        imageFrontendSlug: "uploadProfilePicture"
      }
      console.error("Error posting file data:", error);
      handleResponseAction(customCatchResponseData, componentState);

  } finally {
    setIsServerRequestPending(false);
  }
};
