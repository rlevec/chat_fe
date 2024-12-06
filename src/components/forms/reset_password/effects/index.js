import { useEffect } from "react";

import { handlePopulateInitialStateValuesAction, handlePasswordComparisonAction } from "../../shared/utils";

import { useHandleFetchFormDataAction } from "../../../../utils";

export const useHandleResetPasswordComponentEffects = (componentState, component) => {

  useHandleFetchFormDataAction(
    componentState, 
    component,
  )

  useEffect(() => {
    if(Boolean(componentState?.formData)) handlePopulateInitialStateValuesAction(componentState)
  }, [componentState?.formData]);

  useEffect(() => {
    handlePasswordComparisonAction(componentState?.query?.newPassword, componentState?.query?.confirmNewPassword, "confirmNewPassword", componentState?.setFieldError);
  }, [componentState?.query?.newPassword, componentState?.query?.confirmNewPassword]);
};
