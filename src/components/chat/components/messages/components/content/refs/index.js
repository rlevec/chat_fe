import {useRef} from "react"

export const useHandleContentComponentRefs = () => {
    const bottomRef = useRef(null)
    const containerRef = useRef(null)

    return {
        bottomRef,
        containerRef
    }
}