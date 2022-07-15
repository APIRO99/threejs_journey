import React from 'react'
import Typography from '@mui/material/Typography';

import { createCubes } from 'threejs/coreScene';
import { useEffect } from 'react';

const BaseScene = () => {
  const titleStyle = {width: "100%", margin: "10px 0px 20px 0px"};
  useEffect(createCubes, []);
  return (
    <div>
      <Typography variant="h5" align="center" style={titleStyle}>Base Scene</Typography>
      <canvas className="webgl"></canvas>
    </div>
  )
}

export default BaseScene