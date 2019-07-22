import { Component ,OnInit,ViewChild,OnDestroy} from '@angular/core';
import{NgForm} from '@angular/forms';
import{HttpClient} from '@angular/common/http';
import {map} from "rxjs/operators";
import{Subscription} from 'rxjs';
import{Post} from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  // @ViewChild('f') postData:NgForm;
  
  loadedPosts=[];
  isfetching=false;
  error=null;
  private errrorSub:Subscription;
  constructor(private http:HttpClient,private postservice:PostService){}
  ngOnInit(){
    this.errrorSub=this.postservice.error.subscribe(errorMessage=>{this.error=errorMessage});
    this.isfetching=true;
    this.postservice.fetchPosts().subscribe(posts=>{
      this.isfetching=false;
      this.loadedPosts=posts;
      console.log(posts);
    },error=>{
      this.isfetching=false;
      this.error=error.message;
     console.log(this.error) 
    })

  }
  onCreatePost(postData: { title: string; content: string }){
    console.log(postData);
   this.postservice.createAndStorePosts(postData.title,postData.content);

      
  }
  onFetchPosts(){
    this.isfetching=true;
    this.postservice.fetchPosts().subscribe(posts=>{
      this.isfetching=false;
      this.loadedPosts=posts;
  },error=>{
    this.isfetching=false;
    this.error=error.message;
    
  });

}



onHandleError(){
  this.error=null;
}
onClearPosts(){
  this.postservice.deletePosts().subscribe(()=>{
    this.loadedPosts=[];
  });
}
ngOnDestroy(){
  this.errrorSub.unsubscribe();
}
}