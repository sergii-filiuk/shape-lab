import { Shape } from '../../../../store/scenesStore/types';

export type RayTracingGeometryProps = {
  shapes: Shape[];
  resolution: {
    x: number;
    y: number;
  };
};
