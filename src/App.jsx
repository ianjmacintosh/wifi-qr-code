import { useRef, useEffect } from 'react'
import QRCode from 'qrcode'
import './App.css'

function App() {
  const canvasRef = useRef()
  const qrCodeString = `https://whatsthewifipassword.com`

  useEffect(() => {
    QRCode.toCanvas(canvasRef.current, qrCodeString, function (error) {
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
