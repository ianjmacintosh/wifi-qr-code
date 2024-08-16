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

  const handleWifiChange = (event) => {
    setWifi({
      ...wifi,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <div className="container mx-auto flex flex-col place-content-center space-y-6">
      <div className="flex m-auto w-8/12 place-content-center">
        <QRCode data={wifiString}></QRCode>
      </div>
      <form>
        {/* WIFI-qr = “WIFI:” [type “;”] [trdisable “;”] ssid “;” [hidden “;”] [id “;”] [password “;”] [publickey “;”] “;”    */}
        <div className="space-y-3 m-auto w-9/12">
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
        </div>
      </form>
    </div>
  );
}

export default App;
