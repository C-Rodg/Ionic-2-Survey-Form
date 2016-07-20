import {Injectable} from 'angular2/core';
import {Jsonp, Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SubmitService {
  
  //CHANGE PER EVENT
  guid1: string = '';
  guid2: string = '';
  
  url : string = "https://test.com/JSONSubmitResult.aspx?";
  JSONobject : string = "_JO=JSONP_CALLBACK";
  postString : string = this.url + this.JSONobject + "&" + this.guid1 + "&" + this.guid2;

  constructor(public jsonp : Jsonp) {}

  public submitForm(person){
      let url = this.getURL(person);
      return this.jsonp.request(url)
        .map(res => {
          return res.json();
        });
  }  
  
  private getURL(person){
    let surveyFieldsQuery = "";
      let url = "";
      for(let fieldTag in person){
        if(person.hasOwnProperty(fieldTag)){
          if(person[fieldTag] !== '' && person[fieldTag] !== null && person[fieldTag] !== undefined){
            //Test for Pickone/PickMany
            if(person[fieldTag].constructor === Array){
              for (let i = 0, j = person[fieldTag].length; i < j; i++){
              	if(person[fieldTag][i] !== ''){
              		surveyFieldsQuery += "&" + encodeURIComponent(person[fieldTag][i]) + "=1";
              	}                
              }
            } else {
              surveyFieldsQuery += "&" + fieldTag + "=" + encodeURIComponent(person[fieldTag]);
            }
          }
        }
      }      
      url = this.postString + surveyFieldsQuery + "&_D=X";
      return url;
  }  
}
