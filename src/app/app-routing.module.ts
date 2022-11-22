import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartSimulatorComponent } from './components/cart-simulator/cart-simulator.component';
import { OfftrackSimulatorComponent } from './components/offtrack-simulator/offtrack-simulator.component';

const routes: Routes = [
  { path: '', component: CartSimulatorComponent },
  { path: 'offtrack', component: OfftrackSimulatorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
