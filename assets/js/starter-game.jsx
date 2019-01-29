import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root) {
  ReactDOM.render(<Starter />, root);
}

class Starter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks: 0,
      board: [
        [
          {
            letter: "F",
            selected: false,
            matched: false
          },
          {
            letter: "B",
            selected: false,
            matched: false
          },
          {
            letter: "A",
            selected: false,
            matched: false
          },
          {
            letter: "E",
            selected: false,
            matched: false
          }
        ],
        [
          {
            letter: "C",
            selected: false,
            matched: false
          },
          {
            letter: "G",
            selected: false,
            matched: false
          },
          {
            letter: "A",
            selected: false,
            matched: false
          },
          {
            letter: "D",
            selected: false,
            matched: false
          }
        ],
        [
          {
            letter: "D",
            selected: false,
            matched: false
          },
          {
            letter: "C",
            selected: false,
            matched: false
          },
          {
            letter: "F",
            selected: false,
            matched: false
          },
          {
            letter: "G",
            selected: false,
            matched: false
          }
        ],
        [
          {
            letter: "B",
            selected: false,
            matched: false
          },
          {
            letter: "H",
            selected: false,
            matched: false
          },
          {
            letter: "E",
            selected: false,
            matched: false
          },
          {
            letter: "H",
            selected: false,
            matched: false
          }
        ]
      ]
    };
  }

  {/* Call this function when choosing a tile. */}
  choose(r, c) {
    {/* Set the new board. */}
    let newBoard = this.state.board.slice();
    {/* Increment the number of clicks in the new state. */}
    let newClicks = this.state.clicks ++;
    let sRow = -1;
    let sCol = -1;
    {/* Look through the board to see if there's a previously selected tile. */}
    for (var rowIndex = 0; rowIndex < newBoard.length; rowIndex++) {
      for (var colIndex = 0; colIndex < newBoard[rowIndex].length; colIndex++) {
        {/* If one exists, */}
        if (newBoard[rowIndex][colIndex].selected) {
          {/* Set sRow and sCol to the row and col values of the tile. */}
          sRow = rowIndex;
          sCol = colIndex;
        }
      }
      {/* If there exists a previously selected tile, */}
      if (sRow > -1 && sCol > -1) {
        {/* If the letter of the chosen tile is the same as the previously selected tile, */}
        if (newBoard[r][c].letter === newBoard[sRow][sCol].letter) {
          {/* The previously selected tile is no longer selected. */}
          newBoard[sRow][sCol].selected = false;
          {/* The previously selected tile is now matched. */}
          newBoard[sRow][sCol].matched = true;
          {/* The chosen tile is now matched. */}
          newBoard[r][c].matched = true;
          {/* If they don't match, */}
        } else {
          {/* The previously selected tile is no longer selected. */}
          newBoard[sRow][sCol].selected = false;
          {/* Alert the player that the letters don't match. */}
          alert(newBoard[r][c].letter + "!=" + newBoard[sRow][sCol].letter);
        }
        {/* If no tile has been previously selected, */}
      } else {
        {/* The chosen tile is now selected. */}
        newBoard[r][c].selected = true;
      }
    }
    {/* Update the state with the new board and number of clicks. */}
    this.setState({ board: newBoard, clicks: newClicks });
  }

  {/* Restart the game. */}
  restart() {
    {/* Refresh the window. */}
    window.location.reload();
  }

  {/* Render the board. */}
  render() {
    {/* Render each of the rows in the board. */}
    let board = _.map(this.state.board, (row, rowIndex) => {
      return <ShowRow
      key={rowIndex}
      rowIndex={rowIndex}
      root={this}
      choose={this.choose.bind(this)}
      row={row} />;
    });
    {/* Return the HTML. */}
    return (
      <div>
        <div className="row">
          <div className="column"><h2>Clicks: {this.state.clicks}</h2></div>
          <div className="column"><h1>Welcome to Phoenix!</h1></div>
          <div className="column">
            <p><button onClick={this.restart.bind()}>Restart?</button></p>
          </div>
        </div>
        {board}
      </div>
    );
  }
}

{/* Render a row in the board. */}
function ShowRow(props) {
  {/* Render each tile in the row. */}
  let renderedRow = _.map(props.row, (col, colIndex) => {
    {/* If the tile is selected or matched, */}
    if (col.selected || col.matched) {
      {/* Return the tile showing its letter. */}
      return (
        <div className="column" key={colIndex}>
          <p>
            {/* The tile has no onClick function because selected and matched tiles
                cannot be chosen again. */}
            <button>
              {col.letter}
            </button>
          </p>
        </div>
      );
      {/* Otherwise, */}
    } else {
      {/* Return the tile hiding its letter. */}
      return (
        <div className="column" key={colIndex}>
          <p>
          {/* When clicked, the tile will choose itself. */}
            <button onClick={() => props.choose(props.rowIndex, colIndex)}>
              ?
            </button>
          </p>
        </div>
      );
    }
  });
  {/* Return the HTML. */}
  return <div className="row">{renderedRow}</div>
}
