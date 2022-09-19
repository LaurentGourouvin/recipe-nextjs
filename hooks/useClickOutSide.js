import { useEffect, useRef } from "react";

export const useClickOutSide = (handlerCloseMenu) => {
  const ref = useRef();

  useEffect(() => {
    const clickOutSideMenu = (event) => {
      if (!ref.current.contains(event.target)) {
        handlerCloseMenu(false);
      }
    };

    document.addEventListener("mousedown", clickOutSideMenu);

    return () => {
      document.removeEventListener("mousedown", clickOutSideMenu);
    };
  });

  return ref;
};
