import { useEffect } from "react";

import { useHandleFetchFormDataAction } from "../../../utils";

export const useHandleErrorComponentEffects = (componentState, component) => {

  useHandleFetchFormDataAction(
    componentState, 
    component,
  )
};
