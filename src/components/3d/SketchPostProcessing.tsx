'use client';

import React from 'react';
import { EffectComposer, Bloom, Vignette, ToneMapping } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';

export default function SketchPostProcessing() {
  return (
    <EffectComposer enableNormalPass={false} multisampling={4}>
      {/* Cyberpunk neon bloom — makes emissive materials glow */}
      <Bloom
        luminanceThreshold={0.5}
        luminanceSmoothing={0.3}
        intensity={1.0}
        mipmapBlur
      />

      {/* Dark vignette for cinematic cyberpunk feel */}
      <Vignette eskil={false} offset={0.2} darkness={0.65} />

      {/* Filmic tone mapping */}
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
