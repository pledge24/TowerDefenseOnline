import pools from '../../db/database.js';
import { testAllConnections } from '../../utils/db/testConnection.js';

const initServer = async () => {
  try {
    await testAllConnections(pools);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default initServer;
