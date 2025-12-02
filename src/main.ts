import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { mergeApplicationConfig } from '@angular/core';

// ✅ Import Firebase providers directly
// import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// import { provideAuth, getAuth } from '@angular/fire/auth';
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// ✅ Merge Firebase providers with app config
// const firebaseProviders = {
//   providers: [
//     provideFirebaseApp(() => initializeApp(environment.firebase)),
//     provideFirestore(() => getFirestore()),
//     provideAuth(() => getAuth()),
//   ],
// };

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
