import {Component} from 'angular2/core';
import { FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl } from 'angular2/common';
import {SubmitService} from '../../providers/submit-service/submit-service';
import {NavController, Alert} from 'ionic-angular';

@Component({
  selector: 'survey',
  templateUrl: 'build/pages/survey/survey.html',
  directives: [FORM_DIRECTIVES]
})

export class Survey {
  surveyForm : ControlGroup;
  leadRank : string = null;
  
  submitted : boolean = false;
  
  form : any = null;

  constructor(form : FormBuilder, public submitService : SubmitService, public nav : NavController) {
    //Required fields
    this.surveyForm = form.group({
      qrFirstName : ["", Validators.required],
      qrLastName: ["", Validators.required],
      qrCompany: ["", Validators.required],
      qrEmail: ["", Validators.required],
      qrPhone: ["", Validators.required],
      qrSolutions: ["", this.validatePickMany],
      qrNotes: [""]
    });  
    
    //Declare Pick Ones as Arrays
    this.form = {
      qrLeadRank : Array<string>(0),
      
      qrService : Array<string>(0),
      qrRole : Array<string>(0),
      qrDeliver: Array<string>(0)
    }; 
  }
  
  public surveySubmit(userForm, ev) {    
    ev.preventDefault();
    //Lead Ranking logic
    
    //pickmany - array
    let rankQ1 = userForm.qrRole;
    rankQ1 = rankQ1.toUpperCase();
    
    //pickone
    let rankQ2 = userForm.qrService; 
    rankQ2 = rankQ2.toUpperCase();   

    //Set qrLeadRank
    if(rankQ1 === 'QRROLE_1' || rankQ1 === 'QRROLE_2'){
      this.form.qrLeadRank[0] = 'qrLeadRank_1';
    } else if (rankQ1 === 'QRROLE_3'){
      this.form.qrLeadRank[0] = 'qrLeadRank_2';
    } else if (rankQ1 === 'QRROLE_4' || rankQ1 === 'QRROLE_5' || rankQ2 === 'QRSERVICE_10'){
      this.form.qrLeadRank[0] = 'qrLeadRank_3';
    }    
    
    //Submit form service    
    let request = this.submitService.submitForm(userForm);
    console.log(request);
    request.subscribe((data) => {      
      this.submitted = true;
      let alert = Alert.create({
        title: 'Success!',
        subTitle: "Thank you for completing our survey!",
        buttons: ["Close"]
      });
      this.nav.present(alert);
    }, (error) => {
      console.log(error);
      this.submitted = false;
      let alert = Alert.create({
        title: 'Uh-Oh!',
        subTitle: "It looks like there were some issues submitting your survey. Please try again later.",
        buttons: ["Close"]
      });
      this.nav.present(alert);
    });
  }
  
  private validatePickMany(resp) { 
    if(resp.value && resp.value.length > 0){
      return null;
    }
    return {
      validatePickMany : {
        valid: false
      }
    }
  }
  
}
