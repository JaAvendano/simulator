import { Component, OnInit } from '@angular/core';
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
export class CartSimulatorComponent implements OnInit {
  public svgParams: SvgParams;
  public rectParams: RectParams;
  public animateTransformParams: AnimateTransformParams;
  constructor() {}

  updateSvgViewBox() {}
  getAnimateTransformFrom(): string {
    return (
      this.animateTransformParams.from1 +
      ' ' +
      this.animateTransformParams.from2 +
      ' ' +
      this.animateTransformParams.from3
    );
  }
  getAnimateTransformTo(): string {
    return (
      this.animateTransformParams.to1 +
      ' ' +
      this.animateTransformParams.to2 +
      ' ' +
      this.animateTransformParams.to3
    );
  }
  getSvgViewBox(): string {
    return (
      this.svgParams.viewBoxX1 +
      ' ' +
      this.svgParams.viewBoxY1 +
      ' ' +
      this.svgParams.viewBoxX2 +
      ' ' +
      this.svgParams.viewBoxY2
    );
  }
  updateViewBox() {
    this.svgParams.viewBox = this.getSvgViewBox();
  }
  updateAnimateTransform() {
    this.animateTransformParams.to = this.getAnimateTransformTo();
    this.animateTransformParams.from = this.getAnimateTransformFrom();
  }
  ngOnInit(): void {
    this.svgParams = {
      width: 400,
      height: 400,
      viewBoxX1: 0,
      viewBoxY1: 0,
      viewBoxX2: 400,
      viewBoxY2: 400,
      viewBox: '',
    };
    this.updateSvgViewBox();
    this.rectParams = {
      x: 200,
      y: 200,
      width: 50,
      height: 100,
    };
    this.animateTransformParams = {
      from1: 150,
      from2: 200,
      from3: 0,
      from: '',
      to1: -300,
      to2: 200,
      to3: 0,
      to: '',
      dur: 10,
    };
    this.updateAnimateTransform();
  }
}
