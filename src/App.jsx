import { useRef, useEffect, createRef, useState } from "react";
import QRCode from "./QRCode";
import { getWifiURI } from "./utils";

function App() {
  const ssidRef = createRef();
  const passwordRef = createRef();

  // https://github.com/zxing/zxing/wiki/Barcode-Contents#wi-fi-network-config-android-ios-11
  const [wifi, setWifi] = useState({
    ssid: "",
    type: "WPA",
    password: "",
    hidden: false,
  });
  const wifiString = getWifiURI(wifi);

  const canvasRef = useRef();

  const handleWifiChange = (event) => {
    setWifi({
      ...wifi,
      [event.target.id]: event.target.value,
    });
  };

  const downloadCanvas = (canvasEl, filename = "canvas.png") => {
    canvasEl.toBlob((blob) => {
      const anchor = document.createElement("a");
      anchor.download = filename;
      anchor.href = URL.createObjectURL(blob);

      anchor.click();

      URL.revokeObjectURL(anchor.href);
    });
  };

  return (
    <div className="container mx-auto flex flex-col lg:flex-row">
      {" "}
      {/* Outer wrapper to center content */}
      <div className="flex flex-col grow space-y-2 lg:pr-6">
        <form>
          <div className="w-full">
            {/* https://www.hyperui.dev/components/application-ui/login-forms */}
            <label
              htmlFor="ssid"
              className="block text-sm font-bold text-gray-700"
            >
              Wi-Fi Name
            </label>
            <input
              type="text"
              id="ssid"
              ref={ssidRef}
              onChange={handleWifiChange}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="password"
              className="block text-sm font-bold text-gray-700"
            >
              Password
            </label>
            <input
              type="text"
              id="password"
              ref={passwordRef}
              onChange={handleWifiChange}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
        </form>
      </div>
      <div className="space-y-2">
        {/* I don't control this width with TailwindCSS -- it's just 320px wide */}
        <div>
          <label className="block text-sm font-bold text-gray-700">
            QR Code
          </label>

          <div className="mt-1 border w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm">
            <QRCode
              data={wifiString}
              options={{ width: 320 }}
              ref={canvasRef}
            ></QRCode>
          </div>
        </div>
        <div className="space-y-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              downloadCanvas(
                canvasRef.current,
                `${wifi.ssid ? wifi.ssid : "wifi"}-qr-code.png`,
              );
            }}
            className="mt-2 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {/* https://remixicon.com/ */}
            <svg
              className="w-3.5 h-3.5 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M13 10H18L12 16L6 10H11V3H13V10ZM4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19Z"></path>
            </svg>
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
