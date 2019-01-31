import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root) {
  ReactDOM.render(<Starter />, root);
}

class Starter extends React.Component {
  constructor(props) {
    super(props);

    // These are all the letters that will be shown in the board.
    let letters = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"]

    // Perform Knuth shuffle as described here: https://bost.ocks.org/mike/shuffle/
    var m = letters.length;
    var tmp, idx;

    while (m) {
      idx = Math.floor(Math.random() * m--);
      tmp = letters[m];
      letters[m] = letters[idx];
      letters[idx] = tmp
    }

    // Set the state of the board.
    this.state = {
      clicks: 0,
      board: [
        [
          {
            letter: letters[0],
            selected: false,
            matched: false
          },
          {
            letter: letters[1],
            selected: false,
            matched: false
          },
          {
            letter: letters[2],
            selected: false,
            matched: false
          },
          {
            letter: letters[3],
            selected: false,
            matched: false
          }
        ],
        [
          {
            letter: letters[4],
            selected: false,
            matched: false
          },
          {
            letter: letters[5],
            selected: false,
            matched: false
          },
          {
            letter: letters[6],
            selected: false,
            matched: false
          },
          {
            letter: letters[7],
            selected: false,
            matched: false
          }
        ],
        [
          {
            letter: letters[8],
            selected: false,
            matched: false
          },
          {
            letter: letters[9],
            selected: false,
            matched: false
          },
          {
            letter: letters[10],
            selected: false,
            matched: false
          },
          {
            letter: letters[11],
            selected: false,
            matched: false
          }
        ],
        [
          {
            letter: letters[12],
            selected: false,
            matched: false
          },
          {
            letter: letters[13],
            selected: false,
            matched: false
          },
          {
            letter: letters[14],
            selected: false,
            matched: false
          },
          {
            letter: letters[15],
            selected: false,
            matched: false
          }
        ]
      ]
    };
  }

  // Call this function when choosing a tile.
  choose(r, c) {
    // Set the new board.
    let newBoard = this.state.board.slice();
    // Increment the number of clicks in the new state.
    let newClicks = this.state.clicks + 1;
    let sRow = -1;
    let sCol = -1;
    // Look through the board to see if there's a previously selected tile.
    for (var rowIndex = 0; rowIndex < newBoard.length; rowIndex++) {
      for (var colIndex = 0; colIndex < newBoard[rowIndex].length; colIndex++) {
        // If one exists,
        if (newBoard[rowIndex][colIndex].selected) {
          // Set sRow and sCol to the row and col values of the tile.
          sRow = rowIndex;
          sCol = colIndex;
        }
      }
    }
    // Mark the currently chosen tile as selected for display purposes.
    newBoard[r][c].selected = true;
    // Set the state with the new board and number of clicks.
    this.setState({ board: newBoard, clicks: newClicks });
    // Wait 3 seconds, and then...
    setTimeout(function () {
      // If there exists a previously selected tile,
      if (sRow > -1 && sCol > -1) {
        // If the letter of the chosen tile is the same as the previously selected tile,
        if (newBoard[r][c].letter === newBoard[sRow][sCol].letter) {
          // The previously selected tile is no longer selected.
          newBoard[sRow][sCol].selected = false;
          // The currently chosen tile is no longer selected.
          newBoard[r][c].selected = false;
          // The previously selected tile is now matched.
          newBoard[sRow][sCol].matched = true;
          // The chosen tile is now matched.
          newBoard[r][c].matched = true;

          // If they don't match,
        } else {
          // The previously selected tile is no longer selected.
          newBoard[sRow][sCol].selected = false;
          // The currently chosen tile is no longer selected.
          newBoard[r][c].selected = false;
        }
        // Update the state with the new board.
        this.setState({ board: newBoard });
      }
    }.bind(this), 1000);
  }

  // Restart the game.
  restart() {
    // Refresh the window.
    window.location.reload();
  }

  // Render the board.
  render() {
    // Render each of the rows in the board.
    let board = _.map(this.state.board, (row, rowIndex) => {
      return <ShowRow
      key={rowIndex}
      rowIndex={rowIndex}
      root={this}
      choose={this.choose.bind(this)}
      row={row} />;
    });
    // Return the HTML.
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

// Render a row in the board.
function ShowRow(props) {
  // Render each tile in the row.
  let renderedRow = _.map(props.row, (col, colIndex) => {
    // If the tile is selected,
    if (col.selected) {
      // Return the tile showing its letter.
      return (
        <div className="column" key={colIndex}>
        {/* The tile has no onClick function because selected and matched tiles
          cannot be chosen again. */}
          <div className="tile">
          {col.letter}
          </div>
          </div>
        );
        // If the tile is matched,
      } else if (col.matched) {
        return (
          <div className="column" key={colIndex}>
          {/* Just return the column. The tile should not be rendered. */}
          </div>
        );
      } else {
        // Return the tile hiding its letter.
        return (
          <div className="column" key={colIndex}>
          {/* When clicked, the tile will choose itself. */}
          <div className="tile" onClick={() => props.choose(props.rowIndex, colIndex)}>
          ?
          </div>
          </div>
        );
      }
    });
    // Return the HTML.
    return <div className="row">{renderedRow}</div>
  }
