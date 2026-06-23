exports.handler = async function(event) {
if (event.httpMethod !== 'POST') {
return { statusCode: 405, body: 'Method Not Allowed' };
}

try {
const body = JSON.parse(event.body);
const phone = body.phone;const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

const message = `Hi! Thanks for your visit. We'd love your feedback — please leave us a quick Google review here: https://share.google/L9aJ4LlDWsQAjLFYA Reply STOP to opt out. Msg & data rates may apply.`;const response = await fetch(
`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
{
method: 'POST',
headers: {
'Authorization': 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
'Content-Type': 'application/x-www-form-urlencoded',
},
body: new URLSearchParams({
To: phone,
From: fromNumber,
Body: message,
}).toString(),
}
);const data = await response.json();

if (data.sid) {
return { statusCode: 200, body: JSON.stringify({ success: true }) };
} else {
return { statusCode: 500, body: JSON.stringify({ error: data.message }) };
}
} catch (err) {
return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
}
};
