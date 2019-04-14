const React = require("react");

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.deleteMessage = this.deleteMessage.bind(this);
    }

    deleteMessage() {
        //console.log(this.props);
        let id = this.props.id;
        this.props.deleteSingleMsgCallback(id);
    }

    render() {
        let messageActions;
        if (/* this.props.username === "Admin" ||*/ this.props.name === "shin") {
            messageActions = (
                <td>
                    <button type="submit" className="btn btn-secondary" onClick={this.deleteMessage}>Delete</button>
                </td>
            );
        } else {
            messageActions = <td />;
        } 
        return (
            <tr>
                <td>{this.props.displayId}</td>
                <td>{this.props.name}</td>
                <td>{this.props.msg}</td>
                {messageActions}
            </tr>
        );
    }
}
module.exports = Messages;