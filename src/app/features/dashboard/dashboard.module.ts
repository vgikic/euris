import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input'
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GridLayoutComponent } from './components/grid-layout/grid-layout.component';
import { PanelLayoutComponent } from './components/panel-layout/panel-layout.component';
import { ProductModalDialogComponent } from './components/product-modal-dialog/product-modal-dialog.component';
import { ShopComponent } from './components/shop/shop.component';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [DashboardComponent, PanelLayoutComponent, GridLayoutComponent, ProductModalDialogComponent, ShopComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatButtonModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    SharedModule,
    MatExpansionModule
  ],
  providers: []
})
export class DashboardModule { }
