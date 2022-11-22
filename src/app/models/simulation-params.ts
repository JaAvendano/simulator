export interface SimulationParams {}
export interface SvgParams {
  width: number;
  height: number;
  viewBoxX1: number;
  viewBoxY1: number;
  viewBoxX2: number;
  viewBoxY2: number;
  viewBox: string;
}
export interface RectParams {
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface AnimateTransformParams {
  from1: number;
  from2: number;
  from3: number;
  from: string;
  to1: number;
  to2: number;
  to3: number;
  to: string;
  dur: number;
}
