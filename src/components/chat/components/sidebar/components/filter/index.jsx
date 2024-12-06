import React from "react";

import styles from "./styles/filter.module.css";

import {
  handleRenderFormDataAction,
  handleRenderComponentConditionAction,
  handleImageSourceAction,
  handleDropdownItemStateAction,
  handleFilterDropdownStateAction,
  handleDropdownItemClassNamesAction,
  handleRenderFilterValueAction,
  handleRenderDropdownMenuConditionAction,
  handleDropdownFilterContentAction,
  handleContactFilterItemArrayKeyAction,
} from "./utils";

import { handleRenderLazyLoadImageComponentAction } from "../../../../utils";

export default function Filter(props) {
  const { component, componentState } = props || {};

  const newComponent = `${component}_filter`;

  if (handleRenderComponentConditionAction(componentState)) {
    return (
      <div key={newComponent} className={styles?.filter_wrapper}>
        <div
          className={styles?.filter_value_wrapper}
          onClick={() => handleFilterDropdownStateAction(componentState)}
        >
          <div className={styles?.filter_value_icon_container}>
            <div className={styles?.filter_value}>{handleRenderFilterValueAction(componentState)}</div>
            <div>{handleRenderLazyLoadImageComponentAction(
            handleImageSourceAction(componentState, "dropdown_value", null),
            "",
            25,
            25
          )}</div>
          </div>
          {handleRenderLazyLoadImageComponentAction(
            handleImageSourceAction(componentState, "caret", null),
            "",
            15,
            30
          )}
        </div>
        {handleRenderDropdownMenuConditionAction(componentState) && (
          <div className={styles?.filter_dropdown_wrapper}>
            {handleRenderFormDataAction(componentState, "contact_filters")?.map(
              (contactFilter) => {
                return (
                  <div
                    onMouseLeave={() =>
                      handleDropdownItemStateAction(
                        componentState,
                        "blur",
                        contactFilter
                      )
                    }
                    onMouseEnter={() =>
                      handleDropdownItemStateAction(
                        componentState,
                        "hover",
                        contactFilter
                      )
                    }
                    className={handleDropdownItemClassNamesAction(
                      componentState,
                      contactFilter
                    )}
                    key={handleContactFilterItemArrayKeyAction(contactFilter)}
                    onClick={() =>
                      handleDropdownItemStateAction(
                        componentState,
                        "action",
                        contactFilter
                      )
                    }
                  >
                    <div className={styles?.filter_dropdown_item_title}>
                      {handleDropdownFilterContentAction(
                        contactFilter,
                        "contact_filter_title"
                      )}
                    </div>
                    <div>
                      {handleRenderLazyLoadImageComponentAction(
                        handleImageSourceAction(
                          componentState,
                          "hover_active",
                          contactFilter
                        ),
                        "",
                        25,
                        25
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
}
