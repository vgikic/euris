import { Observable } from 'rxjs';
import Store from '../models/store';
import Product from '../models/product';
import { STORE_ID } from '../constants/store';
import StatCategory from '../models/stat-category';
import { Inject, Injectable } from '@angular/core';
import ProductResponse from '../models/product-response';
import { HttpClient, HttpParams } from '@angular/common/http';
import StoreData from '../models/store-data';

@Injectable({
  providedIn: 'root'
})
export class EurisApiService {

  private readonly statsRootURL = 'stats';
  private readonly storeRootURL = 'stores';
  private readonly productRootURL = 'products';
  private readonly categoriesRootURL = 'categories';

  constructor(@Inject('API_BASE_URL') private baseUrl: string, private httpClient: HttpClient) {
  }

  /**
   * Fetches all stores from Euris API
   */
  public getAllStores(): Observable<Array<Store>> {
    return this.httpClient.get<Array<Store>>(`${this.baseUrl}${this.storeRootURL}`);
  }

  /**
 * Fetches single store defined by Euris for this assignment
 */
  public getDefaultStore(): Observable<StoreData> {
    return this.httpClient.get<StoreData>(`${this.baseUrl}${this.storeRootURL}/${STORE_ID}`);
  }

  /**
   * Fetches products from default store.
   * @param page page number, starts from 1
   * @param productsPerPage number of products per page
   */
  public getStoreProducts(page?: number, productsPerPage?: number): Observable<ProductResponse> {
    let params = new HttpParams();
    if (page && productsPerPage) {
      params = params.append('page', `${page}`);
      params = params.append('elements', `${productsPerPage}`);
    }
    return this.httpClient.get<ProductResponse>(`${this.baseUrl}${this.storeRootURL}/${STORE_ID}/${this.productRootURL}`, {
      params: params
    });
  }

  /**
   * Creates new product.
   * @param product Product data to be saved.
   */
  public createProduct(product: Product): Observable<String> {
    return this.httpClient.post(`${this.baseUrl}${this.storeRootURL}/${STORE_ID}/${this.productRootURL}`, product, {
      responseType: 'text'
    })
  }

  /**
   * Fetches product by ID.
   * @param idProduct ID of requested product.
   */
  public getProduct(idProduct: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}${this.storeRootURL}/${STORE_ID}/${this.productRootURL}/${idProduct}`);
  }

  /**
   * Fetches data for the products per category chart.
   */
  public getCategories(): Observable<Array<StatCategory>> {
    return this.httpClient.get<Array<StatCategory>>(`${this.baseUrl}${this.storeRootURL}/${STORE_ID}/${this.statsRootURL}/${this.categoriesRootURL}`);
  }

  /**
   * Deletes a specific product.
   * @param idProduct ID of product to be deleted.
   */
  public deleteProduct(idProduct: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}${this.storeRootURL}/${STORE_ID}/${this.productRootURL}/${idProduct}`);
  }


}
