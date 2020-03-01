export as namespace ICount;

export interface State {
  count: number;
}

type Action =
  | { type: 'ADD'; payload: { num: number } }
  | { type: 'MINUS'; payload: { num: number } };
