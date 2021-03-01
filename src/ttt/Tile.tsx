import './Tile.css';

export default function Tile({
  col,
  isDisabled,
  isSequence,
  onClick,
  row,
  value
}: {
  col: number;
  isDisabled: boolean;
  isSequence: boolean;
  onClick(row: number, col: number): void;
  row: number;
  value: -1 | 1 | undefined;
}) {
  let classnames = 'tile';

  if (isDisabled) {
    classnames += ' is-disabled';
  }

  if (isSequence) {
    classnames += ' is-sequence';
  }

  return (
    <div
      className={classnames}
      onClick={() => {
        console.log('onclick')
        onClick(row, col)
      }}
    >
      {value === 1 && 'x'}
      {value === -1 && 'o'} 
    </div>
  )
}
