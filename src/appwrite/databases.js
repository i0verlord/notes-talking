import { databases, collections } from "./config";
import { ID } from "appwrite";
 
const db = {};
 
collections.forEach((collection) => {
  db[collection.name] = {
    create: async (payload, id = ID.unique()) => {
      console.log(`db.${collection.name}.create`, { payload, id });
      try {
        const res = await databases.createDocument(
          collection.dbId,
          collection.id,
          id,
          payload
        );
        console.log(`db.${collection.name}.create.success`, res);
        return res;
      } catch (err) {
        console.error(`db.${collection.name}.create.error`, err);
        throw err;
      }
    },
    update: async (id, payload) => {
      console.log(`db.${collection.name}.update`, { id, payload });
      try {
        const res = await databases.updateDocument(
          collection.dbId,
          collection.id,
          id,
          payload
        );
        console.log(`db.${collection.name}.update.success`, res);
        return res;
      } catch (err) {
        console.error(`db.${collection.name}.update.error`, err);
        throw err;
      }
    },
    delete: async (id) => {
      console.log(`db.${collection.name}.delete`, { id });
      try {
        const res = await databases.deleteDocument(
          collection.dbId,
          collection.id,
          id
        );
        console.log(`db.${collection.name}.delete.success`, res);
        return res;
      } catch (err) {
        console.error(`db.${collection.name}.delete.error`, err);
        throw err;
      }
    },
    get: async (id) => {
      console.log(`db.${collection.name}.get`, { id });
      try {
        const res = await databases.getDocument(
          collection.dbId,
          collection.id,
          id
        );
        console.log(`db.${collection.name}.get.success`, res);
        return res;
      } catch (err) {
        console.error(`db.${collection.name}.get.error`, err);
        throw err;
      }
    },
    list: async (queries) => {
      console.log(`db.${collection.name}.list`, { queries });
      try {
        const res = await databases.listDocuments(
          collection.dbId,
          collection.id,
          queries
        );
        console.log(`db.${collection.name}.list.success`, res);
        return res;
      } catch (err) {
        console.error(`db.${collection.name}.list.error`, err);
        throw err;
      }
    },
  };
});
 
export { db };