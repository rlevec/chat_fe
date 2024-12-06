import React from "react";

import styles from "./styles/emojis.module.css";

import {
  handleRenderEmojisArrayAction,
  handleRenderFilterIconsAction,
  handleInjectEmoticonAction,
  handleEmojiCategoryArrayRendererAction,
  handleEmojiSubcategoryArrayRendererAction,
  handleDecodeUnicodeValueAction,
} from "./utils";

export default function Emojis(props) {
  const { componentState, component } = props || {};

  const newComponent = `${component}_emojis`;

  return (
    <div key={newComponent} className={styles?.emojis_wrapper}>
      <div className={styles?.emojis_container}>
        {handleRenderEmojisArrayAction(componentState)
          ?.map((emoji) => {
            return (
              <div
                className={styles?.emojis_categories_container}
                key={`${handleEmojiCategoryArrayRendererAction(
                  emoji,
                  "emoji_category_id"
                )}-${handleEmojiCategoryArrayRendererAction(
                  emoji,
                  "emoji_category_frontend_slug"
                )}`}
              >
                <div
                  className={
                    styles?.emojis_category_title_filter_icons_container
                  }
                >
                  <div className={styles?.emojis_category_title}>
                    {handleEmojiCategoryArrayRendererAction(
                      emoji,
                      "emoji_category_title"
                    )}
                  </div>
                  <div className={styles?.emojis_filter_icons_container}>
                    {handleRenderFilterIconsAction(componentState)}
                  </div>
                </div>
                <div className={styles?.emojis_subcategories_container}>
                  {handleEmojiCategoryArrayRendererAction(
                    emoji,
                    "emoji_category_content"
                  )?.map((subcategory, idx) => {
                    return (
                      <div
                        className={styles?.emoji}
                        key={`${handleEmojiSubcategoryArrayRendererAction(
                          "emoji_subcategory_frontend_slug"
                        )}-${idx}`}
                        onClick={() =>
                          handleInjectEmoticonAction(
                            componentState,
                            subcategory
                          )
                        }
                      >
                        {handleDecodeUnicodeValueAction(subcategory)}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
          ?.filter((_, idx) => idx === componentState?.emojiFilter)}
      </div>
    </div>
  );
}
