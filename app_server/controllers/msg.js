require('es6-promise').polyfill();
require('isomorphic-fetch');


const React = require('react');
const ReactDOMServer = require('react-dom/server');

require("@babel/register")({
    presets: [ '@babel/preset-react' ]
});
const Header = React.createFactory(require('../components/Header.jsx'));
const Footer = React.createFactory(require('../components/Footer.jsx'));
const MsgBoard = React.createFactory(require('../components/MsgBoard.jsx'));

function handleHTTPErrors(response){
    if(!response.ok) throw Error(response.status + ': ' + response.statusText);
    return response;
}
// temp hard-coded data
/*
const msgs = [
    { id: 1, name: 'Bill', msg: 'Hi All!' },
    { id: 2, name: 'Ann', msg: 'ICS 221 is fun!' },
    { id: 3, name: 'John', msg: 'Howdy!' },
    { id: 4, name: 'Barb', msg: 'Hi' },
    { id: 5, name: 'Frank', msg: 'Who\'s tired?' },
    { id: 6, name: 'Sarah', msg: 'I heart React' }
];
*/
// index handler
const renderIndex = (req, res, msgs) => {
    res.render ('index', {
        title: 'ICS 221 Universal JS Msg Board',
        header: ReactDOMServer.renderToString(Header()),
        footer: ReactDOMServer.renderToString(Footer()),
        msgBoard: ReactDOMServer.renderToString(MsgBoard(
            {messages: msgs}
        )),
        props:'<script>let messages=' + JSON.stringify(msgs) + '</script>' //.reverse() needed after msgs for lab 04 and 05
    });
};

const getMessages = (req, res) => {
    //fetch('http://localhost:3003/msgs') //Lab03 and Lab04 use this fetch call
    //fetch('http://localhost:3000/api/v1/msgs')
    //fetch(`${process.env.API_URL}`)
    fetch(`${process.env.API_URL}/msgs`)
    .then(response=> handleHTTPErrors(response))
    .then(result=> result.json())
    .then(result=> {
        if(!(result instanceof Array)) {
            console.error('API lookup error');
            result=[];
        } else {
            renderIndex(req, res, result);
        }
    })
    .catch(error=> {
        console.log(error);
    })
}
//module.exports = { index };
module.exports = { getMessages };