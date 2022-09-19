const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    event_id:{type: Schema.Types.ObjectId, ref: 'Event'},
    people_going:[{
        user_id:{type: Schema.Types.ObjectId, ref: 'User'},
    }],
    people_interested:[{
        user_id:{type: Schema.Types.ObjectId, ref: 'User'},
    }]
  }
);

//Export model
module.exports = mongoose.model('Event', EventSchema);