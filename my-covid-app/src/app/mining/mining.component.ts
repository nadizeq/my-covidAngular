import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';


@Component({
  selector: 'app-mining',
  templateUrl: './mining.component.html',
  styleUrls: ['./mining.component.css']
})
export class MiningComponent implements OnInit {

  constructor(private httpClient: HttpClient,) { 

  }

  ngOnInit(): void {
  }

  mining: string = "";

  public getBasicMining(): any {
    this.httpClient.get(`http://localhost:8091/covid/mining/my`, { responseType: 'text' })
      .subscribe((data: any) => 
        {
          // no action yet
          this.mining = data;
        }
        );
   
  }
}
