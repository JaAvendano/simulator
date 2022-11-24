import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  Engine,
  World,
  Body,
  Bodies,
  Constraint,
  Render,
  Runner,
  Composite,
  Mouse,
  MouseConstraint,
} from 'matter-js';
import { Offtrack } from 'src/app/models/offtrack';

@Component({
  selector: 'app-offtrack-simulator',
  templateUrl: './offtrack-simulator.component.html',
  styleUrls: ['./offtrack-simulator.component.css'],
})
export class OfftrackSimulatorComponent implements OnInit, AfterViewInit {
  offTrack: Offtrack;

  constructor() {}

  calcOffTrack() {
    this.offTrack.L = this.calcL(this.offTrack.L1, this.offTrack.L2);
    this.offTrack.C = this.calcC(
      this.offTrack.R,
      this.offTrack.L,
      this.offTrack.angle
    );
  }
  matterJs() {
    // create engine
    let engine: Engine = Engine.create();
    let world: World = engine.world;
    let matterJsElement: HTMLCanvasElement = document.getElementById(
      'matterjsview'
    ) as HTMLCanvasElement;
    let render: Render = Render.create({
      canvas: matterJsElement,
      engine: engine,
      options: {
        width: 800,
        height: 600,
        showVelocity: true,
      },
    });
    Render.run(render);

    //create runner
    let runner: Runner = Runner.create();
    Runner.run(runner, engine);
    // add bodies
    //border squares
    /*
    rectangles expand from the center of their x and y coordinates .
    */
    Composite.add(world, [
      Bodies.rectangle(400, 0, 800, 10, { isStatic: true }), // top side rectangle
      Bodies.rectangle(600, 500, 400, 10, { isStatic: true }), // bottom side rectangle
      Bodies.rectangle(400, 550, 10, 100, { isStatic: true }), // right side rectangle
      Bodies.rectangle(0, 300, 10, 600, { isStatic: true }), // left side rectangle
    ]);

    // top sliding square
    Composite.add(world, [
      Bodies.rectangle(300, 180, 700, 20, {
        isStatic: true,
        angle: Math.PI * 0.06,
        render: { fillStyle: '#060a19' },
      }),
      Bodies.rectangle(300, 70, 40, 40, { friction: 0.001 }),
    ]);
    // middle sliding square
    Composite.add(world, [
      Bodies.rectangle(300, 350, 700, 20, {
        isStatic: true,
        angle: Math.PI * 0.06,
        render: { fillStyle: '#060a19' },
      }),
      Bodies.rectangle(300, 250, 40, 40, { friction: 0.0005 }),
    ]);
    // bottom sliding square
    Composite.add(world, [
      Bodies.rectangle(300, 520, 700, 20, {
        isStatic: true,
        angle: Math.PI * 0.06,
        render: { fillStyle: '#060a19' },
      }),
      Bodies.rectangle(300, 430, 40, 40, { friction: 0 }),
    ]);

    // add mouse control
    let mouse = Mouse.create(render.canvas),
      mouseConstraint: MouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      });
    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;
    // fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: 800, y: 600 },
    });

    // context for MatterTools.Demo
    /*
    return {
      engine: engine,
      runner: runner,
      render: render,
      canvas: render.canvas,
      stop: function () {
        Render.stop(render);
        Runner.stop(runner);
      },
    };
    */
  }
  private calcL(L1: number, L2: number): number {
    let L1Sqrt: number = Math.pow(L1, 2);
    let L2Sqrt: number = Math.pow(L2, 2);
    return Math.pow(L1Sqrt + L2Sqrt, 0.5);
  }
  private calcC(R: number, L: number, angle: number): number {
    let gamma: number = -0.015 * angle * (R / L) + 0.216;
    let Rsqrt: number = Math.pow(R, 2);
    let Lsqrt: number = Math.pow(L, 2);
    let sqrtLR: number = Math.pow(Rsqrt - Lsqrt, 0.5);
    let c: number = R - sqrtLR;
    return c * (1 - Math.exp(gamma));
  }
  ngOnInit(): void {
    this.offTrack = {
      R: 36,
      L1: 24,
      L2: 16.93,
      angle: 90,
      C: 0,
      L: 0,
    };
    this.calcOffTrack();
  }
  ngAfterViewInit(): void {
    this.matterJs();
  }
}
