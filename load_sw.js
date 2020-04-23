if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
          loadOk = true;
          console.log("loadOk=" + loadOk);
        navigator.serviceWorker.register('flutter_service_worker.js').then(function(reg){
          console.log("Service worker has been registered for scope: " + reg.scope);
        });
      });
    }
