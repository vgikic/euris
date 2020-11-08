import { tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { DashboardType } from 'src/app/core/enums/dashoard-type';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { EurisApiService } from 'src/app/core/services/euris-api.service';
import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ProductDataSource } from '../../pages/dashboard/services/product-data-source.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'euris-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.scss']
})
export class GridLayoutComponent implements OnInit, AfterViewInit {

  @Input() dashboardType: DashboardType;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public dataSource: ProductDataSource;
  private confirmationDialog: MatDialogRef<ConfirmationDialogComponent>;

  constructor(private eurisApiService: EurisApiService,
    private snackbarService: SnackbarService,
    private matDialog: MatDialog
  ) { }


  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(tap(() => this.loadProductsPage()))
      .subscribe();
  }

  ngOnInit(): void {
    this.dataSource = new ProductDataSource(this.eurisApiService);
    this.dataSource.loadProducts();
  }

  private loadProductsPage() {
    this.dataSource.loadProducts(
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  public deleteProduct(id: string) {
    this.confirmationDialog = this.matDialog.open(ConfirmationDialogComponent, { data: id });
    this.confirmationDialog.componentInstance.confirmed.subscribe(confirmed => {
      if (confirmed) {
        this.eurisApiService.deleteProduct(id).subscribe(response => {
          this.dataSource.loadProducts();
          this.snackbarService.info('Product deleted successfully!');
        });
      }
    })
  }

}
