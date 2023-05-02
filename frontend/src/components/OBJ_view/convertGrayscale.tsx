import * as THREE from 'three';

// om obj files die in lelijke kleuren zijn, weer te geven in black/white in browser voor de aesthetic xp 

function convertGrayscale(color: number): THREE.Color {
  const r = (color >> 16) & 0xff;
  const g = (color >> 8) & 0xff;
  const b = color & 0xff;
  const gray = 0.2989 * r + 0.587 * g + 0.114 * b;
  return new THREE.Color(`rgb(${gray},${gray},${gray})`);
}




export default convertGrayscale; 
