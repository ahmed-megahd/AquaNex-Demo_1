// // src/app/firestore.service.ts
// import { Injectable, inject } from '@angular/core';
// import {
//   Firestore,
//   collection,
//   collectionSnapshots,
//   doc,
//   addDoc,
//   updateDoc,
//   deleteDoc,
//   docSnapshots,
//   query, // If you need filtering/ordering
//   orderBy, // Example for query
// } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class FirestoreService {
//   private firestore = inject(Firestore); // This should now work!

//   // ✅ Create
//   addItem(collectionName: string, data: any): Promise<any> {
//     const colRef = collection(this.firestore, collectionName);
//     return addDoc(colRef, data);
//   }

//   // ✅ Read all
//   getItems(collectionName: string): Observable<any[]> {
//     const colRef = collection(this.firestore, collectionName);
//     return collectionSnapshots(colRef).pipe(
//       map((snapshots) =>
//         snapshots.map((snap) => ({
//           id: snap.id,
//           ...snap.data(),
//         }))
//       )
//     );
//   }

//   // ✅ Read one
//   getItemById(collectionName: string, id: string): Observable<any> {
//     const docRef = doc(this.firestore, collectionName, id);
//     return docSnapshots(docRef).pipe(
//       map((snap) => {
//         if (snap.exists()) {
//           return {
//             id: snap.id,
//             ...snap.data(),
//           };
//         } else {
//           return undefined; // Or handle as an error/empty case
//         }
//       })
//     );
//   }

//   // ✅ Update
//   updateItem(collectionName: string, id: string, data: any): Promise<void> {
//     const docRef = doc(this.firestore, collectionName, id);
//     return updateDoc(docRef, data);
//   }

//   // ✅ Delete
//   deleteItem(collectionName: string, id: string): Promise<void> {
//     const docRef = doc(this.firestore, collectionName, id);
//     return deleteDoc(docRef);
//   }
// }

// import { Injectable, inject } from '@angular/core';
// import {
//   Firestore,
//   collection,
//   collectionData,
//   doc,
//   addDoc,
//   updateDoc,
//   deleteDoc,
//   docData,
// } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class FirestoreService {
//   private firestore = inject(Firestore);

//   // ✅ Create
//   addItem(collectionName: string, data: any) {
//     const colRef = collection(this.firestore, collectionName);
//     return addDoc(colRef, data);
//   }

//   // ✅ Read all
//   getItems(collectionName: string): Observable<any[]> {
//     const colRef = collection(this.firestore, collectionName);
//     return collectionData(colRef, { idField: 'id' });
//   }

//   // ✅ Read one
//   getItemById(collectionName: string, id: string): Observable<any> {
//     const docRef = doc(this.firestore, `${collectionName}/${id}`);
//     return docData(docRef, { idField: 'id' });
//   }

//   // ✅ Update
//   updateItem(collectionName: string, id: string, data: any) {
//     const docRef = doc(this.firestore, `${collectionName}/${id}`);
//     return updateDoc(docRef, data);
//   }

//   // ✅ Delete
//   deleteItem(collectionName: string, id: string) {
//     const docRef = doc(this.firestore, `${collectionName}/${id}`);
//     return deleteDoc(docRef);
//   }
// }

import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  onSnapshot,
  query,
  QueryConstraint,
  DocumentReference,
  CollectionReference,
  Unsubscribe,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private firestore = inject(Firestore);

  // ✅ Create
  addItem(collectionName: string, data: any): Promise<DocumentReference> {
    const colRef = collection(this.firestore, collectionName);
    return addDoc(colRef, data);
  }

  // ✅ Read all items (Real-time Observable)
  getItems(
    collectionName: string,
    ...queryConstraints: QueryConstraint[]
  ): Observable<any[]> {
    return new Observable((observer) => {
      const colRef = collection(this.firestore, collectionName);
      const q =
        queryConstraints.length > 0
          ? query(colRef, ...queryConstraints)
          : colRef;

      const unsubscribe: Unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const items = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          observer.next(items);
        },
        (error) => {
          observer.error(error);
        }
      );

      // Cleanup function
      return () => unsubscribe();
    });
  }

  // ✅ Read all items once (Promise-based, no real-time)
  async getItemsOnce(
    collectionName: string,
    ...queryConstraints: QueryConstraint[]
  ): Promise<any[]> {
    const colRef = collection(this.firestore, collectionName);
    const q =
      queryConstraints.length > 0 ? query(colRef, ...queryConstraints) : colRef;

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  // ✅ Read one item (Real-time Observable)
  getItemById(collectionName: string, id: string): Observable<any> {
    return new Observable((observer) => {
      const docRef = doc(this.firestore, `${collectionName}/${id}`);

      const unsubscribe: Unsubscribe = onSnapshot(
        docRef,
        (snapshot) => {
          if (snapshot.exists()) {
            observer.next({
              id: snapshot.id,
              ...snapshot.data(),
            });
          } else {
            observer.next(null);
          }
        },
        (error) => {
          observer.error(error);
        }
      );

      // Cleanup function
      return () => unsubscribe();
    });
  }

  // ✅ Read one item once (Promise-based, no real-time)
  async getItemByIdOnce(
    collectionName: string,
    id: string
  ): Promise<any | null> {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return {
        id: snapshot.id,
        ...snapshot.data(),
      };
    }
    return null;
  }

  // ✅ Update
  updateItem(collectionName: string, id: string, data: any): Promise<void> {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    return updateDoc(docRef, data);
  }

  // ✅ Delete
  deleteItem(collectionName: string, id: string): Promise<void> {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    return deleteDoc(docRef);
  }

  // ✅ Get collection reference (useful for advanced queries)
  getCollectionRef(collectionName: string): CollectionReference {
    return collection(this.firestore, collectionName);
  }

  // ✅ Get document reference (useful for advanced operations)
  getDocRef(collectionName: string, id: string) {
    return doc(this.firestore, `${collectionName}/${id}`);
  }
}
