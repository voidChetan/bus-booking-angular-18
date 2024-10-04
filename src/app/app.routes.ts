import { Routes } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';
import { BookingComponent } from './pages/booking/booking.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'search',
        pathMatch:'full'
    },
    {
        path:'search',
        component:SearchComponent
    },
    {
        path:'booking/:id',
        component:BookingComponent
    }
];
