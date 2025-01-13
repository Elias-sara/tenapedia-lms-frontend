// service-worker.js
const CACHE_NAME = 'lms-cache-v1';
const LESSON_CACHE = 'lesson-cache-v1';

// Files to cache
const urlsToCache = [
  '/',
  '/offline.html',
  '/static/styles/main.css',
  '/static/js/main.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/students/lessons/')) {
    event.respondWith(
      caches.open(LESSON_CACHE)
        .then(cache => 
          cache.match(event.request)
            .then(response => {
              const fetchPromise = fetch(event.request)
                .then(networkResponse => {
                  cache.put(event.request, networkResponse.clone());
                  return networkResponse;
                })
                .catch(() => {
                  console.log('Serving from cache:', event.request.url);
                  return response;
                });
              return response || fetchPromise;
            })
        )
    );
  } else {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
        .catch(() => caches.match('/offline.html'))
    );
  }
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-progress') {
    event.waitUntil(syncProgress());
  }
});

async function syncProgress() {
  const db = await openDB();
  const pendingProgress = await db.getAll('pendingProgress');
  
  for (const progress of pendingProgress) {
    try {
      await fetch('/api/students/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${progress.token}`
        },
        body: JSON.stringify(progress.data)
      });
      await db.delete('pendingProgress', progress.id);
    } catch (error) {
      console.error('Error syncing progress:', error);
    }
  }
}
