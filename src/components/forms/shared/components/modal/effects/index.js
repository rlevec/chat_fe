import { useHandleOutsideClickAction } from "../../../../../../utils";

import { useHandleFetchFormDataAction } from "../../../../../../utils";


export const useHandleModalComponentEffects = (componentState, modalComponentState, modalContentRef, type) => {

  useHandleFetchFormDataAction(
    modalComponentState,
    `${type}`
  )

  useHandleOutsideClickAction(modalContentRef, () => componentState?.setIsModalOpen(null))

}