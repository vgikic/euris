import Product from './product';

export default interface ProductResponse {
  length: number,
  list: Array<{ id: number, data: Product }>
}
