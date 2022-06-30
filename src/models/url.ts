import {Schema, model } from 'mongoose';

// create an interface representing a documnet in mongodb
interface IUrl {
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    date: {
        type: String
    }
}

//create a schema
const UrlSchema = new Schema<IUrl>({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    date: {
        type: String,
        default: Date.now
    }
});

//create a model
export const Url = model<IUrl>('Url', UrlSchema);