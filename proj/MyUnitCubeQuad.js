/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {
   constructor(scene) {
      super(scene);
      
      this.quad = new MyQuad(this.scene);
      
   }
   
}