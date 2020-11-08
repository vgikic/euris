import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DashboardType } from 'src/app/core/enums/dashoard-type';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GridLayoutComponent } from '../../components/grid-layout/grid-layout.component';
import { PanelLayoutComponent } from '../../components/panel-layout/panel-layout.component';
import { ProductModalDialogComponent } from '../../components/product-modal-dialog/product-modal-dialog.component';

@Component({
  selector: 'euris-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit, OnInit {

  public dashboardType = DashboardType.GridLayout;
  private createProductDialogRef: MatDialogRef<ProductModalDialogComponent>;

  @ViewChild(PanelLayoutComponent) panelLayoutComponent: PanelLayoutComponent;
  @ViewChild(GridLayoutComponent) gridLayoutComponent: GridLayoutComponent;

  constructor(
    private matDialog: MatDialog,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  public openDialog = () => {

    const onSave = () => {
      this.snackbarService.success('Product created successfully!');
      if (this.dashboardType == DashboardType.PanelLayout) {
        this.panelLayoutComponent.dataSource.loadProducts()
      } else {
        this.gridLayoutComponent.dataSource.loadProducts();
      }
    }

    this.createProductDialogRef = this.matDialog.open(ProductModalDialogComponent, {
      data: {
        onSave: () => onSave()
      }
    });
  }

}
