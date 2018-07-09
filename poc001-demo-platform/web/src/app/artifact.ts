export class Artifact {
  id: number;
  name: string;
  available: number;
  limited: boolean;
  provider: string;
  prices: number[] = [];
}
