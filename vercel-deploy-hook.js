// This file can be used to trigger a deployment from the Vercel dashboard
// To use it, create a Deploy Hook in the Vercel dashboard and use it with this script

const https = require('https');

// Replace this with your actual deploy hook URL from Vercel
const deployHookUrl = 'https://api.vercel.com/v1/integrations/deploy/prj_YOUR_PROJECT_ID/DEPLOY_HOOK_TOKEN';

// Make a POST request to the deploy hook URL
const req = https.request(deployHookUrl, {
  method: 'POST',
}, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

// End the request
req.end();

console.log('Deploy hook triggered. Check the Vercel dashboard for deployment status.');