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

  choose(r, c) {
    let newBoard = this.state.board.slice();
    let newClicks = this.state.clicks + 1;
    if (!newBoard[r][c].matched) {
      let sRow = -1;
      let sCol = -1;
      for (var rowIndex = 0; rowIndex < newBoard.length; rowIndex++) {
        for (var colIndex = 0; colIndex < newBoard[rowIndex].length; colIndex++) {
          if (newBoard[rowIndex][colIndex].selected) {
            sRow = rowIndex;
            sCol = colIndex;
          }
        }
      }
      if (sRow > -1 && sCol > -1) {
        if (newBoard[r][c].letter === newBoard[sRow][sCol].letter) {
          newBoard[sRow][sCol].selected = false;
          newBoard[sRow][sCol].matched = true;
          newBoard[r][c].matched = true;
        } else {
          newBoard[sRow][sCol].selected = false;
          alert(newBoard[r][c].letter + "!=" + newBoard[sRow][sCol].letter);
        }
      } else {
        newBoard[r][c].selected = true;
      }
    }
    this.setState({ board: newBoard, clicks: newClicks });
  }

  restart() {
    window.location.reload();
  }

  render() {
    let board = _.map(this.state.board, (row, rowIndex) => {
      return <ShowRow
      key={rowIndex}
      rowIndex={rowIndex}
      root={this}
      choose={this.choose.bind(this)}
      row={row} />;
    });
    return (
      <div>
      <div className="row">
        <div className="column"><h2>Clicks: {this.state.clicks}</h2></div>
        <div className="column"><h1>Memory Game!</h1></div>
        <div className="column">
          <p><button onClick={this.restart.bind()}>Restart?</button></p>
        </div>
      </div>
      {board}
      </div>
    );
  }
}

function ShowRow(props) {
  let renderedRow = _.map(props.row, (col, colIndex) => {
    if (col.selected || col.matched) {
      return (
        <div className="column" key={colIndex}>
          <p>
            <button>
              {col.letter}
            </button>
          </p>
        </div>
      );
    } else {
      return (
        <div className="column" key={colIndex}>
          <p>
            <button onClick={() => props.choose(props.rowIndex, colIndex)}>
              ?
            </button>
          </p>
        </div>
      );
    }
  });
  return <div className="row">{renderedRow}</div>
}
