import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/environments/GlobalConstants';
import { GlobalMethods } from 'src/environments/GlobalMethods';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { CovidApiService } from '../covidapi.service';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.css'],
  providers: [CovidApiService],
})
export class BonusComponent implements OnInit {

  public covidTotalDaily: any;

  public covidTotalDescBonus: any[] = [];

  public desc: any;

  public descObjectBonus: any;

  public newDescBonus: any;

  public updateDescBonus: any;

  public postDescBonus: any;

  constructor(
    private httpClient: HttpClient,
    private confirmationDialogService: ConfirmationDialogService,
    public covidApiService: CovidApiService,
  ) { }
  
  //link
  private getCovidLatestCaseNumberUrl="http://localhost:8081/covid/get/latest";
  private getCovidBonusUrl="http://localhost:8081/covid/get/bonus";
  private addBonusUrl="http://localhost:8081/covid/add/bonus?desc=";
  private putDescBonusUrl="http://localhost:8081/covid/put/bonus";
  private deleteDescBonusUrl="http://localhost:8081/covid/delete/bonus?id=";
  private addPostBonusUrl="http://localhost:8081/covid/post/bonus";
  private deleteDescriptionBonusUrl="http://localhost:8081/covid/deletesoap/bonus?desc=";
  private deleteDuplicateDescriptionBonusUrl="http://localhost:8081/covid/deleteduplicate/bonus";

  ngOnInit(): void {

    this.descObjectBonus = {};
    this.updateDescBonus = {};
    this.postDescBonus = {};
    this.getCovid();
    this.getCovidBonus();

    console.log("Covid Bonus Component Inited");
    console.log("Total of Description Column Row --->" + this.descObjectBonus.length);
  }

  //display daily covid case
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
  getCovidBonus(): any {
    this.covidApiService.getCovidBonus(this.getCovidBonusUrl).subscribe((data: any) => {
      console.log(data);
      this.covidTotalDescBonus = data;
    });

    return this.covidTotalDescBonus;
  }

  onSelectDescBonus(desc: any) {

    console.log("desc-->" + this.desc);
    if (this.desc[0]) {
      this.descObjectBonus = this.desc[0];
      console.log("desc id-->" + this.descObjectBonus.id);
      console.log("desc description-->" + this.descObjectBonus.description);
    }
  }

    //add function into the table
    addBonus() {
      this.covidApiService.addBonus(this.newDescBonus,this.addBonusUrl).then(
        resolve => {
          this.getCovidBonus();
        });
    }
  
    onSelectUpdateDescBonus(desc: any) {
  
      console.log("updateDesc-->" + this.updateDescBonus);
      if (this.desc[0]) {
      
        let clonedDesc = Object.assign({}, this.desc[0]);
        // use a new cloned Object to prevent pass by reference value in the class
        this.updateDescBonus = clonedDesc;
        console.log("updateDescBonus id-->" + this.updateDescBonus.id);
        console.log("updateDescBonus description-->" + this.updateDescBonus.description);
      }
    }

    //put record (update)
    //add code below
    putDescBonus(){

      this.covidApiService.putDescBonus(this.updateDescBonus,this.putDescBonusUrl).then(
      resolve => {
        this.getCovidBonus();
      });
      

    }

    //delete a record from trx_covid_cases_bonus
    deleteDescBonus() {
      console.log("covidTotalDescBonus length-->" + this.covidTotalDescBonus.length);

      if (this.covidTotalDescBonus.length == 0) {
      this.confirmationDialogService.confirm(GlobalConstants.errorMessageFE, "List is Empty");
      }
      else {
        this.covidApiService.deleteDescBonus(this.descObjectBonus.id,this.deleteDescBonusUrl).then(
        resolve => {
          this.getCovidBonus();
      });
    }

  }

  addPostBonus(){
    this.covidApiService.addPostBonus(this.postDescBonus,this.addPostBonusUrl).then(
      resolve => {
        this.getCovidBonus();
      });
  }

}
