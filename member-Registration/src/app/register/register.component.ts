import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberService } from '../services/member-service/memberservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  countryList: Array<any> = [
    { name: 'USA', cities: ['NeW York', 'Washington', 'sanfancisco'] },
    { name: 'United Kindom', cities: ['Barmingum','London'] },
    { name: 'India', cities: ['Hyderbad','Delhi','Bangulur'] },
    { name: 'China', cities: ['Beijing','vuhan'] },
  ];
  cities!: Array<any>;
  changeCountry(count: any) {
    this.cities = this.countryList.find(con => con.name == count).cities;
  }

  registerationForm !: FormGroup;
  errorMessage : string = "";
  public user: any;
 

  constructor(
    private memberServices: MemberService,
    private formBuilder: FormBuilder,private router: Router,
    ) { }

  ngOnInit(): void {
    this.registerationForm = this.formBuilder.group({
      name:['',[Validators.required,Validators.pattern('^[A-Za-z ]+$'),Validators.minLength(1)]],
      password:['',[Validators.required,Validators.minLength(5),Validators.maxLength(100)]],
      contactNo:['',[Validators.required,Validators.minLength(10)]],
      gmail:['',[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
      country:['',[Validators.required,Validators.pattern('^[A-Za-z ]+$'),Validators.minLength(1)]],
      city:['',[Validators.required,Validators.pattern('^[A-Za-z ]+$'),Validators.minLength(1)]],
      address:['',[Validators.required,Validators.pattern('^[A-Za-z ]+$'),Validators.minLength(1)]],
      pan:['',[Validators.required,Validators.pattern('^[A-Za-z ]+$'),Validators.minLength(1)]],
      dateOfBirth:['',[Validators.required,Validators.minLength(1)]]

    });
  }

  registerUser() { 
    this.memberServices.registerUser(this.registerationForm.value).subscribe(
      success => {
        this.user = success;
        alert("Register successfully Your member Id "+this.user.memberId +" note it somewhere")

      }
    );
    this.router.navigate(["/"])
  }

 
}
