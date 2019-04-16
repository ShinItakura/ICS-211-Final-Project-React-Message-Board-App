const React = require("react");

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.deleteMessage = this.deleteMessage.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.state = {
            text: '', 
            inputText: this.props.msg, 
            mode:'view'
        };
    }
    

    deleteMessage() {
        //console.log(this.props);
        let id = this.props.id;
        this.props.deleteSingleMsgCallback(id);
    }
    updateMessage(){
        let id = this.props.id;
        let msg = this.props.msg;
        this.props.updateSingleMsgCallback(id ,msg);
    }
    handleChange(e){
        this.setState({inputText: e.target.value});
    }
    handleSave() {
        this.setState({text: this.state.inputText, mode: 'view'});
    }
    handleEdit() {
        this.setState({mode: 'edit'});
    }
    handleCancel(){
        this.setState({mode: 'view'});
    }

    render() {
        let messageActions;
        let editActions;
        if (this.props.name === this.props.username) {
            messageActions = (
                <td>
                    <button type="submit" className="btn btn-secondary" onClick={this.deleteMessage}>Delete</button>
                </td>
            );
            editActions = (
                <td>
                    <button className="btn btn-secondary" onClick={this.handleEdit}>Edit</button>
                </td>
            );
        } else {
            messageActions = <td />;
            editActions = <td />;
        } 
        if (this.state.mode === 'view') {
            return (
                <tr>
                    <td>{this.props.displayId}</td>
                    <td>{this.props.name}</td>
                    <td>{this.props.msg}</td>
                    {editActions}
                    {messageActions}
                </tr>
            );
        } else {
            return (
                <tr>
                    <td>{this.props.displayId}</td>
                    <td>{this.props.name}</td>
                    <td><input className="form-control" onChange={this.handleChange} value={this.state.inputText}/></td>
                    <td><button className="btn btn-primary" onClick={this.handleSave}>Save</button></td>
                    <td><button className="btn btn-warning" onClick={this.handleCancel}>Cancel</button></td>
                </tr>
            );
        }
    }
}
module.exports = Messages;