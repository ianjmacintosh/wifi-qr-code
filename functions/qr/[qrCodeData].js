import QRCode from "../../src/QRCode.jsx";
import { jsx as _jsx } from "react/jsx-runtime";
export function onRequest(context) {
  return new Response(
    /*#__PURE__*/ _jsx(QRCode, {
      data: context.params.qrCodeData,
    }),
  );
}
