import React, { useState } from "react";

const UndoButton: React.FC = () => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  const handleButtonClick = () => {
    setIsHighlighted(true);
    setTimeout(() => setIsHighlighted(false), 100); // Highlight for X milliseconds
  };

  const undoButtonBox: React.CSSProperties = {
    height: 50,
    width: 52,
    backgroundColor: "#9d9d9d",
  };

  const roundedUndoButton: React.CSSProperties = {
    backgroundColor: isHighlighted ? "#ffffff" : "#9d9d9d",
    borderRadius: 22,
    height: 44,
    width: 44,
    position: "relative",
    top: 3,
    left: 4,
  };

  const undoIcon: React.CSSProperties = {
    height: 25,
    width: 30,
    position: "relative",
    top: 9,
    left: 6,
  };

  return (
    <div style={undoButtonBox} onClick={handleButtonClick}>
      <div style={roundedUndoButton}>
        <img style={undoIcon} alt="Undo icon" src="./images/undo-icon.png" />
      </div>
    </div>
  );
};

export default UndoButton;
