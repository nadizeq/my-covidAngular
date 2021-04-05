import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/environments/GlobalConstants';
import { BonusComponent } from '../bonus/bonus.component';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { CovidApiService } from '../covidapi.service';

@Component({
  selector: 'app-covid-delete',
  styleUrls: ['../share/css/share.component.css'],
  templateUrl: './covid-delete.component.html',
})
export class CovidDeleteComponent implements OnInit {

  public covidTotalDescBonus: any[] = [];

  public desc: any;

  public descObjectBonus: any;



  constructor(
    private httpClient: HttpClient,
    private confirmationDialogService: ConfirmationDialogService,
    public covidApiService: CovidApiService,
    public bonusComponent:BonusComponent
  ) { }
  
  //link
  private deleteDescriptionBonusUrl="http://localhost:8081/covid/deletesoap/bonus?desc=";
  private deleteDuplicateDescriptionBonusUrl="http://localhost:8081/covid/deleteduplicate/bonus";

  ngOnInit(): void {

    this.descObjectBonus = {};

    console.log("Covid Bonus Component Inited");
    console.log("Total of Description Column Row --->" + this.descObjectBonus.length);
  }

  //delete
  deleteDescriptionBonus(){

    if (this.bonusComponent.covidTotalDescBonus.length == 0) {
      this.confirmationDialogService.confirm(GlobalConstants.errorMessageFE, "List is Empty");
    }
    else {
      this.covidApiService.deleteDescriptionBonus(this.descObjectBonus.description,this.deleteDescriptionBonusUrl).then(
        resolve => {
          this.bonusComponent.getCovidBonus();
        });
    }

  }

    //delete Duplicate Record
    deleteDuplicateDescriptionBonus(){

      if (this.bonusComponent.covidTotalDescBonus.length == 0) {
        this.confirmationDialogService.confirm(GlobalConstants.errorMessageFE, "List is Empty");
      }
      else {
        this.covidApiService.deleteDuplicateDescriptionBonus(this.deleteDuplicateDescriptionBonusUrl).then(
          resolve => {
            this.bonusComponent.getCovidBonus();
          });
      }
  
    }
}
