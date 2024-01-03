//-------------------------------------------------
// Title: main.js
// Author: Halil Mert Guler
// ID: 16729097450
// Project: 9
// Description: vertex shader file
//-------------------------------------------------

const vertexShader = `
    precision highp float;
    precision highp int;
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
`
export default vertexShader