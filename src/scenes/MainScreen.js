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
            font: "70px Times New Roman", fill: "#00B1AB"
        })
        .setOrigin(0.5)

        this.add.text(width * 0.4, height * 0.6, 'press key SPA ', {
            font: "70px Times New Roman", fill: "#FEC70C"

            })
            .setOrigin(0.5)

        this.add.text(width * 0.65, height * 0.6, 'CE to play', {
            font: "70px Times New Roman", fill: "#F0553E"
    
            })
            .setOrigin(0.5)

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('game')
            })
    }
}
