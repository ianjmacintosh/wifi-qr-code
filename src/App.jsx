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
    <>
      <QRCode data={wifiString}></QRCode>

      <form>
        {/* WIFI-qr = “WIFI:” [type “;”] [trdisable “;”] ssid “;” [hidden “;”] [id “;”] [password “;”] [publickey “;”] “;”    */}
        <div>
          <label htmlFor="ssid">
            Wifi Name
            <input
              type="text"
              id="ssid"
              ref={ssidRef}
              onChange={handleWifiChange}
            ></input>
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password
            <input
              type="text"
              id="password"
              ref={passwordRef}
              onChange={handleWifiChange}
            ></input>
          </label>
        </div>
      </form>
    </>
  );
}

export default App;
