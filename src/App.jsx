import { useRef, useEffect } from 'react'
import QRCode from 'qrcode'
import './App.css'

function App() {
  const canvasRef = useRef()
  const wifi = {
    ssid: 'Sesc Wifi',
    securityType: 'nopass',
    password: '',
    hidden: false,
  }

  // https://github.com/zxing/zxing/wiki/Barcode-Contents#wi-fi-network-config-android-ios-11
  const qrCodeString = `WIFI:S:Sesc Wifi;T:nopass;P:;H:false;;`

  
  const getWifiURI = ({ type, trdisable, ssid, hidden, id, password, publickey }) => {
    if (typeof ssid === "undefined") {
      throw new Error("The object you pass to `getWifiURI()` must include an `ssid` key")
    }
      /*
      The URI is defined by [7] and formatted by the WIFI-qr ABNF rule:
      WIFI-qr = “WIFI:” [type “;”] [trdisable “;”] ssid “;” [hidden “;”] [id “;”] [password “;”] [publickey “;”] “;”      
      */

     // Let's get it
     let string = 'WIFI:'
     
     // type = “T:” *(unreserved) ; security type
     string += type ? `T:${type};` : ''
     
     // trdisable = “R:” *(HEXDIG) ; Transition Disable value
     string += trdisable ? `R:${trdisable};` : ''
     
     // ssid = “S:” *(printable / pct-encoded) ; SSID of the network
     string += `S:${ssid}`
     
     // hidden = “H:true” ; when present, indicates a hidden (stealth) SSID is used
     string += hidden ? `H:true` : '' // Apparently the spec says this only can show the network is hidden, not that it can show the network is NOT hidden
     
     // id = “I:” *(printable / pct-encoded) ; UTF-8 encoded password identifier, present if the password
     // has an SAE password identifier
     string += id ? `I:${id};` : ''
     
     // password = “P:” *(printable / pct-encoded) ; password, present for password-based authentication
     string += password ? `P:${password};` : ''

     // public-key = “K:” *PKCHAR ; DER of ASN.1 SubjectPublicKeyInfo in compressed form and encoded in
     // “base64” as per [6], present when the network supports SAE-PK, else absent
     // printable = %x20-3a / %x3c-7e ; semi-colon excluded
     // PKCHAR = ALPHA / DIGIT / %x2b / %x2f / %x3d
     string += publickey ? `K:${publickey};` : ''
    string += ';'
    return string
  }

  useEffect(() => {
    QRCode.toCanvas(canvasRef.current, getWifiURI(wifi), function (error) {
      if (error) console.error(error)
    })
  }, [qrCodeString])


  return (
    <>
      <h1>QR Code</h1>
      <canvas id="qr-code" ref={canvasRef}></canvas>
    </>
  )
}

export default App
