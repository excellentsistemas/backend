import { inject } from 'inversify';
import {
  controller,
  httpGet,
  httpPost,
  BaseHttpController,
  requestBody,
  requestParam,
  httpPut,
  httpDelete,
  queryParam,
} from 'inversify-express-utils';
import { ProductService } from '../../services/product/product.service';
import { Product } from '@prisma/client';

@controller('/product')
export class ProductController extends BaseHttpController {
  constructor(
    @inject(ProductService)
    private productService: ProductService
  ) {
    super();
  }

  @httpGet('/')
  private async getAll() {
    const result = await this.productService.getAll();
    return this.ok(result);
  }

  @httpPost('/create')
  private async create(@requestBody() body: Product) {
    const result = await this.productService.create(body);
    return this.ok(result);
  }

  @httpPut('/update/:guid')
  private async update(
    @requestParam('guid') guid: string,
    @requestBody() body: Product
  ) {
    const result = await this.productService.update(guid, body);
    return this.ok(result);
  }

  @httpDelete('/delete/:guid')
  private async delete(@requestParam('guid') guid: string) {
    const result = await this.productService.delete(guid);
    return this.ok(guid);
  }
}
