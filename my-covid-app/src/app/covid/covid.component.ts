import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CovidApiService } from '../covidapi.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { GlobalConstants } from 'src/environments/GlobalConstants';
import { GlobalMethods } from 'src/environments/GlobalMethods';
import { CovidCasesDesc } from 'src/model/CovidCasesDesc';

@Component({
  selector: 'app-covid',
  providers: [CovidApiService],
  styleUrls: ['./covid.component.css'],
  templateUrl: './covid.component.html',

})
export class CovidComponent implements OnInit {
  public covidTotalDaily: any;

  public covidTotalDesc: any[] = [];

  public desc: any;

  public descObject: any;

  public newDesc: any;

  public updateDesc: any;

  public postDesc: any;

  constructor(
    private httpClient: HttpClient,
    public covidApiService: CovidApiService,
    private confirmationDialogService: ConfirmationDialogService

  ) { }

  //url link
  private getCovidLatestCaseNumberUrl="http://localhost:8081/covid/get/latest";
  private getCovidDescUrl="http://localhost:8081/covid/get/desc";
  private deleteUrl = "http://localhost:8081/covid/delete?id=";
  private addUrl="http://localhost:8081/covid/add?desc=";
  private putDescUrl="http://localhost:8081/covid/put";
  private addPostUrl="http://localhost:8081/covid/post";
  private deleteDescriptionUrl="http://localhost:8081/covid/deletesoap?desc=";


  ngOnInit(): void {
    this.descObject = {};
    this.updateDesc = {};
    this.postDesc = {};
    this.getCovid();
    this.getCovidDesc();

    console.log("Covid Component Inited");
    
  }

  getCovid(): any {
    this.covidTotalDaily = this.covidApiService.getCovid(this.getCovidLatestCaseNumberUrl).subscribe((data: any) => {
      console.log(data); this.covidTotalDaily = data;
    }
      ,
      (error: { error: { message: string; }; }) => {
        console.log(error);
        this.confirmationDialogService.confirm(GlobalConstants.errorMessage, GlobalMethods.getError(error));
      }
    );

    return this.covidTotalDaily;
  }

  //retrieve data in table trx_covid_case_bonus 
  getCovidDesc(): any {
    this.covidApiService.getCovidDesc(this.getCovidDescUrl).subscribe((data: any) => {
      console.log(data);
      this.covidTotalDesc = data;
      console.log("Total of Description Column Rows --->" + this.covidTotalDesc.length);
    });

    return this.covidTotalDesc;
  }

  onSelectDesc(desc: any) {

    console.log("desc-->" + this.desc);
    if (this.desc[0]) {
      this.descObject = this.desc[0];
      console.log("desc id-->" + this.descObject.id);
      console.log("desc description-->" + this.descObject.description);
    }
  }

  //delete a record from trx_covid_case
  deleteDesc() {
    console.log("covidTotalDesc length-->" + this.covidTotalDesc.length);
    
    if (this.covidTotalDesc.length == 0) {
      this.confirmationDialogService.confirm(GlobalConstants.errorMessageFE, "List is Empty");
    }
    else {
      this.covidApiService.deleteDesc(this.descObject.id, this.deleteUrl).then(
        resolve => {
          this.getCovidDesc();
        });
    }
  }

  //add function into the table
  addDesc() {
    this.covidApiService.addDesc(this.newDesc,this.addUrl).then(
      resolve => {
        this.getCovidDesc();
      });
  }

  onSelectUpdateDesc(desc: any) {

    console.log("updateDesc-->" + this.updateDesc);
    if (this.desc[0]) {
    
      let clonedDesc = Object.assign({}, this.desc[0]);
      // use a new cloned Object to prevent pass by reference value in the class
      this.updateDesc = clonedDesc;
      console.log("updateDesc id-->" + this.updateDesc.id);
      console.log("updateDesc description-->" + this.updateDesc.description);
    }
  }

  putDesc() {

    this.covidApiService.putDesc(this.updateDesc,this.putDescUrl).then(
      resolve => {
        this.getCovidDesc();
      });
  }

  addPost() {

    this.covidApiService.addPost(this.postDesc,this.addPostUrl).then(
      resolve => {
        this.getCovidDesc();
      });
  }

  //delete
  deleteDescription(){

    if (this.covidTotalDesc.length == 0) {
      this.confirmationDialogService.confirm(GlobalConstants.errorMessageFE, "List is Empty");
    }
    else {
      this.covidApiService.deleteDescription(this.descObject.description,this.deleteDescriptionUrl).then(
        resolve => {
          this.getCovidDesc();
        });
    }

  }
  
}
