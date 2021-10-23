export const databaseFactory = async () => ({
  uri: process.env.MONGODB_URI,
});
