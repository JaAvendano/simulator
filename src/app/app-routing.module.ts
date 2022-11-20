import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartSimulatorComponent } from './cart-simulator/cart-simulator.component';

const routes: Routes = [{ path: '', component: CartSimulatorComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
