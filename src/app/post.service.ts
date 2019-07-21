import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders,HttpParams,HttpEventType} from '@angular/common/http';
import {map,catchError,tap} from "rxjs/operators";
import{Subject,throwError} from 'rxjs';

import{Post} from './post.model';



@Injectable({
  providedIn: 'root'
})
export class PostService {

 error=new Subject<string>(); 
  createAndStorePosts(title:string,content:string){
    const postData:Post[]={title:title,content:content};
    this.http.post<{name:string}>('https://angularinterceptors.firebaseio.com/posts.json',postData,{
      observe:'response',
      responseType:'json'
    })
    .subscribe(responseData=>{
      console.log(responseData);
    },error=>{
    this.error.next(error.message)}//using subject to handle error
  );

  }
  fetchPosts(){
    //to set multiple params
    let searachParams=new HttpParams();
    searachParams=searachParams.append('print','pretty');
    searachParams=searachParams.append('custom','key');
   return this.http.get<{[key:string]:Post}>("https://angularinterceptors.firebaseio.com/posts.json",
   {//setting headers
     headers:new HttpHeaders({"Custom-Header":'hello'}),
     //setting params
    //  params: new HttpParams().set('print','pretty')
//to set multiple params
params:searachParams
   })
    .pipe(map((responsedata)=>{
      const postArray:Post[]=[];
      for(const key in responsedata){
        if(responsedata.hasOwnProperty(key)){
        postArray.push({...responsedata[key],id:key})
        }
      }
      return postArray;
    }),
    //handling error with catch error
    catchError(errorRes=>{
      //send to analytics server
      return  throwError(errorRes)
    })
  )
  }
deletePosts(){
  return this.http.delete('https://angularinterceptors.firebaseio.com/posts.json',{
    observe:'events',
    responseType:'text'
  }).pipe(tap(event=>{
    console.log(event);
    if(event.type===HttpEventType.Sent){
      // console.log('req sent')
      console.log(event.type)

    }
    if(event.type===HttpEventType.Response){
      console.log(event.body);
    }
  }))
}
  constructor(private http:HttpClient) { }
}
