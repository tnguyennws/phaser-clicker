import Phaser from '../lib/phaser.js'

import Beacon from '../game/Beacon.js'
import Bomb from '../game/Bomb.js'

export default class Game extends Phaser.Scene
{

    beaconsCollected = 0
    healthPoint = 3

    /** @type {Phaser.Physics.Arcade.Sprite} */
    player

    /** @type {Phaser.Physics.Arcade.StaticGroup} */
    asteroid

    /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
    cursors

    /** @type {Phaser.Physics.Arcade.Group} */
    beacons

    /** @type {Phaser.Physics.Arcade.Group} */
    bombs

    /**
    * @param {Phaser.GameObjects.Sprite} sprite
    */

    /** @type {Phaser.GameObjects.Text} */
    beaconsCollectedText

    /** @type {Phaser.GameObjects.Text} */
    healthPointText

   addBeacon(sprite)
    {
        const y = sprite.y - sprite.displayHeight + Phaser.Math.Between(-200, 200)
        const x = sprite.x + Phaser.Math.Between(-200, 200)

        /** @type {Phaser.Physics.Arcade.Sprite} */
        const beacon = this.beacons.get(x, y, 'beacon')

        // set active and visible
        beacon.setActive(true)
        beacon.setVisible(true)

        this.add.existing(beacon)

        // update the physics body size
        beacon.body.setSize(beacon.width, beacon.height)

        // make sure body is enabed in the physics world
        this.physics.world.enable(beacon)


        return beacon

    }
    
    addBomb(sprite)
    {
        const y = sprite.y - sprite.displayHeight + Phaser.Math.Between(-300, 300)
        const x = sprite.x + Phaser.Math.Between(-300, 300)

        /** @type {Phaser.Physics.Arcade.Sprite} */
        const bomb = this.bombs.get(x, y, 'bomb')

        // set active and visible
        bomb.setActive(true)
        bomb.setVisible(true)

        this.add.existing(bomb)

        // update the physics body size
        bomb.body.setSize(bomb.width, bomb.height)

        // make sure body is enabed in the physics world
        this.physics.world.enable(bomb)


        return bomb
    }

    constructor()
    {
        super('game')
    }

    init()
    {
        this.beaconsCollected = 0
        this.healthPoint = 3
    }

    preload()
    {
        // load the images
        this.load.image('background', 'assets/bg_layer1.png')

        this.load.image('space-ship', 'assets/ship1.png')

        this.load.image('asteroid', 'assets/asteroid1.png')

        this.load.image('beacon', 'assets/energy-cube.png')

        this.load.image('bombs', 'assets/space-bomb.png')

        //load the audio
        this.load.audio('explosion', 'assets/sfx/boom-sound-effect.ogg')

        // load the cursor
        this.cursors = this.input.keyboard.createCursorKeys()

    }

    create()
    {

        // add a background image
        this.add.image(480, 320, 'background')
        .setScrollFactor(0, 0)

        // change to use class property intead of local variable
        this.asteroid = this.physics.add.staticGroup()
        
        for (let i = 0; i < 10; ++i)
        {
            const x = Phaser.Math.Between(-600, 600)
            const y = Phaser.Math.Between(-300, 300)
        
            // use this.platforms here as well
            /** @type {Phaser.Physics.Arcade.Sprite} */
            const asteroid = this.asteroid.create(x, y, 'asteroid')
            asteroid.scale = 0.3
        
            /** @type {Phaser.Physics.Arcade.StaticBody} */
            const body = asteroid.body
            body.updateFromGameObject()
        }


        this.player = this.physics.add.sprite(240, 320, 'space-ship')
        .setScale(0.5)
        
        this.physics.add.collider(this.asteroid, this.player)

        this.cameras.main.startFollow(this.player)

        // set the horizontal dead zone to 1.5x game width
        this.cameras.main.setDeadzone(this.scale.width * 1)

        this.beacons = this.physics.add.group({
            classType: Beacon
        })

        this.bombs = this.physics.add.group({
            classType: Bomb
        })

        this.physics.add.overlap(
            this.player,
            this.beacons,
            this.handleCollectBeacon, // called on overlap
            undefined,
            this
            )

        this.physics.add.overlap(
            this.player,
            this.bombs,
            this.handleCollideBomb, // called on overlap
            undefined,
            this
            )

        const style = { color: '#FFF', fontSize: 24 }
        this.beaconsCollectedText = this.add.text(480, 10, 'Beacons: 0', style)
        .setScrollFactor(0)
        .setOrigin(0.5, 0) 

        this.healthPointText = this.add.text(200, 10, 'HP: 3', style)
        .setScrollFactor(0)
        .setOrigin(0.5, 0) 
 
    }

    update(t, dt)
    {

        if(this.beaconsCollected > 5)
        {
            this.scene.start('victory')
        }

        if(this.healthPoint == 0)
        {
            this.scene.start('game-over')
        }

        this.asteroid.children.iterate(child => {
            /** @type {Phaser.Physics.Arcade.Sprite} */
            const asteroid = child
            
            const scrollY = this.cameras.main.scrollY
            if (asteroid.y >= scrollY + 700)
            {
                asteroid.y = scrollY - Phaser.Math.Between(50, 100)
                asteroid.body.updateFromGameObject()

                this.addBeacon(asteroid)
                this.addBomb(asteroid)
            }
            if (asteroid.x >= scrollX + 700)
            {
                asteroid.x = scrollX - Phaser.Math.Between(50, 100)
                asteroid.body.updateFromGameObject()
            }
        })

        // left and right input logic
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-200)
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(200)
        }
        else if (this.cursors.down.isDown)
        {
            this.player.setVelocityY(200)
        }
        else if (this.cursors.up.isDown)
        {
            this.player.setVelocityY(-200)
        }
        else
        {
            // stop movement if not left or right
            this.player.setVelocityX(0)
            this.player.setVelocityY(0)
        }
    }

    /**
    * @param {Phaser.Physics.Arcade.Sprite} player
    * @param {Beacon} beacon
    */
   handleCollectBeacon(player, beacon)
   {
       // hide from display
       this.beacons.killAndHide(beacon)

       // disable from physics world
       this.physics.world.disableBody(beacon.body)

       // increment by 1
       this.beaconsCollected++

       // create new text value and set it
       const value = `Beacons: ${this.beaconsCollected}`
       this.beaconsCollectedText.text = value

   }

   
   /**
    * @param {Phaser.Physics.Arcade.Sprite} player
    * @param {Bomb} bomb
    */
   handleCollideBomb(player, bomb)
   {
       // hide from display
       this.bombs.killAndHide(bomb)

       // disable from physics world
       this.physics.world.disableBody(bomb.body)

       // decrement by 1
       this.healthPoint--

       this.sound.play('explosion')

       // create new text value and set it
       const value = `HP: ${this.healthPoint}`
       this.healthPointText.text = value

   }

}