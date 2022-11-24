import { AfterViewInit, Component, OnInit } from '@angular/core';
import Matter, {
  Bodies,
  Body,
  Composite,
  Composites,
  Constraint,
  Engine,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
  World,
} from 'matter-js';
import {
  AnimateTransformParams,
  RectParams,
  SvgParams,
} from '../../models/simulation-params';

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

    //create runner
    let runner: Runner = Runner.create();
    Runner.run(runner, this.engine);
    // add bodies
    //border squares
    /*
    rectangles expand from the center of their x and y coordinates .
    */
    let group: number = Body.nextGroup(true);
    this.rope = Composites.stack(500, 300, 2, 1, 10, 10, (x, y) => {
      return Bodies.rectangle(x, y, 50, 20, {
        collisionFilter: { group: group },
      });
    });

    // chain that connects the carts
    Composites.chain(this.rope, 0.5, 0, -0.5, 0, {
      stiffness: 0.8,
      length: 2,
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

    let topWall = Bodies.rectangle(375, 10, 720, 20, { isStatic: true });
    let leftWall = Bodies.rectangle(10, 240, 20, 700, { isStatic: true });
    let rightWall = Bodies.rectangle(735, 240, 20, 700, { isStatic: true });
    let bottomWall = Bodies.rectangle(375, 585, 720, 20, { isStatic: true });
    Composite.add(this.world, [
      this.rope,
      topWall,
      leftWall,
      rightWall,
      bottomWall,
    ]);

    this.mouse = Mouse.create(this.render.canvas);

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

  setRope() {}
  applyForce() {
    Body.applyForce(
      this.rope.bodies[0],
      { x: this.rope.bodies[0].position.x, y: this.rope.bodies[0].position.y },
      { x: 0.5, y: 0 }
    );
  }
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.cartSimulation();
  }
}
