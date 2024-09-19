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
    <div className="container mx-auto p-4 font-monocode text-lg grid grid-cols-12 space-y-6">
      <div className="lg:col-start-3 lg:col-end-11 col-span-12 gap-4 space-y-6">
        <h1 className="text-5xl font-classhuman font-bold">
          What's the Wifi Password?
        </h1>
        <p>Sick of telling people the wifi info?</p>
        <p>
          Enter your network details to get a QR code anyone can scan with their
          phone to get on the wifi
        </p>
        <p>
          Print it out (or take a screenshot) and show it to whoever wants to
          connect
        </p>
      </div>

      <form className="border border-gray-400 rounded-xl bg-white col-span-12 gap-4 grow space-y-6 p-6 space-y-6">
        <div>
          {/* https://www.hyperui.dev/components/application-ui/login-forms */}
          <label
            htmlFor="ssid"
            className="block col-span-12 text-base uppercase font-bold text-gray-700 mb-2"
          >
            Wi-Fi Name
          </label>
          <input
            type="text"
            id="ssid"
            ref={ssidRef}
            onChange={handleWifiChange}
            className="w-full rounded-md border border-gray-300 text-lg text-gray-700"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-base uppercase font-bold text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            type="text"
            id="password"
            ref={passwordRef}
            onChange={handleWifiChange}
            className="w-full rounded-md border border-gray-300 text-lg text-gray-700"
          />
        </div>
        <div>
          {/* I don't control this width with TailwindCSS -- it's just 320px wide */}
          <label className="block text-base uppercase font-bold text-gray-700 mb-2">
            QR Code
          </label>

          <div className="flex flex-col items-center justify-items-center space-y-6">
            <div className="border border-gray-300 rounded-md bg-white ">
              <QRCode
                data={wifiString}
                options={{ width: 300 }}
                ref={canvasRef}
              ></QRCode>
            </div>
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
              focus:ring
              focus:outline-none
              focus:ring-gray-300
              font-medium
              rounded-lg
              text-lg
              px-5
              py-2.5
              inline-flex
              items-center
              justify-center"
            >
              {/* https://remixicon.com/ */}
              <svg
                className="w-5 h-5 me-2"
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
      </form>
    </div>
  );
}

export default App;
