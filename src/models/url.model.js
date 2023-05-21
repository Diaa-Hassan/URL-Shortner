import mongoose from 'mongoose';

const UrlSchema = new mongoose.Schema(
	{
		slug: {
			type: String,
			required: true,
			unique: true
		},
		orignUrl: {
			type: String,
			required: true
		},
		shortUrl: {
			ios: {
				type: String
			},
			android: {
				type: String
			},
			web: {
				type: String
			}
		}
	},
	{
		toJSON: {
			transform(doc, ret) {
				delete ret.__v;
				delete ret._id;
			}
		}
	}
);

const URL = mongoose.model('URL', UrlSchema);

export { URL };
