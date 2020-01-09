export default class Sprites extends Phaser.GameObjects.Sprite{
	constructor(scene, x, y, type,teclas ,vida){
		super(scene, x, y, type);
		scene.add.existing(this);
        scene.physics.world.enable(this);
        scene.physics.add.existing(true);
		this.body.setCollideWorldBounds(false);
	}
}
