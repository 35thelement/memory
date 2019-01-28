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

  render() {
    let board = _.map(this.state.board, (row, rowIndex) => {
      return <ShowRow key={rowIndex} rowIndex={rowIndex} root={this} row={row} />;
    });
    return (
      <div>{board}</div>
    );
  }
}

function ShowRow(props) {
  let renderedRow = _.map(props.row, (col, colIndex) => {
    return <ShowCol
    key={colIndex}
    rowIndex={props.rowIndex}
    colIndex={colIndex} root={props.root}
    col={col} />;
  });

  return <div className="row">{renderedRow}</div>
}

function ShowCol(props) {
  if (props.col.selected || props.col.matched) {
    return <div className="column"><p><button>{props.col.letter}</button></p></div>
  } else {
    return <div className="column"><p><button>?</button></p></div>
  }
}
