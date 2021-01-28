import { createConnection, getConnectionOptions } from 'typeorm';

import app from './app';

const setUpConnection = async () => {
  const connectionOptions = await getConnectionOptions();
  await createConnection(connectionOptions);
  console.log('TypeORM is connected with Db!');
};

setUpConnection();

const server = app.listen(app.get('port'), () => {
  console.log('App is running on http://localhost:%d in %s mode', app.get('port'), app.get('env'));
});

export default server;
