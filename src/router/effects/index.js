import {useEffect} from "react"

export const useHandleRouterComponentEffects = (
    location,
    setLocation,
    setLocationElements,
    setIsDesktop
) => {

  useEffect(() => {

    const handleIsDesktopAction = () => {
        const width = window.innerWidth

        if(width <= 1024) setIsDesktop(false)
        else setIsDesktop(true)
    }

      const handlePopStateAction = () => {
          setLocation(window.location.pathname);
      };

      handleIsDesktopAction()

      window.addEventListener('popstate', handlePopStateAction);

      return () => {
          window.removeEventListener('popstate', handlePopStateAction);
      };
  }, []);



  useEffect(() => {
      const locationElements = location?.split("/")?.filter((el) => el !== "")

      setLocationElements(locationElements)
  }, [location]);
}