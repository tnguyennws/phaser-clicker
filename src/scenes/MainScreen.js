import Phaser from '../lib/phaser.js'

export default class MainScreen extends Phaser.Scene
{
    constructor()
    {
        super('main-screen')
    }

    preload()
    {

    }

    create()
    {
        const width = this.scale.width
        const height = this.scale.height
        
        this.add.text(width * 0.5, height * 0.5, 'NWS Clicker', {
        fontSize: 32
        })
        .setOrigin(0.5)

        this.add.text(width * 0.5, height * 0.6, 'press key SPACE to play', {
            fontSize: 30
            })
            .setOrigin(0.5)

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('game')
            })
    }
}
