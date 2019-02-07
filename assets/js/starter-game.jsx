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

    // Attempt to join the game.
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
    this.channel.push("restart", {})
    .receive("ok", (resp) => { this.setState(resp.room); });
  }

  // Call this function when choosing a tile.
  choose(r, c) {
    // If we can click,
    if (this.state.clickable) {
      // Make clicking impossible.
      this.setState({ clickable: false });
      // Ask to display the value that was clicked,
      // update the state with the response.
      this.channel.push("display", {row: r, col: c})
      .receive("ok", (resp) => { this.setState(resp.room); });
      // Wait 1 second...
      setTimeout(function() {
        // Ask to choose the value that was clicked,
        // update the state with the response.
        this.channel.push("choose", {row: r, col: c})
        .receive("ok", (resp) => { this.setState(resp.room); });
        // Enable clicking again.
        this.setState({ clickable: true });
      }.bind(this), 1000);
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
      <p><button onClick={this.restart.bind(this)}>Restart?</button></p>
      </div>
      </div>
      {board}
      </div>
    );
  }
}

// Render a row in the board.
function ShowRow(props) {
  // Render each card in the row.
  let renderedRow = _.map(props.row, (col, colIndex) => {
    // If the card is selected,
    if (col.revealed) {
      // Return an unclickable card.
      return (
        <div className="column" key={colIndex}>
        {/* The card has no onClick function because selected cards cannot be chosen again. */}
        <div className="tile">
        {col.letter}
        </div>
        </div>
      );
      // If the card is matched,
    } else if (col.matched) {
      return (
        <div className="column" key={colIndex}>
        {/* Render a blank card. */}
        <div className="empty">{col.letter}</div>
        </div>
      );
    } else {
      // Return a clickable card.
      return (
        <div className="column" key={colIndex}>
        {/* When clicked, the card will choose itself. */}
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
