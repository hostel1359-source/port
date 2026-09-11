'use client';

import React from 'react';
import { EffectComposer, Bloom, Noise, Vignette, ToneMapping } from '@react-three/postprocessing';
import { BlendFunction, ToneMappingMode } from 'postprocessing';

interface PostProcessingProps {
  enabled: boolean;
}

export default function PostProcessing({ enabled }: PostProcessingProps) {
  if (!enabled) return null;

  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom luminanceThreshold={1.0} mipmapBlur intensity={0.7} radius={0.8} />
      <Noise opacity={0.025} blendFunction={BlendFunction.OVERLAY} />
      <Vignette offset={0.15} darkness={0.85} />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
