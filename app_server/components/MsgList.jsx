const React = require('react');
const Messages = require("./Messages.jsx");

class MsgList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: this.props.messages,
            name: this.props.username
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ messages: nextProps.messages });
    }

    handleDelete(id) {
        this.props.deleteSingleMsgCallback(id);
    }

    /* handleDeleteAll() {
        if (this.props.username === "Admin"){
            let deleteAllUserName = "Admin";
            this.props.deleteAllUserNameCallback(deleteAllUserName);
        }
    } */

    handleUpdate(uId, uMsg, uName) {
        this.props.updateSingleMsgCallback(uId, uMsg, uName);
    }

    render() {
        /* let deleteAllActions;
        if (this.props.username == "Admin") {
            deleteAllActions = (
                <th>
                    <button type="submit" className="btn btn-danger" onClick={this.deleteMessage}>Delete All</button>
                </th>
            );
        } else {
            deleteAllActions = <th/>
        } */
        return (
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                    <th scope="col" className="w-10">#</th>
                    <th scope="col" className="w-25">Name</th>
                    <th scope="col" className="w-50">Message</th>
                    <th scope="col">{this.props.username}</th>
                    {/* deleteAllActions */}
                    </tr>
                </thead>
                <tbody>
                    {this.state.messages.map((message, index) => (
                        <Messages
                        key={index}
                        displayId={index + 1}
                        id={message._id}
                        name={message.name}
                        username={this.props.username}
                        msg={message.msg}
                        deleteSingleMsgCallback={this.props.deleteMsgCallback}
                        updateSingleMsgCallback={this.props.updateMsgCallback}
                        />
                    ))}
                </tbody>
            </table>
        );
    }
}
/* const MsgList = (props) => {

    return (
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th scope="col" className="w-10">#</th>
                    <th scope="col" className="w-25">Name</th>
                    <th scope="col" className="w-50">Message</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {props.messages.map( (message, index) => // props.messages.reverse().map was used for Lab 04 and 05 
                <tr key={message._id}>
                    <td>{index+1}</td>
                    <td>{message.name}</td>
                    <td>{message.msg}</td>
                    <td><button className="btn btn-primary">Update</button></td>
                    <td><button id="cont1" className="btn btn-secondary">Delete</button></td>
                </tr> 
                )}
            </tbody>
        </table>
    );
} */

module.exports = MsgList