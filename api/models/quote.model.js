const mongoose = require('mongoose');
const Schema = require('../config').Schema;

const QuoteSchema = new Schema(
    {
        favqsId: {
            type: Number,
            required: true,
            unique: true,
        },
        quote: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        authorImage: {
            type: String,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

// this is used to remove both _id and _v, returning id instead
QuoteSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
    },
});

module.exports = mongoose.model('Quote', QuoteSchema);
