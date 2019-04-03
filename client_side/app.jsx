const React = require('react');
const ReactDOM = require('react-dom');

const Header = require('../app_server/components/Header.jsx');
const Footer = require('../app_server/components/Footer.jsx');
const MsgBoard = require('../app_server/components/MsgBoard.jsx');

ReactDOM.hydrate(<Header/>, document.getElementById('header'));
ReactDOM.hydrate(<Footer/>, document.getElementById('footer'));
ReactDOM.hydrate(<MsgBoard messages={messages}/>, document.getElementById('msg-board'));