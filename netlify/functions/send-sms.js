const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

exports.handler = async function(event) {
if (event.httpMethod !== 'POST') {
return { statusCode: 405, body: 'Method Not Allowed' };
}
  const response = await fetch(
`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
{
method: 'POST',
headers: {
'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`),
'Content-Type': 'application/x-www-form-urlencoded',
},
body: new URLSearchParams({
To: phone,
From: fromNumber,
Body: message,
}),
}
);

const data = await response.json();

if (data.sid) {
return { statusCode: 200, body: JSON.stringify({ success: true }) };
} else {
return { statusCode: 500, body: JSON.stringify({ error: data.message }) };
}
};
