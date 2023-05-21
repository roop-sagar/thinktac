import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private firestore: Firestore
  ) { }

  addEmp(data: any) {
    const collectionInstance = collection(this.firestore, 'Employees');
    return addDoc(collectionInstance, data).then(() => {
      console.log('Added');
    })
  }

  getEmpData(): Observable<any> {
    const collectionInstance = collection(this.firestore, 'Employees');
    return collectionData(collectionInstance, { idField: 'id' }).pipe(
      map((res: any) => {
        return res
      })
    )
  }

  updateEmp(data: any, id: string) {
    const docInstance = doc(this.firestore, 'Employees', id);
    updateDoc(docInstance, data).then(() => {
      console.log('Updated');
    })
  }

  deleteEmp(id: string) {
    const docInstance = doc(this.firestore, 'Employees', id);
    deleteDoc(docInstance).then(() => {
      console.log('deleted');
    })
  }
}
