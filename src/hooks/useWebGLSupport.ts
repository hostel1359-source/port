'use client';

import { useState, useEffect } from 'react';

export function useWebGLSupport(): { supported: boolean; tier: 'high' | 'medium' | 'low' | 'none' } {
  const [result, setResult] = useState<{ supported: boolean; tier: 'high' | 'medium' | 'low' | 'none' }>({
    supported: true,
    tier: 'high',
  });

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      
      if (!gl) {
        setResult({ supported: false, tier: 'none' });
        return;
      }

      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      const renderer = debugInfo
        ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase()
        : '';

      const isLowEnd =
        renderer.includes('swiftshader') ||
        renderer.includes('llvmpipe') ||
        renderer.includes('mesa');

      const isMidRange =
        renderer.includes('intel') ||
        renderer.includes('adreno 5') ||
        renderer.includes('mali-g');

      if (isLowEnd) {
        setResult({ supported: true, tier: 'low' });
      } else if (isMidRange) {
        setResult({ supported: true, tier: 'medium' });
      } else {
        setResult({ supported: true, tier: 'high' });
      }

      canvas.remove();
    } catch {
      setResult({ supported: false, tier: 'none' });
    }
  }, []);

  return result;
}
