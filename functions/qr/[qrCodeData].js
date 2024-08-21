import { toCanvas } from "qrcode";
import QRCode from "../../src/QRCode.jsx";
import React, { createElement } from "react";
import ReactDOMServer from "react-dom/server";

export function onRequest(context) {
  const qrCodeEl = `<canvas id="qr-code" role="img" aria-label="QR Code" aria-description="${context.params.qrCodeData}"></canvas>`;
  return new Response(
    `
<html>
<body>
  <div id="root">${qrCodeEl}</div>
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
