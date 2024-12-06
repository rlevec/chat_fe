import { useState } from "react";

export const useHandleModalComponentState = () => {
  const [formData, setFormData] = useState(null);
  const [isServerRequestPending, setIsServerRequestPending] =
    useState(false);
    const [isServerRequestInError, setIsServerRequestInError] =
    useState(false);
  return {
    formData,
    setFormData,
    isServerRequestPending,
    setIsServerRequestPending,
    isServerRequestInError, 
    setIsServerRequestInError,
  };
};
