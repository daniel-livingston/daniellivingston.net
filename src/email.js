const isEmail = require("validator/lib/isEmail");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendToMe = (req, res, { name, email, message } = {}) => {
	if (!name || !email || !message) {
		return res.status(400).send();
	}

	if (!isEmail(email)) {
		return res.status(400).send();
	}

	sgMail
		.send({
			to: process.env.EMAIL,
			from: process.env.EMAIL,
			subject: `${name}: Sent email using the contact form on daniellivingston.net`,
			text: message + "\n\nSent from: " + name + " at email address: " + email,
		})
		.then(() => {
			res.send();
		})
		.catch(() => res.status(500).send());
};

module.exports = { sendToMe };
