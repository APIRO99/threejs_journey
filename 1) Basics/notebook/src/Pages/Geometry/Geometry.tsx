import { useEffect, useRef, useState } from 'react';
import { IScene } from 'react-app-env';
import Scene from 'threejs/course/09-geometry';
import styles from './FullScreen.module.scss'

const Geometry = () => {
  const parent = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [scene, setScene] = useState<IScene>();

  useEffect(() => {
    if (canvas.current) setScene({ instance: new Scene(canvas.current)});
  }, [])
  
  return (
    <div ref={parent} className={styles.container}>
      <canvas ref={canvas} />
    </div>
  )
}

export default Geometry