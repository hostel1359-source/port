'use client';

import React from 'react';
import { EffectComposer, Noise, Vignette, ToneMapping } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';

export default function SketchPostProcessing() {
  return (
    <EffectComposer enableNormalPass={false} multisampling={4}>
      {/* Paper grain texture — itomdev sketch feel */}
      <Noise opacity={0.035} />
      
      {/* Subtle vignette for framing */}
      <Vignette eskil={false} offset={0.3} darkness={0.25} />
      
      {/* Warm filmic tone mapping */}
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
