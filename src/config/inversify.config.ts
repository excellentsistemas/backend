import { Container } from 'inversify';
import { ProductController } from '../api/controllers/product/product.controller';
import { DemandController } from '../api/controllers/demand/demand.controller';
import { ProductService } from '../api/services/product/product.service';
import { DemandService } from '../api/services/demand/demand.service';

const container = new Container();

container.bind<ProductController>(ProductController).to(ProductController);
container.bind<DemandController>(DemandController).to(DemandController);

container.bind<ProductService>(ProductService).to(ProductService);
container.bind<DemandService>(DemandService).to(DemandService);

export default container;
