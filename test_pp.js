const https = require('https');
const cId = 'AcvNC9_9Yq5O2Kppm2dGcj3f_DOX7Ik4u-UX-Mtwp_s0dj9VocWSFufN_O8zn3nd1ubB-Y8C_kIbvB_T';
const cSec = 'EKAt_WEh5poKmtVcnzxQVtaDGYw7YYQa-4YAJTUuQORPdikV9WOgKJoAUfSXMCL-RzVEBme3hPVq5m5C';

function test(hostname) {
    return new Promise(resolve => {
        const auth = Buffer.from(cId + ':' + cSec).toString('base64');
        const data = 'grant_type=client_credentials';
        const req = https.request({
            hostname, port: 443, path: '/v1/oauth2/token', method: 'POST',
            headers: { 'Authorization': 'Basic ' + auth, 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': data.length }
        }, res => {
            let d = '';
            res.on('data', c => d += c);
            res.on('end', () => resolve(JSON.parse(d)));
        });
        req.write(data); req.end();
    });
}

(async () => {
    const live = await test('api-m.paypal.com');
    console.log('LIVE:', live.error ? live.error : 'SUCCESS');

    const sandbox = await test('api-m.sandbox.paypal.com');
    console.log('SANDBOX:', sandbox.error ? sandbox.error : 'SUCCESS');
})();
