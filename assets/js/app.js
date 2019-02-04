// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css";

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html";
import $ from "jquery";

// Import local files
//
import socket from "./socket"
import game_init from "./starter-game";

$(() => {
  let root = document.getElementById('root');
  if (root) {
    let channel = socket.channel("room:" + window.gameName, {});
    // We want to join in the react component.
    game_init(root, channel);
  }
});

var roomLink = document.getElementById("roomLink");
var roomName = document.getElementById("roomName");

function updateLink() {
  roomLink.href = '/room/' + encodeURIComponent(roomName.value);
  roomLink.firstChild.data = 'Join "' + roomName.value + '"';
}

roomName.addEventListener('change', updateLink);
roomName.addEventListener('keyup', updateLink);
