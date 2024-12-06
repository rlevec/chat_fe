import React from "react";

import styles from "./styles/inputs.module.css";

import {
  handleInputFieldClassNamesAction,
  handleInputFieldIconAction,
  handleInputOnChangeEventAction,
  handleInputPasswordFieldTypeAction,
  handleInputPasswordFieldTypeIconAction,
  handleInputValueAction,
  handleIsInputInErrorConditionAction,
  handlePasswordTypeToggleAction,
  handleTermsInputFieldClassNamesAction,
  handleTermsLabelClassNamesAction,
} from "./utils";

import LazyLoadImage from "../../../../shared/lazy_load_image";

export default function Inputs(props) {
  const {
    component,
    componentState,
    componentState: {
      formData: { formFields },
    },
  } = props;

  return (
    <div className={styles?.inputs_wrapper} key={component}>
      <div className={styles?.inputs_container}>
        {formFields?.map((formField, idx) => {
          const {
            id,
            frontendSlug,
            name,
            placeholder,
            type,
            validation,
            validationMessage,
            fieldIcons,
            passwordTypeIcons,
            isPassword,
          } = formField;

          return (
            <div
              key={`${frontendSlug}-${id}-${idx + 1}`}
              className={styles?.inputs_input_fields_container}
            >
              <input
                className={handleInputFieldClassNamesAction(
                  frontendSlug,
                  componentState
                )}
                placeholder={placeholder}
                name={name}
                type={handleInputPasswordFieldTypeAction(
                  frontendSlug,
                  componentState,
                  type
                )}
                onChange={(event) =>
                  handleInputOnChangeEventAction(
                    event,
                    frontendSlug,
                    validation,
                    componentState
                  )
                }
                value={handleInputValueAction(componentState, frontendSlug)}
              />
              <div className={styles?.inputs_input_field_icon_container}>
                <LazyLoadImage
                  src={handleInputFieldIconAction(
                    frontendSlug,
                    fieldIcons,
                    componentState
                  )}
                  alt={""}
                  width={25}
                  height={25}
                  crossOrigin={"Anyonymus"}
                />
              </div>
              {handleIsInputInErrorConditionAction(
                frontendSlug,
                componentState
              ) && (
                <div className={styles?.inputs_input_field_validation_message}>
                  {validationMessage}
                </div>
              )}
              {isPassword && (
                <div
                  className={
                    styles?.inputs_input_field_password_type_icon_container
                  }
                  onClick={() =>
                    handlePasswordTypeToggleAction(frontendSlug, componentState)
                  }
                >
                  <LazyLoadImage
                    src={handleInputPasswordFieldTypeIconAction(
                      frontendSlug,
                      componentState,
                      passwordTypeIcons
                    )}
                    alt={""}
                    width={25}
                    height={25}
                    crossOrigin={"Anyonymus"}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {componentState?.formData?.renderConditions?.terms && (
        <div className={styles?.inputs_form_terms_field_container}>
          <div className={styles?.inputs_terms_field_labels_container}>
            {componentState?.formData?.termsInput?.labels?.map(
              (termsInputLabel, idx) => {
                const { frontendSlug, id, isLink, label, route } =
                  termsInputLabel;

                return (
                  <div
                    className={handleTermsLabelClassNamesAction(isLink)}
                    key={`${frontendSlug}-${id}-${idx + 1}`}
                    onClick={() =>
                      isLink ? componentState?.setIsModalOpen(route) : null
                    }
                  >
                    {label}
                  </div>
                );
              }
            )}
          </div>
          <div>
            <input
              className={handleTermsInputFieldClassNamesAction(
                componentState?.formData?.termsInput?.frontendSlug,
                componentState
              )}
              name={componentState?.formData?.termsInput?.name}
              type={componentState?.formData?.termsInput?.type}
              onChange={(event) =>
                handleInputOnChangeEventAction(
                  event,
                  componentState?.formData?.termsInput?.frontendSlug,
                  componentState?.formData?.termsInput?.validation,
                  componentState
                )
              }
              value={!!(componentState?.query?.terms)}
            />
          </div>
          {handleIsInputInErrorConditionAction(
            componentState?.formData?.termsInput?.frontendSlug,
            componentState
          ) && (
            <div className={styles?.inputs_input_field_validation_message}>
              {componentState?.formData?.termsInput?.validationMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
