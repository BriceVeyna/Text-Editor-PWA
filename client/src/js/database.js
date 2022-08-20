import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  console.log('Post to the database');
  const textEditorDb = await openDB('text', 1);
  const tx = textEditorDb.transaction('text', 'readwrite');
  const store = tx.objectStore('text');
  const request = store.add({ text: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

export const getDb = async () => {
  console.log('GET from the database');
  const textEditorDb = await openDB('text', 1);
  const tx = textEditorDb.transaction('text', 'readonly');
  const store = tx.objectStore('text');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
