import React, { useEffect, useRef } from 'react'
import Scene from 'threejs/course/05-TransformObjects';

const TransformObjects = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => { 
    if(canvas.current) new Scene(canvas.current)
  }, [])
  
  return (
    <canvas ref={canvas} />
  )
}

export default TransformObjects