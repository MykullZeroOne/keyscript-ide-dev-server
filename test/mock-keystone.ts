import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 8443;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Mock Login
app.post('/:instance/UserLogin', (req, res) => {
  const { instance } = req.params;
  console.log(`[Mock Keystone] Login request for instance: ${instance}`);
  res.setHeader('set-cookie', [`JSESSIONID=mock-session-id; Path=/${instance}; Secure; HttpOnly`]);
  res.json({ JSESSIONID: 'mock-session-id', success: true });
});

// Mock SessionStore
app.post('/:instance/SessionStore', (req, res) => {
  const { instance } = req.params;
  const { key, value } = req.body;
  console.log(`[Mock Keystone] SessionStore for ${instance}: ${key} = ${value}`);
  res.json({ success: true, id: 'mock-uuid-123' });
});

// Mock DirectXMLPostJSON
app.post('/:instance/DirectXMLPostJSON', (req, res) => {
  const { instance } = req.params;
  console.log(`[Mock Keystone] DirectXMLPostJSON for ${instance}`);
  res.json({
    query: {
      sequence: [{
        transaction: [{
          $attr: { result: 'posted' },
          step: [{
            record: {
              tableName: 'ENV',
              field: [{ columnName: 'POSTING_DATE', newContents: '2026-03-05' }]
            }
          }]
        }]
      }]
    }
  });
});

app.listen(port, () => {
  console.log(`Mock Keystone server listening at http://localhost:${port}`);
});
