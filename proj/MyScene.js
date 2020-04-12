/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //------ Cylinder Material
        this.cylinderMaterial = new CGFappearance(this);
        this.cylinderMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.cylinderMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.cylinderMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.cylinderMaterial.setShininess(10.0);
        this.cylinderMaterial.loadTexture('images/texture_wide.png');
        this.cylinderMaterial.setTextureWrap('REPEAT', 'REPEAT');
        //------

        //------ World Material
        this.earthMaterial = new CGFappearance(this);
        this.earthMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.earthMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.earthMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.earthMaterial.setShininess(10.0);
        this.earthMaterial.loadTexture('images/earth.jpg');
        this.earthMaterial.setTextureWrap('REPEAT', 'REPEAT');
        //------

        //------ Scene Materials
        this.initializeSceneMaterials();
        //------

        // Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.cylinder = new MyCylinder(this,30,10);
        this.cubeMap = new MyUnitCubeQuad(this);
        this.objects = [this.cylinder,this.incompleteSphere];

        // Labels and ID's for object selection on MyInterface
        this.objectIDs = { 'Cylinder': 0 , 'Sphere': 1};

        // Labels and ID's for scene selection on MyInterface
        this.sceneIDs = { 'Scene1': 0 , 'Scene2': 1, 'Scene3': 2};

        // Objects connected to MyInterface
        this.selectedObject = 1;
        this.selectedScene = 2;
        this.displayAxis = true;
        this.displayNormals = false;
        
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(25, 0, 25), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        //To be done...
    }

    initializeSceneMaterials(){

        // Scene 1
        // Top material
        this.quadTopMaterial = new CGFappearance(this);
        this.quadTopMaterial.setAmbient(1.0, 1.0, 1.0, 1);
        this.quadTopMaterial.setDiffuse(0.0, 0.0, 0.0, 1);
        this.quadTopMaterial.setSpecular(0.0, 0.0, 0.0, 1);
        this.quadTopMaterial.setShininess(10.0);
        this.quadTopMaterial.loadTexture('images/split_cubemap/top.png');
        this.quadTopMaterial.setTextureWrap('REPEAT', 'REPEAT');

        // Bottom material
        this.quadBottomMaterial = new CGFappearance(this);
        this.quadBottomMaterial.setAmbient(1.0, 1.0, 1.0, 1);
        this.quadBottomMaterial.setDiffuse(0.0, 0.0, 0.0, 1);
        this.quadBottomMaterial.setSpecular(0.0, 0.0, 0.0, 1);
        this.quadBottomMaterial.setShininess(10.0);
        this.quadBottomMaterial.loadTexture('images/split_cubemap/bottom.png');
        this.quadBottomMaterial.setTextureWrap('REPEAT', 'REPEAT');

        // Left material
        this.quadLeftMaterial = new CGFappearance(this);
        this.quadLeftMaterial.setAmbient(1.0, 1.0, 1.0, 1);
        this.quadLeftMaterial.setDiffuse(0.0, 0.0, 0.0, 1);
        this.quadLeftMaterial.setSpecular(0.0, 0.0, 0.0, 1);
        this.quadLeftMaterial.setShininess(10.0);
        this.quadLeftMaterial.loadTexture('images/split_cubemap/left.png');
        this.quadLeftMaterial.setTextureWrap('REPEAT', 'REPEAT');
        
        // Right material
        this.quadRightMaterial = new CGFappearance(this);
        this.quadRightMaterial.setAmbient(1.0, 1.0, 1.0, 1);
        this.quadRightMaterial.setDiffuse(0.0, 0.0, 0.0, 1);
        this.quadRightMaterial.setSpecular(0.0, 0.0, 0.0, 1);
        this.quadRightMaterial.setShininess(10.0);
        this.quadRightMaterial.loadTexture('images/split_cubemap/right.png');
        this.quadRightMaterial.setTextureWrap('REPEAT', 'REPEAT');
        
        // Back material
        this.quadBackMaterial = new CGFappearance(this);
        this.quadBackMaterial.setAmbient(1.0, 1.0, 1.0, 1);
        this.quadBackMaterial.setDiffuse(0.0, 0.0, 0.0, 1);
        this.quadBackMaterial.setSpecular(0.0, 0.0, 0.0, 1);
        this.quadBackMaterial.setShininess(10.0);
        this.quadBackMaterial.loadTexture('images/split_cubemap/back.png');
        this.quadBackMaterial.setTextureWrap('REPEAT', 'REPEAT');
        
        // Front material
        this.quadFrontMaterial = new CGFappearance(this);
        this.quadFrontMaterial.setAmbient(1.0, 1.0, 1.0, 1);
        this.quadFrontMaterial.setDiffuse(0.0, 0.0, 0.0, 1);
        this.quadFrontMaterial.setSpecular(0.0, 0.0, 0.0, 1);
        this.quadFrontMaterial.setShininess(10.0);
        this.quadFrontMaterial.loadTexture('images/split_cubemap/front.png');
        this.quadFrontMaterial.setTextureWrap('REPEAT', 'REPEAT');

        // Scene 2
        // Top material
        this.quadTopMaterial2 = new CGFappearance(this);
        this.quadTopMaterial2.setAmbient(1.0, 1.0, 1.0, 1);
        this.quadTopMaterial2.setDiffuse(0.0, 0.0, 0.0, 1);
        this.quadTopMaterial2.setSpecular(0.0, 0.0, 0.0, 1);
        this.quadTopMaterial2.setShininess(10.0);
        this.quadTopMaterial2.loadTexture('images/split_cubemap2/top.png');
        this.quadTopMaterial2.setTextureWrap('REPEAT', 'REPEAT');

        // Bottom material
        this.quadBottomMaterial2 = new CGFappearance(this);
        this.quadBottomMaterial2.setAmbient(1.0, 1.0, 1.0, 1);
        this.quadBottomMaterial2.setDiffuse(0.0, 0.0, 0.0, 1);
        this.quadBottomMaterial2.setSpecular(0.0, 0.0, 0.0, 1);
        this.quadBottomMaterial2.setShininess(10.0);
        this.quadBottomMaterial2.loadTexture('images/split_cubemap2/bottom.png');
        this.quadBottomMaterial2.setTextureWrap('REPEAT', 'REPEAT');

        // Left material
        this.quadLeftMaterial2 = new CGFappearance(this);
        this.quadLeftMaterial2.setAmbient(1.0, 1.0, 1.0, 1);
        this.quadLeftMaterial2.setDiffuse(0.0, 0.0, 0.0, 1);
        this.quadLeftMaterial2.setSpecular(0.0, 0.0, 0.0, 1);
        this.quadLeftMaterial2.setShininess(10.0);
        this.quadLeftMaterial2.loadTexture('images/split_cubemap2/left.png');
        this.quadLeftMaterial2.setTextureWrap('REPEAT', 'REPEAT');
        
        // Right material
        this.quadRightMaterial2 = new CGFappearance(this);
        this.quadRightMaterial2.setAmbient(1.0, 1.0, 1.0, 1);
        this.quadRightMaterial2.setDiffuse(0.0, 0.0, 0.0, 1);
        this.quadRightMaterial2.setSpecular(0.0, 0.0, 0.0, 1);
        this.quadRightMaterial2.setShininess(10.0);
        this.quadRightMaterial2.loadTexture('images/split_cubemap2/right.png');
        this.quadRightMaterial2.setTextureWrap('REPEAT', 'REPEAT');
        
        // Back material
        this.quadBackMaterial2 = new CGFappearance(this);
        this.quadBackMaterial2.setAmbient(1.0, 1.0, 1.0, 1);
        this.quadBackMaterial2.setDiffuse(0.0, 0.0, 0.0, 1);
        this.quadBackMaterial2.setSpecular(0.0, 0.0, 0.0, 1);
        this.quadBackMaterial2.setShininess(10.0);
        this.quadBackMaterial2.loadTexture('images/split_cubemap2/back.png');
        this.quadBackMaterial2.setTextureWrap('REPEAT', 'REPEAT');
        
        // Front material
        this.quadFrontMaterial2 = new CGFappearance(this);
        this.quadFrontMaterial2.setAmbient(1.0, 1.0, 1.0, 1);
        this.quadFrontMaterial2.setDiffuse(0.0, 0.0, 0.0, 1);
        this.quadFrontMaterial2.setSpecular(0.0, 0.0, 0.0, 1);
        this.quadFrontMaterial2.setShininess(10.0);
        this.quadFrontMaterial2.loadTexture('images/split_cubemap2/front.png');
        this.quadFrontMaterial2.setTextureWrap('REPEAT', 'REPEAT');

         // Scene 3
        // Top material
        this.quadTopMaterial3 = new CGFappearance(this);
        this.quadTopMaterial3.setAmbient(1.0, 1.0, 1.0, 1);
        this.quadTopMaterial3.setDiffuse(0.0, 0.0, 0.0, 1);
        this.quadTopMaterial3.setSpecular(0.0, 0.0, 0.0, 1);
        this.quadTopMaterial3.setShininess(10.0);
        this.quadTopMaterial3.loadTexture('images/split_cubemap3/top.png');
        this.quadTopMaterial3.setTextureWrap('REPEAT', 'REPEAT');

        // Bottom material
        this.quadBottomMaterial3 = new CGFappearance(this);
        this.quadBottomMaterial3.setAmbient(1.0, 1.0, 1.0, 1);
        this.quadBottomMaterial3.setDiffuse(0.0, 0.0, 0.0, 1);
        this.quadBottomMaterial3.setSpecular(0.0, 0.0, 0.0, 1);
        this.quadBottomMaterial3.setShininess(10.0);
        this.quadBottomMaterial3.loadTexture('images/split_cubemap3/bottom.png');
        this.quadBottomMaterial3.setTextureWrap('REPEAT', 'REPEAT');

        // Left material
        this.quadLeftMaterial3 = new CGFappearance(this);
        this.quadLeftMaterial3.setAmbient(1.0, 1.0, 1.0, 1);
        this.quadLeftMaterial3.setDiffuse(0.0, 0.0, 0.0, 1);
        this.quadLeftMaterial3.setSpecular(0.0, 0.0, 0.0, 1);
        this.quadLeftMaterial3.setShininess(10.0);
        this.quadLeftMaterial3.loadTexture('images/split_cubemap3/left.png');
        this.quadLeftMaterial3.setTextureWrap('REPEAT', 'REPEAT');
        
        // Right material
        this.quadRightMaterial3 = new CGFappearance(this);
        this.quadRightMaterial3.setAmbient(1.0, 1.0, 1.0, 1);
        this.quadRightMaterial3.setDiffuse(0.0, 0.0, 0.0, 1);
        this.quadRightMaterial3.setSpecular(0.0, 0.0, 0.0, 1);
        this.quadRightMaterial3.setShininess(10.0);
        this.quadRightMaterial3.loadTexture('images/split_cubemap3/right.png');
        this.quadRightMaterial3.setTextureWrap('REPEAT', 'REPEAT');
        
        // Back material
        this.quadBackMaterial3 = new CGFappearance(this);
        this.quadBackMaterial3.setAmbient(1.0, 1.0, 1.0, 1);
        this.quadBackMaterial3.setDiffuse(0.0, 0.0, 0.0, 1);
        this.quadBackMaterial3.setSpecular(0.0, 0.0, 0.0, 1);
        this.quadBackMaterial3.setShininess(10.0);
        this.quadBackMaterial3.loadTexture('images/split_cubemap3/back.png');
        this.quadBackMaterial3.setTextureWrap('REPEAT', 'REPEAT');
        
        // Front material
        this.quadFrontMaterial3 = new CGFappearance(this);
        this.quadFrontMaterial3.setAmbient(1.0, 1.0, 1.0, 1);
        this.quadFrontMaterial3.setDiffuse(0.0, 0.0, 0.0, 1);
        this.quadFrontMaterial3.setSpecular(0.0, 0.0, 0.0, 1);
        this.quadFrontMaterial3.setShininess(10.0);
        this.quadFrontMaterial3.loadTexture('images/split_cubemap3/front.png');
        this.quadFrontMaterial3.setTextureWrap('REPEAT', 'REPEAT');
    }

    displayScene1(){
        this.pushMatrix();

        this.scale(50,50,50);
        
        //front
        this.pushMatrix();
        this.translate(0.0, 0.0, 0.5); 
        this.quadFrontMaterial.apply();
        this.cubeMap.quad.display();
        this.popMatrix();

        //back
        this.pushMatrix();
        this.translate(0.0, 0.0, -0.5); 
        this.rotate(-Math.PI,0.0, 1.0,0.0);
        this.quadBackMaterial.apply();
        this.cubeMap.quad.display();
        this.popMatrix();

        //left
        this.pushMatrix();
        this.translate(-0.5, 0.0, 0.0); 
        this.rotate(-Math.PI/2,0.0, 1.0,0.0);
        this.quadLeftMaterial.apply();
        this.cubeMap.quad.display();
        this.popMatrix();

        //right
        this.pushMatrix();
        this.translate(0.5, 0.0, 0.0); 
        this.rotate(Math.PI/2,0.0, 1.0,0.0);
        this.quadRightMaterial.apply();
        this.cubeMap.quad.display();
        this.popMatrix();

        //bottom
        this.pushMatrix();
        this.translate(0.0, -0.5, 0.0); 
        this.rotate(Math.PI/2,1.0, 0.0,0.0);
        this.quadBottomMaterial.apply();
        this.cubeMap.quad.display();
        this.popMatrix();

        //top
        this.pushMatrix();
        this.translate(0.0, 0.5, 0.0); 
        this.rotate(-Math.PI/2,1.0, 0.0,0.0);
        this.quadTopMaterial.apply();
        this.cubeMap.quad.display();
        this.popMatrix();

        this.popMatrix();
    }

    displayScene2(){
        this.pushMatrix();

        this.scale(50,50,50);
        
        //front
        this.pushMatrix();
        this.translate(0.0, 0.0, 0.5); 
        this.quadFrontMaterial2.apply();
        this.cubeMap.quad.display();
        this.popMatrix();

        //back
        this.pushMatrix();
        this.translate(0.0, 0.0, -0.5); 
        this.rotate(-Math.PI,0.0, 1.0,0.0);
        this.quadBackMaterial2.apply();
        this.cubeMap.quad.display();
        this.popMatrix();

        //left
        this.pushMatrix();
        this.translate(-0.5, 0.0, 0.0); 
        this.rotate(-Math.PI/2,0.0, 1.0,0.0);
        this.quadLeftMaterial2.apply();
        this.cubeMap.quad.display();
        this.popMatrix();

        //right
        this.pushMatrix();
        this.translate(0.5, 0.0, 0.0); 
        this.rotate(Math.PI/2,0.0, 1.0,0.0);
        this.quadRightMaterial2.apply();
        this.cubeMap.quad.display();
        this.popMatrix();

        //bottom
        this.pushMatrix();
        this.translate(0.0, -0.5, 0.0); 
        this.rotate(Math.PI/2,1.0, 0.0,0.0);
        this.quadBottomMaterial2.apply();
        this.cubeMap.quad.display();
        this.popMatrix();

        //top
        this.pushMatrix();
        this.translate(0.0, 0.5, 0.0); 
        this.rotate(-Math.PI/2,1.0, 0.0,0.0);
        this.quadTopMaterial2.apply();
        this.cubeMap.quad.display();
        this.popMatrix();

        this.popMatrix();
    }

    displayScene3(){
        this.pushMatrix();

        this.scale(50,50,50);
        
        //front
        this.pushMatrix();
        this.translate(0.0, 0.0, 0.5); 
        this.quadFrontMaterial3.apply();
        this.cubeMap.quad.display();
        this.popMatrix();

        //back
        this.pushMatrix();
        this.translate(0.0, 0.0, -0.5); 
        this.rotate(-Math.PI,0.0, 1.0,0.0);
        this.quadBackMaterial3.apply();
        this.cubeMap.quad.display();
        this.popMatrix();

        //left
        this.pushMatrix();
        this.translate(-0.5, 0.0, 0.0); 
        this.rotate(-Math.PI/2,0.0, 1.0,0.0);
        this.quadLeftMaterial3.apply();
        this.cubeMap.quad.display();
        this.popMatrix();

        //right
        this.pushMatrix();
        this.translate(0.5, 0.0, 0.0); 
        this.rotate(Math.PI/2,0.0, 1.0,0.0);
        this.quadRightMaterial3.apply();
        this.cubeMap.quad.display();
        this.popMatrix();

        //bottom
        this.pushMatrix();
        this.translate(0.0, -0.5, 0.0); 
        this.rotate(Math.PI/2,1.0, 0.0,0.0);
        this.quadBottomMaterial3.apply();
        this.cubeMap.quad.display();
        this.popMatrix();

        //top
        this.pushMatrix();
        this.translate(0.0, 0.5, 0.0); 
        this.rotate(-Math.PI/2,1.0, 0.0,0.0);
        this.quadTopMaterial3.apply();
        this.cubeMap.quad.display();
        this.popMatrix();

        this.popMatrix();
    }

    displayScene(){
        if(this.selectedScene == 0)
            this.displayScene1();
        else if(this.selectedScene == 1)
            this.displayScene2();
        else
            this.displayScene3();
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section

        this.pushMatrix();

        if (this.displayNormals)
            this.objects[this.selectedObject].enableNormalViz();
        else
            this.objects[this.selectedObject].disableNormalViz();

        if(this.selectedObject == 0)
            this.cylinderMaterial.apply();
        else if(this.selectedObject == 1)
            this.earthMaterial.apply();
        
        this.objects[this.selectedObject].display();
        this.popMatrix();

        this.pushMatrix();
        this.displayScene();
        this.popMatrix();
        // ---- END Primitive drawing section
    }
}