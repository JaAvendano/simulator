import { AfterViewInit, Component, OnInit } from '@angular/core';
import Matter, {
  Bodies,
  Body,
  Composite,
  Composites,
  Engine,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
  World,
} from 'matter-js';
import { relative } from 'path';

@Component({
  selector: 'cart-simulator',
  templateUrl: './cart-simulator.component.html',
  styleUrls: ['./cart-simulator.component.css'],
})
export class CartSimulatorComponent implements OnInit, AfterViewInit {
  engine: Engine;
  rope: Composite;
  world: World;
  runner: Runner;
  render: Render;
  canvas: HTMLCanvasElement;
  mouse: Mouse;

  constructor() {}

  cartSimulation() {
    // create engine
    this.engine = Engine.create();
    this.engine.gravity.y = 0;
    this.world = this.engine.world;
    this.canvas = document.getElementById('matterjsview') as HTMLCanvasElement;
    this.render = Render.create({
      canvas: this.canvas,
      engine: this.engine,
      options: {
        width: 800,
        height: 600,
        showCollisions: true,
        showVelocity: true,
      },
    });
    Render.run(this.render);
    this.engine.world.composites;

    //create runner
    let runner: Runner = Runner.create();
    Runner.run(runner, this.engine);
    // add bodies
    //border squares
    /*
    rectangles expand from the center of their x and y coordinates .
    */
    let group: number = Body.nextGroup(true);
    this.rope = Composites.stack(550, 150, 2, 1, 10, 10, (x, y) => {
      return Bodies.rectangle(x, y, 75, 20, {
        collisionFilter: { group: group },
      });
    });

    // chain that connects the carts

    Composites.chain(this.rope, 0.5, 0, -0.5, 0, {
      stiffness: 0.8,
      length: 8,
      render: { type: 'line' },
    });

    /*
    Composite.add(
      rope,
      Constraint.create({
        bodyB: rope.bodies[0],
        pointB: { x: -25, y: 0 },
        pointA: { x: rope.bodies[0].position.x, y: rope.bodies[0].position.y },
        stiffness: 0.5,
      })
    );
    */

    let topWall: Body = Bodies.rectangle(375, 10, 690, 20, { isStatic: true });
    let leftWall: Body = Bodies.rectangle(10, 240, 20, 700, { isStatic: true });
    let rightWall: Body = Bodies.rectangle(215, 440, 20, 300, {
      isStatic: true,
    });
    let upperRightWall: Body = Bodies.rectangle(735, 300, 20, 600, {
      isStatic: true,
    });
    let bottomWall: Body = Bodies.rectangle(475, 300, 500, 20, {
      isStatic: true,
    });

    Composite.add(this.world, [
      this.rope,
      topWall,
      leftWall,
      rightWall,
      upperRightWall,
      bottomWall,
    ]);

    this.mouse = Mouse.create(this.render.canvas);

    Matter.Body.setCentre(this.rope.bodies[0], { x: -25, y: 0 }, true);
    let mouseConstraint: MouseConstraint = MouseConstraint.create(this.engine, {
      mouse: this.mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });

    Composite.add(this.world, mouseConstraint);
    this.render.mouse = this.mouse;
    Render.lookAt(this.render, {
      min: { x: 0, y: 0 },
      max: { x: 700, y: 600 },
    });
  }

  applyForce() {
    let velocity: number = 6;
    let velocityX: number = velocity * Math.cos(45);
    let velocityY: number = velocity * Math.sin(45);
    Body.setVelocity(this.rope.bodies[0], { x: -velocityX, y: velocityY });
  }
  applyVerticalForce() {
    this.rope.bodies[0].position.x;
    Body.setVelocity(this.rope.bodies[0], { x: 0, y: 10 });
  }
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.cartSimulation();
  }
}
