import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import 'firebase/firestore';

@Injectable()
export class DatabaseProvider {


  private _DB : any;


  constructor(public http: HttpClient) {
    this._DB = firebase.firestore();
  }
  createAndPopulateDocument(
  collectionObj : string,
  docID         : string,
  dataObj       : any) : Promise<any>
  {
    return new Promise((resolve, reject) =>
    {
      this._DB
      .collection(collectionObj)
      .doc(docID)
      .set(dataObj, { merge: true })
      .then((data : any) =>
      {
        resolve(data);
      })
      .catch((error : any) =>
      {
        reject(error);
      });
    });
  }



  getDocuments(collectionObj : string) : Promise<any>
  {
     return new Promise((resolve, reject) =>
     {
        this._DB.collection(collectionObj)
        .get()
        .then((querySnapshot) =>
        {

           let obj : any = [];



           querySnapshot
           .forEach((doc : any) =>
           {
               obj.push({
                  id             : doc.id,
                  city           : doc.data().city,
                  population     : doc.data().population,
                  established    : doc.data().established
               });
           });



           resolve(obj);
        })
        .catch((error : any) =>
        {
           reject(error);
        });
     });
  }

addDocument(collectionObj : string,
             dataObj       : any) : Promise<any>
   {
      return new Promise((resolve, reject) =>
      {
         this._DB.collection(collectionObj).add(dataObj)
         .then((obj : any) =>
         {
            resolve(obj);
         })
         .catch((error : any) =>
         {
            reject(error);
         });
      });
   }


      deleteDocument(collectionObj : string,
                docID         : string) : Promise<any>
   {
      return new Promise((resolve, reject) =>
      {
         this._DB
         .collection(collectionObj)
         .doc(docID)
         .delete()
         .then((obj : any) =>
         {
            resolve(obj);
         })
         .catch((error : any) =>
         {
            reject(error);
         });
      });
   }



  updateDocument(collectionObj : string,
                docID         : string,
                dataObj       : any) : Promise<any>
   {
      return new Promise((resolve, reject) =>
      {
         this._DB
         .collection(collectionObj)
         .doc(docID)
         .update(dataObj)
         .then((obj : any) =>
         {
            resolve(obj);
         })
         .catch((error : any) =>
         {
            reject(error);
         });
      });
   }



}
