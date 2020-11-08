import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { DashboardType } from 'src/app/core/enums/dashoard-type';
import { EurisApiService } from 'src/app/core/services/euris-api.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { ProductDataSource } from '../../pages/dashboard/services/product-data-source.service';

@Component({
  selector: 'euris-panel-layout',
  templateUrl: './panel-layout.component.html',
  styleUrls: ['./panel-layout.component.scss']
})
export class PanelLayoutComponent implements OnInit {

  @Input() dashboardType: DashboardType;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private confirmationDialog: MatDialogRef<ConfirmationDialogComponent>;
  public dataSource: ProductDataSource;
  public displayedColumns: string[] = ['id', 'title', 'category', 'price', 'employee', 'description', 'action'];

  constructor(private eurisApiService: EurisApiService,
    private snackbarService: SnackbarService,
    private matDialog: MatDialog) { }

  ngAfterViewInit() {
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
    });

  }

}
