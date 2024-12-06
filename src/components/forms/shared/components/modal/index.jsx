import React, { lazy, useRef } from "react";

import styles from "./styles/modal.module.css";

import { useHandleModalComponentEffects } from "./effects";

import { useHandleModalComponentState } from "./state";

const LazyLoadImage = lazy(() => import("../../../../shared/lazy_load_image"));

export default function Modal(props) {
  const {
    component,
    parentComponentState,
    parentComponentState: { isModalOpen: type, setIsModalOpen },
  } = props || {};

  const modalComponentState = useHandleModalComponentState();

  const modalContentRef = useRef(null);

  useHandleModalComponentEffects(
    parentComponentState,
    modalComponentState,
    modalContentRef,
    type
  );

  return (
    <div ref={modalContentRef} className={styles?.modal_wrapper} key={component}>
       <div className={styles?.modal_container}>
        <div className={styles?.modal_header}>
          <div
            className={styles?.modal_header_close_icon_container}
            onClick={() => setIsModalOpen(null)}
          >
            <LazyLoadImage
              src={modalComponentState?.formData?.headerCloseIcon}
              alt={""}
              width={25}
              height={30}
              crossOrigin={"Anyonymus"}
            />
          </div>
          <div className={styles?.modal_header_title_description_container}>
            <div className={styles?.modal_header_title}>
              {modalComponentState?.formData?.headerTitle}
            </div>
            <div className={styles?.modal_header_description}>
              {modalComponentState?.formData?.headerDescription}
            </div>
          </div>
        </div>
        <div
          className={styles?.modal_content}
          dangerouslySetInnerHTML={{
            __html: modalComponentState?.formData?.content,
          }}
        />
        <div className={styles?.modal_button_container}>
          <button
            className={styles?.modal_button}
            onClick={() => setIsModalOpen(null)}
          >
            {modalComponentState?.formData?.buttonTitle}
          </button>
        </div>
      </div>
    </div>
  );
}
