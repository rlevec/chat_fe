import { handleRenderLazyLoadImageComponentAction } from "../../../../../utils";

import styles from "../styles/emojis.module.css"


export const handleRenderFormDataAction = (componentState, type) => {
    const {
      formData: {
        emojis: {
            content: emojisContent,
            title: emojisTitle,
            frontendSlug: emojisFrontendSlug
        }
      } = {},
    } = componentState || {};
  
    const formData = {
        emojis_content: emojisContent,
        emojis_title: emojisTitle,
        emojis_frontend_slug: emojisFrontendSlug
    };
  
    return formData?.[type];
  };
  
export const handleRenderEmojisArrayAction = (componentState) => {
      const emojisData = handleRenderFormDataAction(componentState, "emojis_content")

      return emojisData || []
}

export const handleRenderFilterIconsAction = (componentState) => {
  const {
    emojiFilter,
    setEmojiFilter
  } = componentState || {}
  

  const emojisArray = handleRenderFormDataAction(componentState, "emojis_content")

  const minIndex = 0
  const maxIndex = emojisArray?.length - 1

  const icons = [
    {
      id: 1,
      frontendSlug: "filterLeftIcon",
      character: "<",
      handler: () => {
        if(emojiFilter === minIndex) setEmojiFilter(maxIndex)
        else setEmojiFilter(emojiFilter - 1)
      }
    },
    {
      id: 2,
      frontendSlug: "rightRightIcon",
      character: ">",
      handler: () => {
        if(emojiFilter === maxIndex) setEmojiFilter(minIndex)
        else setEmojiFilter(emojiFilter + 1)
      }
    }
  ]


  return icons?.map((icon) => {
    const {
      id,
      frontendSlug,
      character,
      handler
    } = icon

    return (
      <div key={`${id}-${frontendSlug}`} className={styles?.emojis_filter_icon_container} onClick={() => handler()}>
         <div className={styles?.emojis_filter_icon}>{character}</div>
      </div>
    )
  })
}

export const handleInjectEmoticonAction = (componentState, subcategory) => {
   const {
     setMessage,
     message
   } = componentState || {}

   const {
    unicode
   } = subcategory || {}

   const newMessage = message + String.fromCodePoint(
    parseInt(unicode.replace("U+", ""), 16)
  )
   
   setMessage(newMessage)
}



export const handleEmojiCategoryArrayRendererAction = (emojiCategory, type) => {

  const {
    id: emojiCategoryId,
    frontendSlug: emojiCategoryFrontendSlug,
    content: emojiCategoryContent,
    title: emojiCategoryTitle,
  } = emojiCategory || {}

  const emojiCategoryFormData = {
    emoji_category_id: emojiCategoryId,
    emoji_category_frontend_slug: emojiCategoryFrontendSlug,
    emoji_category_content: emojiCategoryContent,
    emoji_category_title: emojiCategoryTitle
  }
  
  return emojiCategoryFormData?.[type] || null
}


export const handleEmojiSubcategoryArrayRendererAction = (emojiSubcategory, type) => {

  const {
    unicode: emojiSubcategoryUnicode, 
    frontendSlug: emojiSubcategoryFrontendSlug
  } = emojiSubcategory || {}

  const emojiSubcategoryFormData = {
    emoji_subcategory_unicode: emojiSubcategoryUnicode,
    emoji_subcategory_frontend_slug: emojiSubcategoryFrontendSlug
  }
  
  return emojiSubcategoryFormData?.[type] || null
}


export const handleDecodeUnicodeValueAction = (emojiSubcategory) => {
  const unicodeCharacter = handleEmojiSubcategoryArrayRendererAction(emojiSubcategory, "emoji_subcategory_unicode")

  const decodedUnicodeCharacter = String?.fromCodePoint(
    parseInt(unicodeCharacter?.replace("U+", ""), 16)
  )

  return decodedUnicodeCharacter || null
}