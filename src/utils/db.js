// db.js
import { openDB } from 'idb';

const DB_NAME = 'lms-offline-db';
const DB_VERSION = 1;

export async function initDB() {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Lesson content store
      if (!db.objectStoreNames.contains('lessons')) {
        db.createObjectStore('lessons', { keyPath: 'id' });
      }
      
      // Pending progress store
      if (!db.objectStoreNames.contains('pendingProgress')) {
        db.createObjectStore('pendingProgress', { 
          keyPath: 'id',
          autoIncrement: true 
        });
      }
      
      // Course progress store
      if (!db.objectStoreNames.contains('courseProgress')) {
        const store = db.createObjectStore('courseProgress', { 
          keyPath: ['courseId', 'userId'] 
        });
        store.createIndex('byUser', 'userId');
      }
    }
  });
  return db;
}

export async function saveLesson(lesson) {
  const db = await initDB();
  await db.put('lessons', {
    id: lesson._id,
    data: lesson,
    timestamp: Date.now()
  });
}

export async function getLesson(lessonId) {
  const db = await initDB();
  return await db.get('lessons', lessonId);
}

export async function savePendingProgress(progressData, token) {
  const db = await initDB();
  await db.add('pendingProgress', {
    data: progressData,
    token,
    timestamp: Date.now()
  });
}

export async function updateCourseProgress(courseId, userId, progress) {
  const db = await initDB();
  await db.put('courseProgress', {
    courseId,
    userId,
    progress,
    lastUpdated: Date.now()
  });
}

export async function getCourseProgress(courseId, userId) {
  const db = await initDB();
  return await db.get('courseProgress', [courseId, userId]);
}

export async function getAllUserProgress(userId) {
  const db = await initDB();
  const index = db.transaction('courseProgress').store.index('byUser');
  return await index.getAll(userId);
}
