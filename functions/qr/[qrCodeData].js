import { toCanvas } from "qrcode";
import QRCode from "../../src/QRCode.jsx";
import React, { createElement } from "react";
import ReactDOMServer from "react-dom/server";

export function onRequest(context) {
  return new Response(
    `
<html>
<body>
  <div id="root">
  <h1>${context.params.qrCodeData}</h1>
  <canvas id="qr-code" role="img" aria-label="QR Code" aria-description="${context.params.qrCodeData}"></canvas></div>
</body>
</html>
    `,
    {
      headers: {
        "Content-Type": "text/html",
      },
    },
  );
}
