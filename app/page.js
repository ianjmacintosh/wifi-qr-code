import { QRCode } from 'qrcode'
import React from 'react'

export default function Home() {
  var canvas = React.useRef()

QRCode.toCanvas(canvas.current, 'sample text', function (error) {
  if (error) console.error(error)
  console.log('success!');
})
  return (<>
  <h1>Wifi QR Code</h1>
  <canvas id="canvas" ref={canvas}></canvas>
  </>)
}
