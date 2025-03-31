"use client";

import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import building from "../images/jpaa.png"

export default function Game() {
  const gameRef = useRef(null);

  useEffect(() => {
    if (!gameRef.current) {
      const config = {
        type: Phaser.AUTO,
        width: 2000,
        height: 1000,
        parent: "game-container",
        backgroundColor: "#f9a131",
        physics: {
          default: "arcade",
          arcade: { gravity: { y: 0 }, debug: false },
        },
        scene: {
          preload,
          create,
          update,
        },
      };

      gameRef.current = new Phaser.Game(config);
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  function preload() {
    this.load.image("road", "/images/wooden.jpg");
    this.load.image("building", "/images/gatt.png");
    this.load.image("player", "/images/lasstcc.png");
    this.load.image("newHouse" , "/images/houseTwo.png")
    this.load.image("firstTable" , "/images/firstTable.png")
    this.load.image("sofa" , "/images/sofa.png")

  }

  function create() {
    // Background road
    this.add.tileSprite(512, 384, 2000, 1000, "road");

    // Physics group for buildings
    this.buildings = this.physics.add.staticGroup();

    // // Add buildings
    const table = [
      { x: 200, y: 200 },      
    ];
    
    const sofa = [
      {x:80,y:250}
    ]

    table.forEach((value)=>{
      let table = this.buildings.create(value.x , value.y , "firstTable").setScale(1.3)
      table.refreshBody()
    })

    sofa.forEach((pos)=>{
      let sofa = this.buildings.create(pos.x , pos.y , "sofa").setScale(0.8)
      sofa.refreshBody()
    })

    // const buildingPositionSecondType = [
    //   { x: 20, y: 200 },
    //   { x: 5000, y: 600 },
    //   { x: 8000, y: 700 },
    //   { x: 1000, y: 800 },
    //   { x: 1850, y: 900 },
    //   { x: 4000, y: 1500 },
    //   { x: 3300, y: 50 },
    //   { x: 3600, y: 1400 },
    //   { x: 3700, y: 3500 },
    //   { x: 5300, y: 1800 }
    // ];

    // buildingPositions.forEach((pos) => {
    //   const building = this.buildings.create(pos.x, pos.y, "building").setScale(0.6);
    //   building.refreshBody(); // Refresh physics body
    // });

    // buildingPositionSecondType.forEach((value)=>{
    //   const building = this.buildings.create(value.x , value.y , "newHouse").setScale(0.6)
    //   building.refreshBody()
    // })

    // Player
    this.player = this.physics.add
      .sprite(512, 384, "player")
      .setScale(0.2)
      .setCollideWorldBounds(true);

    // Add collision between player and buildings
    this.physics.add.collider(this.player, this.buildings);

    // Camera follows the player
    this.cameras.main.startFollow(this.player);

    // Controls
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  function update() {
    const speed = 500;

    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
    }
  }

  return(
  <>
  <div id="game-container" className="flex justify-center items-center" style={{ width: "100%", height: "100%" }} >
 
  </div>
  </>
  )

}
