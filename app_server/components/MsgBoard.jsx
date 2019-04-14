const React = require('react');
const MsgList = require('./MsgList.jsx');
const NewMsg = require('./NewMsg.jsx');
const Login = require('./Login.jsx');
const Registration = require('../../client_side/Registration.jsx');

class MsgBoard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            messages : this.props.messages,
            loginForm : true,
            loginAttempts : 3,
            loginFail : false,
            userCredentials: {
                email: '',
                password: ''
            },
            registrationForm: false,
            registrationFail: false,
            username: ''
        };
        this.addMessage = this.addMessage.bind(this);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.addNewUser = this.addNewUser.bind(this);
        this.deleteSingleMessage = this.deleteSingleMessage.bind(this);
    }

    handleHTTPErrors(response){
        if(!response.ok) throw Error(response.status + ': ' + response.statusText);
        return response;
    }

    componentDidMount(){
        //fetch('http://localhost:3003/msgs') // Lab 03 and 04
        //fetch('http://localhost:3000/api/v1/msgs')
        //fetch(`${process.env.API_URL}`)
        fetch(`${process.env.API_URL}/msgs`)
        .then(response=> this.handleHTTPErrors(response))
        .then(response=> response.json())
        .then(result=> {
        this.setState({
            messages: result
        });
    })
    .catch(error=> {
        console.log(error);
    });
    }

    addMessage(message){
        const basicString = this.state.userCredentials.email + ':'
           + this.state.userCredentials.password;
        /* removed for lab 05
        // TODO: Make API Call to Store a New Message and updt state var message
        let msgs = this.state.messages;
        
        // add id attribute
        message.id = msgs.length;
        // append to array
        msgs.push(message);
        // update state var
        this.setState({
            messages: msgs
        });
        */

        // update back-end data
        //fetch('http://localhost:3003/msgs', { // used in lab 03 and 04
        //fetch('http://localhost:3000/api/v1/msgs', {
        //fetch(`${process.env.API_URL}`, {
        fetch(`${process.env.API_URL}/msgs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(basicString) 
            },
            body: JSON.stringify(message)
        })
        .then(response=> this.handleHTTPErrors(response))
        .then(result => result.json())
        .then(result => {
            this.setState({
                messages: [result].concat(this.state.messages)
            });
        })
        .catch(error=> {
            console.log(error);
        });
    }

    deleteSingleMessage(id) {
        let messageId = { _id: id };
        fetch(`${process.env.API_URL}/msgs/name/${messageId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messageId)
        })
        .then(response => this.handleHTTPErrors(response))
        .then(result => result.json())
        .then(result => {
            //let updatedMsgs = this.state.messages;
            //updatedMsgs = updatedMsgs.filter(msg => msg._id !== result.id);
            this.setState({
                messages: updatedMsgs
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    login(userCredentials){
        // userCredentials are passed in from Login component
        // For Basic Authentication it is username:password (but we're using email)
        const basicString = userCredentials.email + ':' + userCredentials.password;
        fetch(`${process.env.API_URL}/users/login`, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + btoa(basicString)
            }   
        })   
        .then(response=> {
            // No more login attempts, throw an error
            if (this.state.loginAttempts === 0) throw'locked out';
            // OK response, credentials accepted
            if (response.status === 200) {
                this.setState({
                    userCredentials: userCredentials,
                    loginForm: false,
                    loginFail: false       
                });
                return response;     
            } else {
                // Credentials are wrong
                this.setState((state) => {
                    return ({
                        loginFail: true,
                        loginAttempts: state.loginAttempts - 1         
                    });       
                });     
            }   
        }).then(result => result.json())
        .then(result => {
            this.setState({
                username: result.username
            })
        })   
        .catch(error => {console.log(error);   
        })
    }

    register() {
        this.setState ({
            registrationForm: true
        });
    }

    addNewUser(userDetails) {
        fetch(`${process.env.API_URL}/users`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'     
            },
            body: JSON.stringify(userDetails)   
        })   
        .then(response=> {
            if (response.status === 201) {
                // User successfully registered
                // disable the Registration Form
                this.setState({
                    registrationForm: false,
                    registrationFail: false       
                });     
            } else {
                // Some Error or User already exists
                this.setState({
                    registrationFail: true       
                });     
            }   
        })   
        .catch(error => {console.log(error);   
        });
    }

    render() {
        if (this.state.registrationForm){
            let failedRegistration;

            if (this.state.registrationFail) {
                failedRegistration = <p className="text-danger">User already Registered or Registration Error.</p>
            }
            return(
                <div>
                    <Registration registerNewUserCallback={this.addNewUser} />
                    {failedRegistration}
                </div>
            )
        } else {
            let form;
            if (this.state.loginForm) {
                form = <Login registerCallback={this.register}
                loginCallback={this.login}
                loginFail={this.state.loginFail}
                loginAttempts={this.state.loginAttempts}
                />
            } else {
                form = <NewMsg addMsgCallback={this.addMessage} username={this.state.username} />
            }
            return(
                <div>
                    {form}
                    <MsgList messages={this.state.messages} 
                    username={this.state.username} 
                    deleteSingleMsgCallback={this.deleteSingleMessage}/>
                </div>
            );
        }
    }
}

module.exports = MsgBoard