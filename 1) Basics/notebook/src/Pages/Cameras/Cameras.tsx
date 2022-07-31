import React, { useEffect, useRef, useState } from 'react'
import { IScene } from 'react-app-env'
import Scene from 'threejs/course/07-cameras';

const Cameras = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [scene, setScene] = useState<IScene>();

  useEffect(() => {
    if (canvas.current) setScene({ instance: new Scene(canvas.current)});
  }, [])
  
  return (
    <canvas ref={canvas} />
  )
}

export default Cameras