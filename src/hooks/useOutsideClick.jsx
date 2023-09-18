import { useEffect } from "react";

const useOutsideClick = (ref, callback) => {
  const documentClickHandler = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback(event);
    }
  };

  useEffect(() => {
    document.addEventListener("click", documentClickHandler);

    return () => {
      document.removeEventListener("click", documentClickHandler);
    };
  });
};

export default useOutsideClick;
