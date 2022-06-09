import { useEffect, useState } from 'react'
import { createCubes, updateCubes } from '../../threejs/tests/07-camera';

import './SquareAdmin.css';


function SquareAdmin() {

  let [state, setState] = useState({
    cubes: [
      { color: 'purple', x: -4, y: 0, z: -3 },
      { color: 'blue'  , x: -2, y: 0, z: -3 },
      { color: 'red'   , x:  0, y: 0, z: -3 },
      { color: 'green' , x:  2, y: 0, z: -3 },
      { color: 'orange', x:  4, y: 0, z: -3 },
    ]
  });
  useEffect(() => createCubes(state.cubes), [])

  let handleAdd = () => {
    setState({
      cubes: [
        ...state.cubes,
        { color: 'red', x: 0, y: 0, z: 0 },
      ]
    });
  }

  let handleUpdate = (name, value, idx) => {
    let newState = {
      ...state,
      cubes: state.cubes.map((cube, i) => {
        if (idx === i) {
          return { ...cube, [name]: value }
        }
        return cube;
      }
      )
    }
    setState(newState)
    createCubes(newState.cubes)
  }

  let handleRemove = (idx) => {
    let newState = {
      ...state,
      cubes: state.cubes.filter((_, i) => i !== idx)
    }
    setState(newState)
    createCubes(newState.cubes)
  }

  return (
    <div className="SquareAdmin">
      <p>{"Learning Three.js with React ❤️"}</p>
      <canvas className="webgl"></canvas>

      {/* <form onSubmit={handleSubmint} className="form"> */}
      <form  className="form">
        <div className='cubesData'>
          { state.cubes.map(({ color, x, y, z }, idx) => (
            <Cube 
              key={idx} color={color} x={x} y={y} z={z} 
              updateCube={(name, value) => handleUpdate(name, value, idx)}
              removeCube={() => handleRemove(idx)}
            />
          ))}
        </div>
        {/* <input  type="submit"  value="Submit" /> */}
      </form>
      <button onClick={handleAdd}>add Cube</button>

    </div>
  );
}


function Cube({ color, x, y, z, updateCube, removeCube}) {
  let input = (name, type, value) => (
    <label className='label'>
      <p>{name}</p>
      <input className={`input${type}`} type={type} name={name} value={value} onChange={(e) => {
        updateCube(e.target.name, e.target.value);
      }} />
    </label>
  );

  return (
    <div className='cubeInput'>
    <button onClick={removeCube} type="button" className='closeButton'> X </button>
    { input( 'color', 'string', color ) }
    { input( 'x', 'number', x ) }
    { input( 'y', 'number', y ) }
    { input( 'z', 'number', z ) }
    </div>
  );
}


export default SquareAdmin;
