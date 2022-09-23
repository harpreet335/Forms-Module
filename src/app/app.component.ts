import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { promise } from 'protractor';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  genders = ['male', 'female'];
  //blackListedName :[string,string]= ['Harry','Larry'];
  blackListedName = ['Harry','Larry'];

  userForm : FormGroup;

  ngOnInit(): void {
    this.userForm = new FormGroup({
      userGrp : new FormGroup({
        userName: new FormControl(null,[Validators.required,this.checkBlacklistedNames.bind(this)]),
        eMail : new FormControl(null,[Validators.required,Validators.email],this.CheckForbiddenEmail)
      }),
      gender: new FormControl('male'),
      hobbiesControl : new FormArray([])
    })

    this.userForm.statusChanges.subscribe((value)=>{
      console.log(value);
    })

    this.userForm.valueChanges.subscribe((value)=>{
      console.log(value);
    })

    this.userForm.setValue({
      userGrp : {
        userName: 'Harry',
        eMail : 'Harry@test.com'
      },
      gender: '',
      hobbiesControl : []
    })

    this.userForm.patchValue({
      userGrp : {
        userName: 'Harry',        
      },      
      hobbiesControl : []
    })

    this.userForm.reset();
  }

  onSubmit()  {
    console.log(this.userForm);
    //console.log('Usernams is ' +this.userForm.get('userName').valid);
  }

  onAddHobbies(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.userForm.get('hobbiesControl')).push(control);
  }


  checkBlacklistedNames(control : FormControl) : {[s:string] :boolean}
  {
      if(this.blackListedName.indexOf(control.value) != -1)
      {
        return {"NameIsBlacklisted": true};
      }
      return null;
  }


  CheckForbiddenEmail(control : FormControl) : Promise<any> | Observable<any>
  {
    const retPromise = new Promise<any>((resolve,reject)=>{
      setTimeout(() => {
        if(control.value == 'test@test.com')
        {
          resolve({"EmailIsInvalid":true});
        }
        else
        {
          resolve(null);
        }
      }, 1500);
    });
    return retPromise;
  }



}
