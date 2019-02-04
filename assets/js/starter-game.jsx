import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function memory_init(root, channel) {
  ReactDOM.render(<Memory channel={channel} />, root);
}


class Memory extends React.Component {
  constructor(props) {
    super(props);

    this.channel = props.channel;
    // Set the state of the board.
    this.state = {
      clickable: true,
      clicks: 0,
      score: 0,
      board: []
    };

    this.channel.join()
    .receive("ok", resp => {
      console.log("Joined successfully!", resp);
      this.setState(resp.room);
    })
    .receive("error", resp => {
      console.log("Unable to join", resp);
    })
  }

  // Call this to determine whether or not the game is over.
  isGameOver() {
    // Assume that  we're done with the game.
    let done = true;
    let tempBoard = this.state.board.slice();
    // Look through every element in the board.
    for (var rowIndex = 0; rowIndex < tempBoard.length; rowIndex++) {
      for (var colIndex = 0; colIndex < tempBoard[rowIndex].length; colIndex++) {
        // If an element is not matched,
        if (!tempBoard[rowIndex][colIndex].matched) {
          // We are not done with the game.
          done = false;
        }
      }
    }
    // If we're still done with the game,
    if (done) {
      this.setState({ score: 100 - (this.state.clicks - 16) });
    }
  }

  // Call this function when choosing a tile.
  choose(r, c) {
    // If we can click,
    if (this.state.clickable) {
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
      this.setState({ board: newBoard, clicks: newClicks, clickable: false });
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
            this.isGameOver();
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
        // Re-enable clicks.
        this.setState({ clickable: true });
      }.bind(this), 1000);
    }
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
      <div className="column">
      <p>Clicks: {this.state.clicks}<br />Score: {this.state.score}</p>
      </div>
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
          {/* Render an empty tile. */}
          <div className="empty">!</div>
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
