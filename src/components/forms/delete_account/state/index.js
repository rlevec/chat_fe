import { useState } from "react";

export const useHandleDeleteAccountComponentState = () => {
  const [formData, setFormData] = useState(null);
  const [isServerRequestPending, setIsServerRequestPending] = useState(false);
  const [isServerRequestInError, setIsServerRequestInError] = useState(false);
  const [backendResponseMessage, setBackendResponseMessage] = useState({
    error: false,
    success: false,
  });
  const [query, setQuery] = useState(null)
  const [fieldError, setFieldError] = useState(null)
  const [invalidSession, setInvalidSession] = useState({
    error: null,
    message: null,
    redirect: null
  })

  return {
    formData,
    setFormData,
    isServerRequestPending,
    setIsServerRequestPending,
    isServerRequestInError,
    setIsServerRequestInError,
    backendResponseMessage,
    setBackendResponseMessage,
    query, 
    setQuery,
    fieldError, 
    setFieldError,
    invalidSession,
    setInvalidSession
  };
};
