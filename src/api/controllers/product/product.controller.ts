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
  request,
  response,
  queryParam,
} from 'inversify-express-utils';
import { ProductService } from '../../services/product/product.service';
import { ViewProduct } from '../../services/product/product.map';
import multer from 'multer';
import { Response } from 'express';

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

  @httpGet('/:guid')
  private async getByGuid(@requestParam('guid') guid: string) {
    try {
      const result = await this.productService.getByGuid(guid);
      return this.ok(result);
    } catch (err) {
      return this.json(err, 400);
    }
  }

  @httpPost('/create')
  private async create(@requestBody() body: ViewProduct) {
    const result = await this.productService.create(body);
    return this.ok(result);
  }

  @httpPut('/update/:guid')
  private async update(
    @requestParam('guid') guid: string,
    @requestBody() body: ViewProduct
  ) {
    const result = await this.productService.update(guid, body);
    return this.ok(result);
  }

  @httpPut('/delete/:guid')
  private async delete(@requestParam('guid') guid: string) {
    const result = await this.productService.delete(guid);
    return this.ok(guid);
  }

  @httpPost('/upload-image/:productGuid', multer().single('image'))
  private async uploadImage(
    @requestParam('productGuid')
    productGuid: string,
    @request()
    req: any
  ): Promise<any> {
    const result = await this.productService.uploadImage(productGuid, {
      image: req.file.buffer,
      mimeType: req.file.mimetype,
      name: req.file.originalname,
    });

    return this.ok(result);
  }

  @httpGet('/download-image/:imageGuid')
  private async downloadImage(
    @requestParam('imageGuid')
    imageGuid: string,
    @response()
    res: Response
  ) {
    const image = await this.productService.downloadImage(imageGuid);

    res.setHeader('Content-Type', image.mimeType);
    res.status(200).send(image);
  }
}
