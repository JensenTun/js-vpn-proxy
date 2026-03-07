const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors()); // Flutter App ကနေ လှမ်းခေါ်ရင် Block မဖြစ်အောင်

// ၁။ ဆာဗာ အလုပ်လုပ်မလုပ် စစ်ဆေးရန် (Browser မှာ http://localhost:3000 နဲ့ ကြည့်နိုင်တယ်)
app.get('/', (req, res) => {
    res.send('<h1>JS VPN Proxy Server is Running!</h1><p>Use <b>/api/vpngate</b> to get server list.</p>');
});

// ၂။ VPN Gate ဆီက Data ဆွဲမယ့် API
// index.js ထဲက api/vpngate နေရာမှာ ဒီလို ပြောင်းကြည့်ပါ

app.get('/api/vpngate', async (req, res) => {
    try {
        // နာမည် (vpngate.net) အစား နံပါတ် (IP) နဲ့ တိုက်ရိုက် ခေါ်ကြည့်မယ်
        const MIRROR_IP = 'http://130.158.6.83/api/iphone/';

        const response = await axios.get(MIRROR_IP, {
            timeout: 20000,
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });

        res.setHeader('Content-Type', 'text/plain');
        res.send(response.data);

    } catch (error) {
        res.status(500).send("Error: " + error.message);
    }
});

// Port သတ်မှတ်ခြင်း (Render.com တို့မှာ တင်ရင် အလိုအလျောက် Port ယူလိမ့်မယ်)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});