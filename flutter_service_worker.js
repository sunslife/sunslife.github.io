'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "index.html": "dc5de0cd922edb95b8055e014ec7924c",
"/": "dc5de0cd922edb95b8055e014ec7924c",
"images/01.jpg": "e5b27b172896d81efb1d5840b74b3b1f",
"images/02.jpg": "3a087beeba149d64187ef150b8aeb388",
"main.dart.js": "d0335054df59d89144c3366664034d58",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "60f7806565e4ecb0fb5538b67eb6a86d",
"assets/LICENSE": "a82ccb7b8585e33366ec5b4ec2022f7a",
"assets/AssetManifest.json": "2efbb41d7877d10aac9d091f58ccd7b9",
"assets/FontManifest.json": "01700ba55b08a6141f33e168c4a6c22f",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16"
};
const RESOURCES2 = {
"images/03.jpg": "92316bc96cba9c246186558ddebe9f63"
};

self.importScripts("load_sw.js");
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      console.log("sw adding RESOURCES..."); //it will throw exception "Uncaught (in promise) TypeError: Request failed".
      return cache.addAll(Object.keys(RESOURCES).concat(Object.keys(RESOURCES2)));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }        
        console.log("sw fetching" + event.request.url );
        return fetch(event.request);
      })
  );
});
