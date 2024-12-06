import { useState } from "react";

export const useHandleErrorComponentState = () => {
  const [formData, setFormData] = useState({});
  const [isServerRequestPending, setIsServerRequestPending] =
    useState(false);
    const [isServerRequestInError, setIsServerRequestInError] =
    useState(false);
  const [backendResponseMessage, setBackendResponseMessage] =
    useState({ error: false, success: false });

  return {
    formData,
    setFormData,
    isServerRequestPending,
    setIsServerRequestPending,
    isServerRequestInError, 
    setIsServerRequestInError,
    backendResponseMessage,
    setBackendResponseMessage
  };
};
