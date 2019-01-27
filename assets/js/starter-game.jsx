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
      board: {
        r1: {
          c1: {
            letter: "F",
            selected: false,
            matched: false
          },
          c2: {
            letter: "B",
            selected: false,
            matched: false
          },
          c3: {
            letter: "A",
            selected: false,
            matched: false
          },
          c4: {
            letter: "E",
            selected: false,
            matched: false
          }
        },
        r2: {
          c1: {
            letter: "C",
            selected: false,
            matched: false
          },
          c2: {
            letter: "G",
            selected: false,
            matched: false
          },
          c3: {
            letter: "A",
            selected: false,
            matched: false
          },
          c4: {
            letter: "D",
            selected: false,
            matched: false
          }
        },
        r3: {
          c1: {
            letter: "D",
            selected: false,
            matched: false
          },
          c2: {
            letter: "C",
            selected: false,
            matched: false
          },
          c3: {
            letter: "F",
            selected: false,
            matched: false
          },
          c4: {
            letter: "G",
            selected: false,
            matched: false
          }
        },
        r4: {
          c1: {
            letter: "B",
            selected: false,
            matched: false
          },
          c2: {
            letter: "H",
            selected: false,
            matched: false
          },
          c3: {
            letter: "E",
            selected: false,
            matched: false
          },
          c4: {
            letter: "H",
            selected: false,
            matched: false
          }
        }
      }
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

