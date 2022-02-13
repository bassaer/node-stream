import fs from 'fs';
import http from 'http';
import net from 'net';

const src = fs.createReadStream('./data/in.txt', 'utf8');
const dst = fs.createWriteStream('./data/out.txt', 'utf8');

src.pipe(dst);

const server = http.createServer((req, res) => {
    res.end("OK");
});

const port = 3000;
server.listen(port, () => {
    console.log(`start: http://localhost:${port}`);

    const res = fs.createWriteStream('./data/res.txt', 'utf8');
    const client = net.connect(port, 'localhost');
    client.pipe(res);
    client.once('connect', () => client.write('GET / HTTP/1.1\r\n\r\n'));
    client.on('close', () => server.close());
});