import { useRef } from "react";


export const useHandleComponentRefs = () => {
    const socket = useRef(null);

    return {
        socket
    }
}