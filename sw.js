var C='adhkar-v1',F='adhkar-fonts';
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(['./','index.html','manifest.json','icon-192.png','icon-512.png'])}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!=C&&x!=F}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!='GET')return;var u=new URL(r.url);
if(/fonts\.(googleapis|gstatic)\.com/.test(u.host)){e.respondWith(caches.open(F).then(function(c){return c.match(r).then(function(m){var f=fetch(r).then(function(n){c.put(r,n.clone());return n}).catch(function(){return m});return m||f})}));return}
if(u.origin!=location.origin)return;
if(r.mode=='navigate'){e.respondWith(fetch(r).then(function(n){var k=n.clone();caches.open(C).then(function(c){c.put('index.html',k)});return n}).catch(function(){return caches.match('index.html')}));return}
e.respondWith(caches.match(r).then(function(m){return m||fetch(r)}))});
