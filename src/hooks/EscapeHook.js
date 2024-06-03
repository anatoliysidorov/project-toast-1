import React from "react";

function useEscapeKey(callBackFn) {
  React.useEffect(() => {
    function handleEscape(event) {
      if (event?.code === "Escape") {
        callBackFn && callBackFn();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [callBackFn]);
}

export default useEscapeKey;
