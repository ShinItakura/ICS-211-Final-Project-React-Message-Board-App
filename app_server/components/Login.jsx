const React = require('react');

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {email: "", password: ""};
        this.handleText = this.handleText.bind(this);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }
    login(event) {
        event.preventDefault();

        // pass contril to MsgBoard and send
        // the email and pass the user entered
        this.props.loginCallback({
            email: this.state.email,
            password: this.state.password
        });
    }
    handleText(event) {
        if(event.target.id === 'email') {
            this.setState({
                email: event.target.value
            });
        } else {
            this.setState({
                password: event.target.value
            });
        }
    }
    register(event){
        event.preventDefault();
        this.props.registerCallback()

    }
    render() {
        let loginFailText;

        if (this.props.loginFail) {
            loginFailText = <p className="card-text pt-1 text-danger">Failed Login Attempt.
             &nbsp;{ this.props.loginAttempts } attempts remaining.</p>
        }
        return( 
            <React.Fragment>
                <form onSubmit={this.login}>
                    <div className="form-group">
                        <div>
                            <h3 className="card-title">Login to post a Message:</h3>
                        </div>
                        <div className="row">
                            <label htmlFor="email"className="col-2 col-form-label">
                                Email:
                            </label>
                            <label htmlFor="password" className="col-2 col-form-label">
                                Password:
                            </label>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <input id="email" type="text" className="form-control" placeholder="enter email" value={this.state.name} onChange={this.handleText}/> 
                            </div>
                            <div className="col-2">
                                <input id="password" type="password" className="form-control" placeholder="enter password" value={this.state.msg} onChange={this.handleText}/>
                            </div>
                            <div className="col-2">
                                <button type="submit" className="btn btn-primary">
                                    Login
                                </button>
                            </div>
                        </div>
                    </div> 
                </form>
                {loginFailText}
                <form onSubmit={this.register}>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-2">
                                <label htmlFor="register"className="col-form-label">Not registered ?</label>
                            </div>
                            <div className="col-1">
                                <button type="submit" className="btn btn-secondary">Register</button>
                            </div>  
                        </div>
                    </div> 
                </form> 
            </React.Fragment>
        )
    }
}

module.exports = Login