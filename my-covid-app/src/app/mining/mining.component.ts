import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mining',
  templateUrl: './mining.component.html',
  styleUrls: ['./mining.component.css']
})
export class MiningComponent {

  constructor(private httpClient: HttpClient,) { 

  }

  mining: string = "hello";

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
