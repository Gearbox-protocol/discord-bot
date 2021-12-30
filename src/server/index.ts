import http from 'http';
import { Client } from 'discord.js';
import { App } from 'src/app';

const handleStatus =
  ({ app, client }: InitServerProps) =>
  async (res: http.ServerResponse) => {
    try {
      app.logger.debug('Got status request');

      const dbOk = await app.db.isReady();
      const botOk = client.isReady();

      const json = JSON.stringify({ dbOk, botOk });

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(json);
    } catch (e) {
      app.logger.debug(e, 'Request handler error');
      res.writeHead(500);
      res.end({ dbOk: false, botOk: false });
    }
  };

interface InitServerProps {
  client: Client;
  app: App;
}

const initServer = (props: InitServerProps) => {
  const server = http.createServer();

  server.on('request', (req, res) => {
    if (req.url === '/status') {
      handleStatus(props)(res);
    }
  });

  return server;
};

export { initServer };
