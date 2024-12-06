import { navigate } from "../../../utils";

export const handleRenderFormDataAction = (
  componentState,
  target,
  subTarget,
  isHandler,
  refresh
) => {
  const { formData = {} } = componentState || {};

  const getRedirectRoute = () =>
    subTarget
      ? formData?.[target]?.[subTarget]?.redirect
      : formData?.[target]?.redirect;

  const handleRedirectOrReload = () => {
    const redirectRoute = getRedirectRoute();
    if (refresh) {
      window.location.reload();
    } else if (redirectRoute) {
      navigate(redirectRoute);
    } else {
      return null;
    }
  };

  if (isHandler) {
    return handleRedirectOrReload();
  }

  return subTarget
    ? formData?.[target]?.[subTarget] || null
    : formData?.[target] || null;
};


export const handleFormRenderConditionAction = (componentState) => {
  const { formData } = componentState || {};
  
  return Boolean(formData)
};