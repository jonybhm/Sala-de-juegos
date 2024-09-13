import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"sala-de-juegos-e948c","appId":"1:41343813315:web:ab595a1a06f6026f46c476","storageBucket":"sala-de-juegos-e948c.appspot.com","apiKey":"AIzaSyB7oRMR1Xg2NZ4YLthfyQxMzQjJYBkczdw","authDomain":"sala-de-juegos-e948c.firebaseapp.com","messagingSenderId":"41343813315"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideStorage(() => getStorage())]
};
