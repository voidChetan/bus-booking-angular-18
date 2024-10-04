import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiURl: string = 'https://projectapi.gerasim.in/api/BusBooking/';


  constructor(private http: HttpClient) { }

  getLocations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURl + "GetBusLocations")
  }

  serachBus(from: number, to: number, travelDate: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURl}searchBus?fromLocation=${from}&toLocation=${to}&travelDate=${travelDate}`)
  }

  getScehduelById(id: number) {
    return this.http.get<any[]>(this.apiURl + "GetBusScheduleById?id="+id)
    
  }

  getBookedSeats(id: number) {
    return this.http.get<any[]>(this.apiURl + "getBookedSeats?shceduleId="+id)
    
  }

  onRegisterUser(obj: any) {
    return this.http.post<any[]>(this.apiURl + "AddNewUser", obj)
    
  }
  
  onBooking(obj: any) {
    return this.http.post<any[]>(this.apiURl + "PostBusBooking", obj)
    
  }


}
