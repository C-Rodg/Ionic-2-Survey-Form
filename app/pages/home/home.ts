import {Page} from 'ionic-angular';
import {HeaderImage} from '../header/header';
import {Survey} from '../survey/survey';

@Page({
  directives: [HeaderImage, Survey],
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {
  private organization : string = "Test Survey";
  
  constructor() {}

}
