import { useEffect, RefObject } from "react";

interface Props {
    handleClick: () => void,
}

const useOutsideHandler = (handleClick: () => void, ref: RefObject<any>) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClick();
        // alert('dupa')
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

export default useOutsideHandler;