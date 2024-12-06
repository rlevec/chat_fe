import { useState } from "react";

export const useHandleChangeEmailComponentState = () => {
  const [formData, setFormData] = useState(null);
  const [isServerRequestPending, setIsServerRequestPending] = useState(false);
  const [isServerRequestInError, setIsServerRequestInError] = useState(false);
  const [query, setQuery] = useState(null)
  const [fieldError, setFieldError] = useState(null);
  const [backendResponseMessage, setBackendResponseMessage] = useState({
    error: false,
    success: false,
  });
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
    query,
    setQuery,
    fieldError,
    setFieldError,
    backendResponseMessage,
    setBackendResponseMessage,
    invalidSession,
    setInvalidSession
  };
};
