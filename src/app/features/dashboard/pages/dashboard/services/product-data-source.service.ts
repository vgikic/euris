import { catchError } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/table';
import Product from 'src/app/core/models/product';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';
import ProductResponse from 'src/app/core/models/product-response';
import { EurisApiService } from 'src/app/core/services/euris-api.service';

export class ProductDataSource implements DataSource<{ id: number, data: Product }> {

    public productCount: number;
    public $products = new BehaviorSubject<Array<{ id: number, data: Product }>>([]);

    constructor(private eurisApiService: EurisApiService) {
    }

    connect(collectionViewer: CollectionViewer): Observable<{ id: number, data: Product }[]> {
        return this.$products.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.$products.complete();
    }

    loadProducts(
        pageIndex: number = 0,
        pageSize: number = 6) {
        this.eurisApiService.getStoreProducts(pageIndex + 1, pageSize).pipe(
            catchError(() => of([])))
            .subscribe((response: ProductResponse) => {
                this.productCount = response.length;
                return this.$products.next(response.list);
            })
    }

}
