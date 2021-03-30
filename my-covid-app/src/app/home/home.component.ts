import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/environments/GlobalConstants';
import { GlobalMethods } from 'src/environments/GlobalMethods';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { CovidApiService } from '../covidapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

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

  
  //
  async ngOnInit(): Promise<void> {
    this.descObject = {};
    this.updateDesc = {};
    this.postDesc = {};
    this.getCovid();
    this.getCovidDesc();
    await this.covidApiService.getCovidDesc(this.getCovidDescUrl).toPromise().then((data:any)=>{
      this.descObject=data;
    });
    
    console.log("Covid Component Inited");
    console.log("Total of Description Column Row --->" + this.descObject.length);
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
      });
      //alternate way
      //console.log("Total of Description Column Rows --->" + this.covidTotalDesc.length);
      //line above can be used without async (line:35) and await(line:41)
      return this.covidTotalDesc;
    }
  }
