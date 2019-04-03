'use strict';
/*************************************************
* Registration Component for ICS 221 Lab 7
* ----------------------------------------
*
* Author: Jason Cumiskey
*
* Date: March 10, 2019
*
* Version: 0.1
*
* This Component is a registration form to be used
* with Lab 7 in ICS 221.
*
* Notes:
* - This Component is fairly complex and should
* be broken down into several smaller components.
* - I'll add it to my to-do list.
* - Tests should be written for it (TDD)
*
**************************************************/
const React = require('react');
const rules = require('./rules');
const Filter = require('bad-words');

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.state = {
      email: '',
      user: '',
      pass: '',
      rpass: '',
      strength: {},
      allFieldsOk: {
        email: false,
        user: false,
        pass: false,
        rpass: false
      }
    };
  }
  
  /* This method checks the password the user is entering.
     It builds a JS object of the rules as they pass and saves
     it as a state variable called strength. If the length of strength
     is equivalent to the length of all the rules, then all rules have passed
     and we can set fields.pass to true and update the allFieldsOk state variable.
  */
  checkPassword(event) {
    const password = event.target.value;
    
    this.setState({
      pass: password
    });

    /* build an object strength with each key matching
       one of the rules. If the value is true, the password
       conforms to that rule
    */
    let strength = {};
    for (const [ ruleName, rule ] of Object.entries(rules)) {
      if (rule.pattern.test(password)) {
        strength[ruleName] = true;
      }
    }

    this.setState({
        strength: strength
      },
      () => {
        /* This callback determines if the password
         conforms to all rules by determining if the
         strength object has as many keys as the rules
         object. If so, then set fields.pass to true.
        */
        let fields = Object.assign(this.state.allFieldsOk);
        
        if (
          Object.keys(this.state.strength).length === 
            Object.keys(rules).length
        ) {
          fields.pass = true;
        } else {
          fields.pass = false;
        }

        /* This is an edge case whereby a User
           has entered a 'confirm password' and
           then changes the password to match/unmatch
           it
        */
        if ( password === this.state.rpass) {
          fields.rpass = true;
        } else {
          fields.rpass = false;
        }
        
        this.setState({
          allFieldsOk: fields
        });
      }
    );
  }

  
  /* This method checks the email address entered against a regular expression.
     If the email passes, then fields.email is set to true and the allFieldsOk
     state variable is updated with the new value.
  */
  checkEmail(event) {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let email = event.target.value;
    
    // make it all lowercase
    email = email.toLowerCase();
    
    let fields = Object.assign(this.state.allFieldsOk);  
    
    this.setState({
      email: email
    }, () => {
      if (emailRegEx.test(email)) {
        // email passes regex
        fields.email = true;
      } else {
        fields.email = false;
      }

      this.setState({
        allFieldsOk: fields
      });
    });
  }

  /* This handles the username entered. It uses the 'bad-words' module
     to replace bad words with spaces. It also trims whitespace.
     Then it updates the state and checks if it is between 3 and 20
     characters. If so, it's valid. Update the AllFieldsOk state.
  */
  handleUsername(event) {
    let user = event.target.value;
    let filter = new Filter({ placeHolder: ' ' });
    let fields = Object.assign(this.state.allFieldsOk);

    // any bad words are replaced with spaces
    user = filter.clean(user);
    // before checking length, trim whitespace
    user = user.trim();
    
    this.setState({
      user: user
    }, () => {
      /* Simply check that the Username
         is between 3 and 20 characters
      */
      if (user.length > 2 && user.length < 21) {
        fields.user = true;
      } else {
        fields.user = false;
      }

      this.setState({
        allFieldsOk: fields
      });
    });
  }

  /* This handles the confirm password element. It checks
     to see that if it is equal to password and updates
     allFieldsOk accordingly.
  */
  handleConfirmPassword(event) {
    let fields = Object.assign(this.state.allFieldsOk);
      
    this.setState({
      rpass: event.target.value
    }, () => {
      if (this.state.rpass === this.state.pass) {
        fields.rpass = true;
      } else {
        fields.rpass = false;
      }

      this.setState({
        allFieldsOk: fields
      });
    });
  }

  /* We're doing nothing here other than to pass Control to
     MsgBoard and give it the supplied email, username, and
     password
  */
  registerUser(event) {
    event.preventDefault();
    
    if (this.canRegister()) {
      // pass control to MsgBoard so it can make the API Call
      this.props.registerNewUserCallback({
        email: this.state.email,
        username: this.state.user,
        password: this.state.pass
      });
    }
  }

  /* check if each field passes their tests. */
  canRegister() {
    let registerEnable = true;
    for (const value of Object.values(this.state.allFieldsOk)) {
      if (!value) registerEnable = false;
    }
    return registerEnable;
  }

  render() {
    /* This builds a new array with each rule for the password
       and whether it has been completed by the user.
       This will be used to strike out rules they have done.
    */ 
    let processedRules = Object.keys(rules).map( (rule, index) => {
      return {
        key: index,
        rule: rules[rule],
        isCompleted: this.state.strength[rule] || false
      }
    });

    return (
      <div className="card col-8 my-3">
        <div className="card-body">
          <h4 className="card-title">Register:</h4>
            <form onSubmit={this.registerUser}>
            <div className="form-group row">
              <label
                htmlFor="email"
                className="col-3 col-form-label text-right"
              >
                Email:
              </label>
              <div className="col-9">
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="enter your email"
                  value={this.state.email}
                  onChange={this.checkEmail}
                />
              </div>
            </div>
            <div className="col-9 offset-3">
              <p className="text-danger">{ !this.state.allFieldsOk.email ? 'invalid email address' : '' }</p>    
            </div>
            <div className="form-group row">
              <label htmlFor="user" className="col-3 col-form-label text-right">
                Username:
              </label>
              <div className="col-9">
                <input
                  id="user"
                  type="text"
                  className="form-control"
                  placeholder="enter a username"
                  value={this.state.user}
                  onChange={this.handleUsername}
                />
              </div>
            </div>
            <div className="col-9 offset-3">
              <p className="text-danger">{ !this.state.allFieldsOk.user ? 'invalid username' : '' }</p>    
            </div>
            <div className="form-group row">
              <label
                htmlFor="password"
                className="col-3 col-form-label text-right"
              >
                Enter Password:
              </label>
              <div className="col-9">
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder="enter a password"
                  value={this.state.pass}
                  onChange={this.checkPassword}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-9 offset-3">
                <ul>
                  {processedRules.map( processedRule => {
                      if (processedRule.isCompleted) {
                        return (
                          <li key={processedRule.key}>
                            <strike>{processedRule.rule.message}</strike>
                          </li>
                        )
                      } else {
                        return (
                          <li key={processedRule.key}>
                            {processedRule.rule.message}
                          </li>
                        )
                      }
                    }
                  )}
                </ul>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="repeat-password"
                className="col-3 col-form-label text-right"
              >
                Repeat Password:
              </label>
              <div className="col-9">
                <input
                  id="repeat-password"
                  type="password"
                  className="form-control"
                  placeholder="repeat the password"
                  value={this.state.rpass}
                  onChange={this.handleConfirmPassword}
                />
              </div>
            </div>
            <div className="col-9 offset-3">
              <p className="text-danger">{ !this.state.allFieldsOk.rpass ? 'passwords don\'t match' : '' }</p>    
            </div>
            <div className="form-group row">
              <div className="mx-auto">
                <button
                  type="submit"
                  className={
                    'btn btn-lg btn-primary ' +
                    (this.canRegister() ? '' : 'disabled')
                  }
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

module.exports = Registration;
