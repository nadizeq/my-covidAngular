import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';
import { GlobalConstants } from 'src/environments/GlobalConstants';
import { GlobalMethods } from 'src/environments/GlobalMethods';

@Injectable({
  providedIn: 'root'
})
export class CovidApiService {
  //comment line below if got error
  public descObject: any;

  constructor(private httpClient: HttpClient, private confirmationDialogService: ConfirmationDialogService) { }

  public getCovid(urlcasenumber:string): any {
    return this.httpClient.get(urlcasenumber, { responseType: 'text' });
  }

  public getCovidDesc(urlgetCovidDes:string): any {
    return this.httpClient.get(urlgetCovidDes);
  }

  public deleteDesc(id: number,urldelete:string): Promise<any> {

    return new Promise((resolve) => {
      return this.httpClient.delete(urldelete + id).subscribe((data: any) => {
        console.log(data);
        resolve(data);

      }
        ,
        (error) => {
          console.log(error);
          this.confirmationDialogService.confirm(GlobalConstants.errorMessage, GlobalMethods.getError(error));
        }
      )
    });
  }

  public addDesc(desc: string,urlAdd:string): Promise<any> {

    return new Promise((resolve) => {
      return this.httpClient.get(urlAdd + desc).subscribe((data: any) => {

        console.log(data);
        resolve(data);

      }
        ,
        (error) => {
          console.log(error);
          this.confirmationDialogService.confirm(GlobalConstants.errorMessage, GlobalMethods.getError(error));
        })

    });
  }


  public putDesc(body : any,urlputDesc:string): Promise<any> {

    return new Promise((resolve) => {
      return this.httpClient.put(urlputDesc, body).subscribe((data: any) => {

        console.log(data);
        resolve(data);

      }
        ,
        (error) => {
          console.log(error);
          this.confirmationDialogService.confirm(GlobalConstants.errorMessage, GlobalMethods.getError(error));
        })

    });
  }

  public addPost(body: any,urladdPost:string) {
    //body.description = body.desc;
    return new Promise((resolve) => {
      return this.httpClient.post(urladdPost,body).subscribe((data: any) => {

        console.log(data);
        resolve(data);

      }
        ,
        (error) => {
          console.log(error);
          this.confirmationDialogService.confirm(GlobalConstants.errorMessage, GlobalMethods.getError(error));
        })

    });
  }

  public deleteDescription(description: string,urldeleteDescription:string): Promise<any> {

    return new Promise((resolve) => {
      return this.httpClient.delete(urldeleteDescription + description).subscribe((data: any) => {

        console.log(data);
        resolve(data);

      }
        ,
        (error) => {
          console.log(error);
          this.confirmationDialogService.confirm(GlobalConstants.errorMessage, GlobalMethods.getError(error));
        })

    });
  }

  //<!-- Bonus Section starts  -->

  //retrieve data in trx_covid_case_bonus table
  public getCovidBonus(urlgetCovidBonus:string): any {
    return this.httpClient.get(urlgetCovidBonus);
  }

  //add data in trx_covid_case_bonus table
  public addBonus(desc: string, urladdBonus:string): Promise<any> {

    return new Promise((resolve) => {
      return this.httpClient.get(urladdBonus + desc).subscribe((data: any) => {

        console.log(data);
        resolve(data);

      }
        ,
        (error) => {
          console.log(error);
          this.confirmationDialogService.confirm(GlobalConstants.errorMessage, GlobalMethods.getError(error));
        })

    });
  }

  //delete data in trx_covid_case_bonus table
  public deleteDescBonus(id: number, urldeleteDescBonus:string): Promise<any> {

    return new Promise((resolve) => {
      return this.httpClient.delete(urldeleteDescBonus + id).subscribe((data: any) => {
        console.log(data);
        resolve(data);

      }
        ,
        (error) => {
          console.log(error);
          this.confirmationDialogService.confirm(GlobalConstants.errorMessage, GlobalMethods.getError(error));
        }
      )
    });
  }

  //Put function, Update Record in trx_covid_cases_bonus
  public putDescBonus(body : any,urlputDescBonus:string): Promise<any> {

    return new Promise((resolve) => {
      return this.httpClient.put(urlputDescBonus, body).subscribe((data: any) => {

        console.log(data);
        resolve(data);

      }
        ,
        (error) => {
          console.log(error);
          this.confirmationDialogService.confirm(GlobalConstants.errorMessage, GlobalMethods.getError(error));
        })

    });
  }

  //Post function. adding record via POST method into trx_covid_cases_bonus
  public addPostBonus(body: any,urladdPostBonus:string) {
    //body.description = body.desc;
    return new Promise((resolve) => {
      return this.httpClient.post(urladdPostBonus,body).subscribe((data: any) => {

        console.log(data);
        resolve(data);

      }
        ,
        (error) => {
          console.log(error);
          this.confirmationDialogService.confirm(GlobalConstants.errorMessage, GlobalMethods.getError(error));
        })

    });
  }

  //Delete record by description from trx_covid_cases_bonus table
  public deleteDescriptionBonus(description: string,urldeleteDescriptionBonus:string): Promise<any> {

    return new Promise((resolve) => {
      return this.httpClient.delete(urldeleteDescriptionBonus + description).subscribe((data: any) => {

        console.log(data);
        resolve(data);

      }
        ,
        (error) => {
          console.log(error);
          this.confirmationDialogService.confirm(GlobalConstants.errorMessage, GlobalMethods.getError(error));
        })

    });
  }
  
}
