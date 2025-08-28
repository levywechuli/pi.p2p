// Simple API testing script
const http = require('http');

const BASE_URL = 'http://localhost:3001';

function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonBody = JSON.parse(body);
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: jsonBody
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: body
          });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

async function testAPI() {
  console.log('🧪 Testing Pi Network Backend API...\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing health check...');
    const health = await makeRequest('/health');
    console.log(`   Status: ${health.status} ${health.status === 200 ? '✅' : '❌'}`);
    console.log(`   Response: ${JSON.stringify(health.body, null, 2)}\n`);

    // Test 2: Send a message
    console.log('2. Testing message creation...');
    const message = await makeRequest('/api/messages', 'POST', {
      message: 'This is a test message from the API testing script',
      userIdentifier: 'test_user_' + Date.now()
    });
    console.log(`   Status: ${message.status} ${message.status === 201 ? '✅' : '❌'}`);
    console.log(`   Response: ${JSON.stringify(message.body, null, 2)}\n`);

    // Test 3: Get messages
    console.log('3. Testing message retrieval...');
    const messages = await makeRequest('/api/messages');
    console.log(`   Status: ${messages.status} ${messages.status === 200 ? '✅' : '❌'}`);
    console.log(`   Message count: ${messages.body.data?.messages?.length || 0}\n`);

    // Test 4: Get message count
    console.log('4. Testing message count...');
    const count = await makeRequest('/api/messages/count');
    console.log(`   Status: ${count.status} ${count.status === 200 ? '✅' : '❌'}`);
    console.log(`   Response: ${JSON.stringify(count.body, null, 2)}\n`);

    // Test 5: Admin dashboard
    console.log('5. Testing admin dashboard...');
    const dashboard = await makeRequest('/api/admin/dashboard');
    console.log(`   Status: ${dashboard.status} ${dashboard.status === 200 ? '✅' : '❌'}`);
    console.log(`   Total messages: ${dashboard.body.data?.stats?.totalMessages || 0}\n`);

    console.log('🎉 API testing completed!');

  } catch (error) {
    console.error('❌ API testing failed:', error.message);
  }
}

// Check if server is running before testing
async function checkServer() {
  try {
    await makeRequest('/health');
    testAPI();
  } catch (error) {
    console.log('❌ Server is not running!');
    console.log('💡 Please start the server with: npm run dev');
  }
}

checkServer();
