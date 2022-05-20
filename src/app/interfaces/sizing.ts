export interface SizingChart {
  name: string;
  measurementKeys: MeasurementKey[];
  measurements: Measurements[];
  materials: string;
  order: string;
}

export interface MeasurementKey {
  key: string;
  title: string;
  order: number;
}

export interface Measurements {
  [key: string]: string | number;
  order: number;
}

export interface SizingChartTableProps {
  name: string;
  sizes: Measurements[];
  columns: { key: string; title: string; width?: string }[];
  materials: string;
}
