const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    fs.readFile(
        path.join(__dirname, 'index.html'),
        'utf8',
        (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server Error');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    );
});

server.listen(8080, () => {
    console.log('Server running at http://localhost:8080');
});