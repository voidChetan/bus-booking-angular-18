import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from '../../service/master.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {

  scheduleId: number = 0;
  scehduielData: any;

  seatArray: number [] = [];
  bookedSeatsArray: number []= [];

  userSelectedSeatArray: any []= [];

  constructor(private activatedRouet: ActivatedRoute, private masterSrv: MasterService){
    this.activatedRouet.params.subscribe((res:any)=>{
      this.scheduleId = res.id;
      this.getScehduleDetaislById();
      this.getBookedSeats();
    })
  }

  getScehduleDetaislById() {
    this.masterSrv.getScehduelById(this.scheduleId).subscribe((res:any)=>{
      debugger;
      this.scehduielData =  res;
      for (let index = 1; index <= this.scehduielData.totalSeats; index++) {
        this.seatArray.push(index) 
      }
    })
  }

  getBookedSeats() {
    this.masterSrv.getBookedSeats(this.scheduleId).subscribe((res:any)=>{
      debugger;
      this.bookedSeatsArray =  res; 
    })
  }

  checkIfSeatBooked(seatNo: number) {
    return this.bookedSeatsArray.indexOf(seatNo);
  }

  selectSeat(seatNo: number) {
    debugger;
    const obj = {
      "passengerId": 0,
      "bookingId": 0,
      "passengerName": "",
      "age": 0,
      "gender": "",
      "seatNo": 0
    }
    obj.seatNo = seatNo;
    this.userSelectedSeatArray.push(obj)
  }
  checkIsSeatSelected(seatNo: number) {
    return this.userSelectedSeatArray.findIndex(m=>m.seatNo == seatNo);
  }

  bookNow() {
    debugger;
    if(this.userSelectedSeatArray.length == 0) {
      alert('Please Select Seats n Add Passenger details')
    } else {
      const loggedUSerDat=   localStorage.getItem('redBusUser');
      if(loggedUSerDat) {
        const loggData =  JSON.parse(loggedUSerDat);
        const obj = {
          "bookingId": 0,
          "custId": loggData.userId,
          "bookingDate": new Date(),
          "scheduleId": this.scheduleId,
          "BusBookingPassengers":  this.userSelectedSeatArray
        }
        this.masterSrv.onBooking(obj).subscribe((Res:any)=>{
            alert("Booking Success")
        },error=> {
  
        })
  
      } else {
        alert("Please Login ")
      }
    }
   
   
  }
}
