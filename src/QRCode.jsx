import { toCanvas } from "qrcode"; // 🚨 This is a reference to the qrcode _library_, not this component you're looking at!
import React from "react";

const QRCode = ({ data, options: customOptions = {} }) => {
  const options = {
    width: 320,
    errorCorrectionLevel: "L",
    ...customOptions,
  };
  const canvasRef = React.useRef();
  React.useEffect(() => {
    toCanvas(canvasRef.current, data, options);
  }, [data]);
  return (
    <canvas
      id="qr-code"
      ref={canvasRef}
      role="img"
      aria-label="QR Code"
      aria-description={data}
    ></canvas>
  );
};

export default QRCode;
