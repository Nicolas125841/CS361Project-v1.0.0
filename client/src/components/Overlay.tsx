import React from "react";

interface IOverlay {
  setIsOverlayVisible: (isVisible: boolean) => void;
}

const Overlay: React.FC<IOverlay> = ({ setIsOverlayVisible }) => {
  const overlayStyles: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  };

  return (
    <div style={overlayStyles} onClick={() => setIsOverlayVisible(false)}></div>
  );
};

export default Overlay;
