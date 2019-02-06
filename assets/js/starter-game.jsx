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

  // Call this function when restarting.
  restart() {
    this.channel.push("restart_game", {})
    .receive("ok", (resp) => { this.setState(resp.room); });
  }

  // Call this function when choosing a tile.
  choose(r, c) {
    // If we can click,
    if (this.state.clickable) {
      this.channel.push("choose", {row: r, col: c})
      .receive("ok", (resp) => { this.setState(resp.room); });
      this.setState({ clickable: true });
    }
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
      // Return an unclickable tile.
      return (
        <div className="column" key={colIndex}>
        {/* The tile has no onClick function because selected tiles cannot be chosen again. */}
        <div className="tile">
        {col.letter}
        </div>
        </div>
      );
      // If the tile is matched,
    } else if (col.matched) {
      return (
        <div className="column" key={colIndex}>
        {/* Render a blank tile. */}
        <div className="empty">{col.letter}</div>
        </div>
      );
    } else {
      // Return a clickable tile.
      return (
        <div className="column" key={colIndex}>
        {/* When clicked, the tile will choose itself. */}
        <div className="tile" onClick={() => props.choose(props.rowIndex, colIndex)}>
        {col.letter}
        </div>
        </div>
      );
    }
  });
  // Return the HTML.
  return <div className="row">{renderedRow}</div>
}
