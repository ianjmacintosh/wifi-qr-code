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
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {" "}
        {/* Outer wrapper to center content */}
        <form className="flex flex-col gap-4 grow">
          <div>
            {/* https://www.hyperui.dev/components/application-ui/login-forms */}
            <label
              htmlFor="ssid"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Wi-Fi Name
            </label>
            <input
              type="text"
              id="ssid"
              ref={ssidRef}
              onChange={handleWifiChange}
              className="w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="text"
              id="password"
              ref={passwordRef}
              onChange={handleWifiChange}
              className="w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
        </form>
        <div>
          {/* I don't control this width with TailwindCSS -- it's just 320px wide */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              QR Code
            </label>

            <div className="flex justify-center border rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm mb-2">
              <QRCode
                data={wifiString}
                options={{ width: 320 }}
                ref={canvasRef}
              ></QRCode>
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                downloadCanvas(
                  canvasRef.current,
                  `${wifi.ssid ? wifi.ssid : "wifi"}-qr-code.png`,
                );
              }}
              className="w-full
              text-white
              bg-blue-700
              hover:bg-blue-800
              focus:ring-4
              focus:outline-none
              focus:ring-blue-300
              font-medium
              rounded-lg
              text-sm
              px-5
              py-2.5
              inline-flex
              items-center
              justify-center
              dark:bg-blue-600
              dark:hover:bg-blue-700
              dark:focus:ring-blue-800"
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
              Save Image as PNG...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
