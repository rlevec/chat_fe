import { useState } from "react";

export const useHandleLoginComponentState = () => {
  const [formData, setFormData] = useState(null);
  const [isServerRequestPending, setIsServerRequestPending] = useState(false);
  const [isServerRequestInError, setIsServerRequestInError] = useState(false);
  const [query, setQuery] = useState(null);
  const [fieldError, setFieldError] = useState(null);
  const [backendResponseMessage, setBackendResponseMessage] = useState({
    error: false,
    success: false,
  });
  const [passwordFieldInputType, setPasswordFieldInputType] = useState({
    password: "password",
  });
  const [modalActive, setModalActive] = useState({
    terms: false,
    privacyPolicy: false,
  });

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
    passwordFieldInputType,
    setPasswordFieldInputType,
    modalActive,
    setModalActive
  };
};
