'use client';

import React from 'react';
import { EffectComposer, Noise, Vignette, ToneMapping } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';

export default function SketchPostProcessing() {
  return (
    <EffectComposer enableNormalPass={false} multisampling={4}>
      {/* Add subtle paper grain */}
      <Noise opacity={0.04} />
      
      {/* Subtle vignette for framing */}
      <Vignette eskil={false} offset={0.3} darkness={0.3} />
      
      {/* Nice filmic tone mapping */}
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
