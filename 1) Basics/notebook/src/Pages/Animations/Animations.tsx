import { useEffect, useRef, useState } from 'react'
import { IScene } from 'react-app-env';
import Scene from 'threejs/course/06-Animations';

const Animations = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [scene, setScene] = useState<IScene>();

  useEffect(() => {
    if(canvas.current) setScene({instance: new Scene(canvas.current)})
    console.log(canvas.current, scene);
    console.log(scene?.instance.camera)
    return setScene(undefined);
  }, [])
  
  return (
    <canvas ref={canvas} />
  )
}

export default Animations