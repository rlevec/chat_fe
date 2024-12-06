import { useEffect } from "react";

import { useHandleFetchFormDataAction } from "../../../utils";

import { useHandleWebsocketEventsAction, useHandleSelectedContactValidityAction } from "../utils";


export const useHandleChatComponentEffects = (
  componentState,
  component,
  socket
) => {
  useHandleFetchFormDataAction(componentState, component)
  
  useHandleWebsocketEventsAction(componentState, socket);

  useHandleSelectedContactValidityAction(componentState)

};
