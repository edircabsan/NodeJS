const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const EventoSchema = new Schema({
    id: {
        type: String,
        required: 'Enter an event id'
    },
    type: {
        type: String,
    },
    userId: {
        type: String
    },
    sessionId: {
        type: String
    },
    data: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Evento', EventoSchema);