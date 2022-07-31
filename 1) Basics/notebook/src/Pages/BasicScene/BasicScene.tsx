import { useEffect, useRef } from 'react'
import Scene from 'threejs/course/03-BasicScene'

const BasicScene = () => {
  const canvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if(canvas.current !== null) new Scene(canvas.current);
  }, [])
  
  return (
    <canvas ref={canvas} />
  )
}

export default BasicScene