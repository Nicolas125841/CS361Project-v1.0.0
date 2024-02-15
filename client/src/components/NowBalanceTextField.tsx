import React from "react";

interface EditableTextFieldProps {
  value: number;
  required?: boolean;
  onChange?: (newValue: number) => void;
}

const NowBalanceTextField: React.FC<EditableTextFieldProps> = ({
  value,
  required = false,
  onChange,
}) => {
  const nowBalance: React.CSSProperties = {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    width: 66,
    position: "relative",
    top: 1,
    left: 8,
    color: "#000000",
    fontFamily: "Inter-Bold, Helvetica",
    fontSize: 16,
    letterSpacing: "-0.5px",
    display: "flex",
    alignItems: "center",
  };

  const dollarSign: React.CSSProperties = {
    width: 12,
    position: "relative",
    top: 1,
    left: 10,
    color: "#000000",
    fontFamily: "Inter-Bold, Helvetica",
    fontSize: 16,
    letterSpacing: "-0.5px",
    display: "flex",
    alignItems: "center",
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(Number(event.target.value));
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={dollarSign}>$</div>
      <input
        style={nowBalance}
        type="number"
        value={value || ""}
        onChange={handleChange}
        required={required}
      />
      <div style={{ height: 5 }}></div>
    </div>
  );
};

export default NowBalanceTextField;
