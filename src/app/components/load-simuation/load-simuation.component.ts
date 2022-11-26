import { AfterViewInit, Component, OnInit } from '@angular/core';
import Matter, {
  Bodies,
  Body,
  Composite,
  Composites,
  Engine,
  Events,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
  World,
} from 'matter-js';

@Component({
  selector: 'app-load-simuation',
  templateUrl: './load-simuation.component.html',
  styleUrls: ['./load-simuation.component.css'],
})
export class LoadSimuationComponent implements OnInit, AfterViewInit {
  engine: Engine;
  rope: Composite;
  world: World;
  runner: Runner;
  render: Render;
  canvas: HTMLCanvasElement;
  mouse: Mouse;
  constructor() {}

  loadSimulation() {
    this.engine = Engine.create();
    this.world = this.engine.world;
    this.canvas = document.getElementById('matterjsview') as HTMLCanvasElement;

    this.render = Render.create({
      canvas: this.canvas,
      engine: this.engine,
      options: {
        width: 800,
        height: 600,
        showVelocity: true,
      },
    });

    Render.run(this.render);
    this.runner = Runner.create();
    Runner.run(this.runner, this.engine);

    // add bodies
    let body = Bodies.rectangle(400, 500, 200, 60, {
        isStatic: true,
        render: { fillStyle: '#060a19' },
      }),
      size = 50,
      counter = -1;

    var stack = Composites.stack(
      350,
      470 - 6 * size,
      1,
      6,
      0,
      0,
      function (x, y) {
        return Bodies.rectangle(x, y, size * 2, size, {
          slop: 0.5,
          friction: 1,
          frictionStatic: Infinity,
        });
      }
    );

    Composite.add(this.world, [
      body,
      stack,
      // walls
      Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
      Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
      Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
      Bodies.rectangle(0, 300, 50, 600, { isStatic: true }),
    ]);

    Events.on(this.engine, 'beforeUpdate', function (event) {
      counter += 0.014;

      if (counter < 0) {
        return;
      }

      let px = 400 + 100 * Math.sin(counter);

      // body is static so must manually update velocity for friction to work
      Body.setVelocity(body, { x: px - body.position.x, y: 0 });
      Body.setPosition(body, { x: px, y: body.position.y });
    });

    // add mouse control
    this.mouse = Mouse.create(this.render.canvas);
    let mouseConstraint = MouseConstraint.create(this.engine, {
      mouse: this.mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });
    Composite.add(this.world, mouseConstraint);

    // keep the mouse in sync with rendering
    this.render.mouse = this.mouse;

    // fit the render viewport to the scene
    Render.lookAt(this.render, {
      min: { x: 0, y: 0 },
      max: { x: 800, y: 600 },
    });
  }
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.loadSimulation();
  }
}
