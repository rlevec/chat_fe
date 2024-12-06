import { routes } from "../routes";

import { useEffect } from "react";

export const navigate = (url, replace = false) => {
  if (replace) {
    window.history.replaceState(null, "", url);
  } else {
    window.history.pushState(null, "", url);
  }


  window.dispatchEvent(new PopStateEvent("popstate"));
};

export const handleUserGlobalStateAction = (type, userData) => {
  if (type === "set") localStorage.setItem("user", JSON.stringify(userData));
  else if (type === "get") return JSON.parse(localStorage.getItem("user"));
  else if (type === "remove") localStorage.removeItem("user");
  else return null;
};




export const handleLogoutAction = async (componentState, callback) => {
  const {
    setBackendResponseMessage,
    setIsServerRequestInError,
    setIsServerRequestPending,
    setDisablePointerEvents
  } = componentState || {};

  const serverRootRoute = routes?.server?.root;
  const targetRoute = routes?.server?.logout;
  const endpoint = `${serverRootRoute}${targetRoute}`;

  try {
    setIsServerRequestPending(true);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
      credentials: "include",
    });

    const responseData = await response.json();
    const { error, success, message, redirect, disablePointerEvents } = responseData || {};
    
    if(callback) callback()
    if(disablePointerEvents) setDisablePointerEvents(true)
    setBackendResponseMessage((prevBackendResponseMessage) => ({
      ...prevBackendResponseMessage,
      error: error ? message : null,
      success: success ? message : null,
    }));

    let timeout = setTimeout(() => {
      setDisablePointerEvents(false)
      setBackendResponseMessage((prevBackendResponseMessage) => ({
        ...prevBackendResponseMessage,
        success: null,
        error: null,
      }));
      handleUserGlobalStateAction("remove");
      if (redirect) navigate(redirect);
    }, 3000);

    return () => clearTimeout(timeout);
  } catch (error) {
    setIsServerRequestInError(true);
    console.error("Error occurred during logout", error);
  } finally {
    setIsServerRequestPending(false);
  }
};

export const useHandleOutsideClickAction = (containerRef, callback) => {
  const handleClick = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      callback();
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleClick);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClick);
    };
  }, [containerRef.current]);
};



export const useHandleFetchFormDataAction = (componentState, component) => {
  const {
    setInvalidSession,
    setFormData,
    setIsServerRequestInError,
    setIsServerRequestPending,
    formData,
  } = componentState;

  const serverRootRoute = routes?.server?.root;
  const targetRoute = routes?.server?.[component];
  const endpoint = `${serverRootRoute}${targetRoute}`;

  const setWithExpiry = (key, value, ttl) => {
    const now = new Date();
    const item = {
      value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  };

  const getWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  };

  const localStorageKey = `formData_${component}`;
  const ttl = 3600000;
  
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        setIsServerRequestPending(true);

      
        const cachedData = getWithExpiry(localStorageKey);

        if (cachedData && !Boolean(formData)) {
          setFormData(cachedData);
          setIsServerRequestPending(false); 
          return;
        }

        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          signal,
        });

        const stringifiedResponse = await response?.json();

        const responseError = stringifiedResponse?.error;
        const responseSuccess = stringifiedResponse?.success;
        const responseMessage = stringifiedResponse?.message;
        const responseData = stringifiedResponse?.data;
        const invalidSession = stringifiedResponse?.invalidSession;
        const responseRedirect = stringifiedResponse?.redirect;

        if (responseSuccess && responseData) {
          setFormData(responseData);

       
          setWithExpiry(localStorageKey, responseData, ttl);
        }

        if (responseError) {
          if (invalidSession) {
            setInvalidSession((prevInvalidSession) => ({
              ...prevInvalidSession,
              error: true,
              message: responseMessage,
              redirect: responseRedirect,
            }));
            await handleLogoutAction(componentState);
          }
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          setIsServerRequestInError(true);
          console.error("Error fetching data:", error);
        }
      } finally {
        setIsServerRequestPending(false);
      }
    })();

    return () => controller.abort();
  }, [component]);
};

