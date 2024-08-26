import { toCanvas } from "qrcode"; // 🚨 This is a reference to the qrcode _library_, not this component you're looking at!
import React from "react";

const QRCode = React.forwardRef(
  ({ data, options: customOptions = {} }, ref) => {
    const options = {
      width: 320,
      errorCorrectionLevel: "L",
      ...customOptions,
    };
    React.useEffect(() => {
      toCanvas(ref.current, data, options);
    }, [ref, data]);
    return (
      <canvas
        id="qr-code"
        ref={ref}
        role="img"
        aria-label="QR Code"
        aria-description={data}
      ></canvas>
    );
  },
);

export default QRCode;
