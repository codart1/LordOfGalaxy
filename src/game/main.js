//MAIN
(function() {
    var config = Codart.Game.LordOfGalaxy.config;
    console.log(config);
  
    var game = new Phaser.Game(500, 600, Phaser.AUTO, 'game', { preload: preload, create: create });

    //short cut for Assets Path:
    var ap = config.assets.paths;
    //short cut for Assets ID:
    var id = config.assets.id;
  
    function preload() {
        game.load.image(id.mainShip, ap.mainShip);
    }

    function create() {
        game.stage.backgroundColor = config.backgroundColor;
        //console.log(game)/;
      
        game.add.sprite(0, 0, id.mainShip);
    }
})();