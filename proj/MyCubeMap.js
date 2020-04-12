/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
   constructor(scene) {
      super(scene);
      
      this.quad = new MyQuad(this.scene);
      
   }
   
}