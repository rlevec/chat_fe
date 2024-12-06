import React, { useState } from "react";

import LazyLoadImage from "../../../../shared/lazy_load_image";

import styles from "./styles/file_input.module.css";

import {
  handleHandleAcceptedFormatsAction,
  handleFileOnChangeEventAction,
  handleDeletePreviewFileAction
} from "./utils";

export default function FileInput(props) {
  const {
    componentState,
    componentState: { formData: { formFields = [] } = {}, query, setQuery, setPreviewFile, previewFile},
    component = "",
  } = props || {};



  return (
    <div key={component}>
      <div>
        {formFields?.map?.((formField) => {
          const {
            id,
            frontendSlug,
            fieldIcon,
            type,
            name,
            accept,
            maxFileSize,
            deleteImageIcon
          } = formField;

          if (previewFile)
           {
            return (
              <div
              className={styles?.file_input_wrapper}
              key={`${id}-${frontendSlug}`}
            >
                 <div className={styles?.file_input_image_container}>
                   <img className={styles?.file_input_image} width={412} height={412} src={previewFile} alt=""/>
                   <div 
                   className={styles?.file_input_delete_preview_container}
                   onClick={() => handleDeletePreviewFileAction(frontendSlug, setQuery, setPreviewFile)}
                   >
                   <LazyLoadImage
                      src={deleteImageIcon}
                      alt={""}
                      width={20}
                      height={20}
                      crossOrigin={"Anyonymus"}
                    />
                   </div>
                 </div>
              </div>
            )
          } else {
            return (
              <div
                className={styles?.file_input_wrapper}
                key={`${id}-${frontendSlug}`}
              >
                <input
                  onChange={(event) =>
                    handleFileOnChangeEventAction(
                      event,
                      frontendSlug,
                      setQuery,
                      setPreviewFile
                    )
                  }
                  id={frontendSlug}
                  className={styles?.file_input}
                  type={type}
                  name={frontendSlug}
                  accept={accept}
                />
                <label
                  className={
                    styles?.profile_picture_modal_input_replacement_label
                  }
                  htmlFor={frontendSlug}
                >
                  <div className={styles?.file_input_replacement_label}>
                    <LazyLoadImage
                      src={fieldIcon}
                      alt={""}
                      width={50}
                      height={50}
                      crossOrigin={"Anyonymus"}
                    />
                    <div
                      className={
                        styles?.file_input_replacement_label_indicators
                      }
                    >
                      <div
                        className={
                          styles?.file_input_replacement_label_accepted_formats
                        }
                      >
                        {handleHandleAcceptedFormatsAction(accept)}
                      </div>
                      <div
                        className={
                          styles?.file_input_replacement_label_file_size_container
                        }
                      >
                        <div
                          className={
                            styles?.file_input_replacement_label_file_size_label
                          }
                        >
                          Max File Size:
                        </div>
                        <div
                          className={
                            styles?.file_input_replacement_label_file_size_value
                          }
                        >{`${Math.round(maxFileSize / 1024 / 1000)} MB`}</div>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
