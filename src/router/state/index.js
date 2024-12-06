import { useState } from "react"

export const useHandleRouterComponentState = () => {
    const [location, setLocation] = useState(window.location.pathname)
    const [locationElements, setLocationElements] = useState([])
    const [isDesktop, setIsDesktop] = useState(true)
    const [user, setUser] = useState(null)

    return {
        location,
        setLocation,
        locationElements,
        setLocationElements,
        isDesktop,
        setIsDesktop,
        user, setUser
    }
}