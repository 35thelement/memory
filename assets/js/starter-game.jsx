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

  swap(_ev) {
    let state1 = _.assign({}, this.state, { left: !this.state.left });
    this.setState(state1);
  }

  hax(_ev) {
    alert("hax!");
  }

  render() {
    let button = <div className="column" onMouseMove={this.swap.bind(this)}>
      <p><button onClick={this.hax.bind(this)}>Click Me</button></p>
    </div>;

    let blank = <div className="column">
      <p>Nothing here.</p>
    </div>;

    if (this.state.left) {
      return <div className="row">
        {button}
        {blank}
      </div>;
    }
    else {
      return <div className="row">
        {blank}
        {button}
      </div>;
    }
  }
}

