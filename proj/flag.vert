attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D uSampler;
uniform float timeFactor;
uniform float speedFactor;

varying vec2 vTextureCoord;

void main() {

    vTextureCoord = aTextureCoord;
    vec3 offset = vec3(0.0,0.0,0.0);	

	offset = aVertexNormal * 0.2 * sin( speedFactor * 3.0 * mod(vTextureCoord.x + timeFactor * 0.2, 5.0)) ;
    
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}