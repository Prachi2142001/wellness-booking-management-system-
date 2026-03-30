const fs = require('fs');

const path = 'C:\\Users\\Lenovo\\.gemini\\antigravity\\brain\\9f3d457f-a6a2-47bb-9f0d-3220b4b42737\\.system_generated\\steps\\385\\content.md';
const content = fs.readFileSync(path, 'utf8');

const jsonLine = content.split('\n')[4];
const data = JSON.parse(jsonLine);

function findRequest(name, items) {
  for (const item of items) {
    if (item.name === name && item.request) return item.request;
    if (item.item) {
      const res = findRequest(name, item.item);
      if (res) return res;
    }
  }
}

const loginReq = findRequest('Login', data.collection.item);
const therapistFolder = data.collection.item.find(i => i.name === 'Therapist');
const tList = therapistFolder ? therapistFolder.item.find(i => i.name === 'List') : null;

fs.writeFileSync('out.json', JSON.stringify({
  collectionAuth: data.collection.auth,
  loginReq: loginReq,
  therapistsReq: tList ? tList.request : null
}, null, 2), 'utf8');
