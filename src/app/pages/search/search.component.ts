import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AsyncPipe, FormsModule,DatePipe,RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{

  locations$: Observable<any[]>  = new Observable<any[]>;
  masterSrv = inject(MasterService);
  busList: any[]=[];

  serachObj: any = {
    fromLocation:'',
    toLocation:'',
    travelDate:''
  }

  ngOnInit(): void {
    this.getAllLocations();
  }


  getAllLocations() {
    this.locations$  = this.masterSrv.getLocations();
  }

  onSearch() {
    const {fromLocation,toLocation,travelDate} = this.serachObj;
    this.masterSrv.serachBus(fromLocation,toLocation,travelDate).subscribe((res:any)=>{
      this.busList =  res;
      if(this.busList.length ==0) {
        alert("Please Use Swagger to add Travels Schecule for this Location onthis date. on Nagpur to Pune on 18-08-24 data is available")
      }
    })
  }


}
