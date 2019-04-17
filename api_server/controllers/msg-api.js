const mongoose = require('mongoose');
const messageModel = mongoose.model('message');

//GET Request Handler
const getAllMessagesOrderedByLastPosted = (req, res) => {
    messageModel
    .find()
    .sort({_id: -1})
    .exec((err, messages) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json(messages);
        }
    });
};

const getSingleMessage = (req, res) => {
    if (req.params && req.params.messageid) {
        messageModel
        .findById(req.params.messageid)
        .exec( (err, message) => {
            // error in executing function
            if (err) {
                res.status(400).json(err);
                return;
            }

            // could execute, but didn't find message
            if (!message) {
                res.status(404).json({
                    "api-msg": "messageid not found"
                });
                return;
            }
            // found message
            res.status(200).json(message);
        });
    } else {
        // must have a message id
        res.status(400).json({
            "api-msg": "No messageid in request"
        });
    }
};
// DELETE Request Handler
const deleteSingleMessage = (req, res) => {
    if (req.params && req.params.messageid) {
        messageModel
        .findById(req.params.messageid)
        .exec( (err, message) => {
            // error in executing function
            if (err) {
                res.status(400).json(err);
                return;
            }

            // could execute, but didn't find message
            if (!message) {
                res.status(404).json({
                    "api-msg": "messageid not found"
                });
                return;
            }
            // update message
            message.remove( (err) => {
                // error executing function
                if (err) {
                    return res.status(400).json(err);
                }
                // send a 204 No Content back
                res.status(204).json(null);
            })
        });
    } else {
        // must have a message id
        res.status(400).json({
            "api-msg": "No messageid in request"
        });
    }
};

const deleteAllMessages = (req, res) => {
    messageModel.deleteMany({}, err => {
        if (req.body.name !== "Admin") {
            res.status(403).json(err);
        }
        return res.status(200).send({
            "api-msg": "All messages deleted"
        });
    });
};

// UPDATE Request Handler

const updateSingleMessage = (req, res) => {
    messageModel.findOneAndUpdate({ 
        _id: req.params.messageid }, 
        req.body, (err, msg) => {
            if (req.params.name !== msg.name) {
                res.status(403).json(err);
            } else if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).json({
                "api-msg": "Message updated"
            });
        }
    );
};

// POST Request Handler
const addNewMessage = (req, res) => {
    messageModel.create(req.body, (err,message) => {
        if (err){
            res.status(400).json(err);
        } else {
            res.status(201).json(message);
        }
    });
};

module.exports = {
    getAllMessagesOrderedByLastPosted,
    getSingleMessage,
    deleteSingleMessage,
    deleteAllMessages,
    updateSingleMessage,
    addNewMessage
}