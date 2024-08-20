import { toCanvas } from "qrcode"; // 🚨 This is a reference to the qrcode _library_, not this component you're looking at!
import React from "react";

const QRCode = ({ data }) => {
  const canvasRef = React.useRef();
  React.useEffect(() => {
    toCanvas(canvasRef.current, data, {
      width: 320,
      errorCorrectionLevel: "L",
    });
  }, [data]);
  return <canvas id="qr-code" ref={canvasRef} role="img" aria-label={`QR Code for "${data}" (without the wrapping quotes)`}></canvas>;
};

export default QRCode;
