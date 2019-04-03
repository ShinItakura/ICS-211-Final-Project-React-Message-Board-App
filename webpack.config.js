const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: path.join(__dirname, 'client_side', 'app.jsx'),
    output: {
        path: path.join(__dirname, '/public/javascripts/'),
        filename: 'bundle.js'
    },
    module:{
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [ '@babel/preset-react' ]
                }
            }
        ]
    },
    mode: process.env.NODE_ENV || 'development',
    plugins:[
        new Dotenv()
    ]
}