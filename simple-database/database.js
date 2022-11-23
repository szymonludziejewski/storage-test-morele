const fs = require('fs');

const getDatabaseSize = () => {
  const stats = fs.statSync('./simple-database/database.json');
  return stats.size / (1024 * 1024);
}

const getDatabaseJSON = () => {
  try {
    let rawdata = fs.readFileSync('./simple-database/database.json');
    let database = {
      size: `${getDatabaseSize()}MB`,
      // data: JSON.parse(rawdata)
    }
    return database;
  } catch (error) {
    console.error(error);
  }
};

const saveDatabaseJSON = (jsonObject) => {
  try {
    let data = JSON.stringify(jsonObject);
    fs.writeFileSync('./simple-database/database.json', data);
  } catch (error) {
    console.error(error);
  }
};

const databaseFunctions = {
  addData: (endpointName, resourceID, resourceObject) => {
    const database = getDatabaseJSON();
    if (!database) {
      return;
    }
    if (!database[endpointName]) {
      database[endpointName] = {};
    }
    if (!database[endpointName][resourceID]) {
      database[endpointName][resourceID] = resourceObject;
    }
    saveDatabaseJSON(database);
  },
  updateData: (endpointName, resourceID, resourceObject) => {
    const database = getDatabaseJSON();
    if (!database) {
      return;
    }
    if (!database[endpointName] || !database[endpointName][resourceID]) {
      console.error('No such a resource! Cannot update');
      return;
    }
    database[endpointName][resourceID] = {
      ...database[endpointName][resourceID],
      ...resourceObject,
    };
    saveDatabaseJSON(database);
  },
  readData: (endpointName, resourceID) => {
    const database = getDatabaseJSON();
    if (!database) {
      return;
    }
    if (!resourceID && database[endpointName]) {
      return database[endpointName];
    }
    if (!database[endpointName] || !database[endpointName][resourceID]) {
      console.error('No such a resource! Cannot read');
      return;
    }
    return database[endpointName][resourceID];
  },
  deleteData: (endpointName, resourceID) => {
    const database = getDatabaseJSON();
    if (!database) {
      return;
    }
    if (!database[endpointName] || !database[endpointName][resourceID]) {
      console.error('No such a resource! Cannot delete');
      return;
    }
    database[endpointName][resourceID] = undefined;
    saveDatabaseJSON(database);
  },
};

module.exports = databaseFunctions;
