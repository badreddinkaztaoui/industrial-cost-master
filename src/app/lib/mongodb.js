import { MongoClient } from 'mongodb';

// Connection URI - in a real app, this would be in an environment variable
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/industrial-cost-master';

// Create a new MongoClient
const client = new MongoClient(uri);
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise
export default clientPromise;

/**
 * Get a database instance
 * @returns {Promise<Db>} MongoDB database instance
 */
export async function getDatabase() {
  const client = await clientPromise;
  return client.db();
}

/**
 * Get a collection from the database
 * @param {string} collectionName - Name of the collection
 * @returns {Promise<Collection>} MongoDB collection
 */
export async function getCollection(collectionName) {
  const db = await getDatabase();
  return db.collection(collectionName);
}

/**
 * Initialize the database with sample data if it's empty
 */
export async function initializeDatabase() {
  try {
    const db = await getDatabase();
    
    // Check if collections exist and have data
    const collections = ['projects', 'costs', 'users', 'reports', 'discussions', 'approvals'];
    
    for (const collectionName of collections) {
      const collection = db.collection(collectionName);
      const count = await collection.countDocuments();
      
      if (count === 0) {
        console.log(`Initializing ${collectionName} collection with sample data...`);
        
        // Import sample data based on collection name
        // In a real app, you would have separate files for each sample data set
        let sampleData;
        
        switch (collectionName) {
          case 'projects':
            sampleData = [
              // Sample project data would be here
            ];
            break;
          case 'costs':
            sampleData = [
              // Sample cost data would be here
            ];
            break;
          // Add cases for other collections
          default:
            sampleData = [];
        }
        
        if (sampleData.length > 0) {
          await collection.insertMany(sampleData);
          console.log(`${collectionName} collection initialized with ${sampleData.length} documents`);
        }
      }
    }
    
    console.log('Database initialization complete');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}
