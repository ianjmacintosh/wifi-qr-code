import { useRef, useEffect, createRef, useState } from "react";
import QRCode from "./QRCode";
import { getWifiURI } from "./utils";
import "./output.css";

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
    <div className="container mx-auto flex flex-col space-y-6 w-9/12">
      <form className="space-y-3">
        {/* WIFI-qr = “WIFI:” [type “;”] [trdisable “;”] ssid “;” [hidden “;”] [id “;”] [password “;”] [publickey “;”] “;”    */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="ssid" className="text-lg font-bold">
            Wi-Fi Name
          </label>
          <input
            type="text"
            id="ssid"
            ref={ssidRef}
            onChange={handleWifiChange}
            className="border-2 text-xl p-3 lg:text-5xl lg:p-6"
          ></input>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="text-lg font-bold">
            Password
          </label>
          <input
            type="text"
            id="password"
            ref={passwordRef}
            onChange={handleWifiChange}
            className="border-2 text-xl p-3 lg:text-5xl lg:p-6"
          ></input>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-bold">QR Code</label>
          <div className="w-12/12">
            <QRCode
              data={wifiString}
              options={{ width: 720 }}
              ref={canvasRef}
            ></QRCode>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <button
            className="border-2 w-1/12 bg-white"
            onClick={(e) => {
              e.preventDefault();
              downloadCanvas(
                canvasRef.current,
                `${wifi.ssid ? wifi.ssid : "wifi"}-qr-code.png`,
              );
            }}
          >
            Download
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M13 10H18L12 16L6 10H11V3H13V10ZM4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19Z"></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
