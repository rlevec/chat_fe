import { useState } from "react";

export const useHandleRegistrationComponentState = () => {
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
    confirmPassword: "password",
  });

  const [isModalOpen, setIsModalOpen] = useState(null)

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
    isModalOpen, 
    setIsModalOpen
  };
};
