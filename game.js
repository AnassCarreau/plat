var scoreText;
var score=0;

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });

  }
  
  preload() { 
    this.load.spritesheet('player', 'dude.png', { frameWidth: 32, frameHeight: 48 });    
    this.load.image('ground',"muro.png") ;
    this.load.image('points',"points.png") ;



  }

  create() {
    var platforms;
    var stars;
    this.data.set('score',0);
     platforms = this.physics.add.staticGroup();
    
     platforms.create(700, 700, 'ground').setScale(3.5).refreshBody();

     stars = this.physics.add.group();
     stars.create(800, 500, 'points');
     stars.create(50, 250, 'points');
     stars.create(750, 220, 'points');
     this.player = this.physics.add.sprite(100, 450, 'player');
     this.player.setBounce(0.2);
     this.player.setCollideWorldBounds(true);
     this.physics.add.collider(this.player, platforms); 
     this.physics.add.collider(stars, platforms);

     this.physics.add.overlap(this.player, stars,this.collectStar, null, this);

     this.cursors = this.input.keyboard.createCursorKeys();
     this.cursor_Space = this.input.keyboard.addKey('SPACE');

     this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
      key: 'turn',
      frames: [ { key: 'player', frame: 4 } ],
      frameRate: 20
  });

  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
  });
     scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '64px', fill: '#FFFFFF' });

     scoreText.setText([
        
         'Score: ' + this.data.get('score')
     ]);
   

  }

  update(time, delta) {    
    if (this.cursors.left.isDown)
{
    this.player.setVelocityX(-160);

    this.player.anims.play('left', true);
}
else if (this.cursors.right.isDown)
{
    this.player.setVelocityX(160);

    this.player.anims.play('right', true);
}
else
{
    this.player.setVelocityX(0);

  this.player.anims.play('turn');
}

if (this.cursor_Space.isDown && this.player.body.touching.down)
{
    this.player.setVelocityY(-330);
   
     
    ;
}
  }
  collectStar (player, star)
{
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);
}

}

