import { inject } from 'inversify';
import {
  controller,
  httpGet,
  httpPost,
  BaseHttpController,
  requestBody,
  requestParam,
  httpDelete,
} from 'inversify-express-utils';
import { DemandService } from '../../services/demand/demand.service';
import { Demand } from '@prisma/client';

@controller('/demand')
export class DemandController extends BaseHttpController {
  constructor(
    @inject(DemandService)
    private demandService: DemandService
  ) {
    super();
  }

  @httpGet('/')
  private async getAll() {
    const result = await this.demandService.getAll();
    return this.ok(result);
  }

  @httpPost('/create')
  private async create(@requestBody() body: Demand) {
    const result = await this.demandService.create(body);
    return this.ok(result);
  }

  @httpDelete('/delete/:guid')
  private async delete(@requestParam('guid') guid: string) {
    const result = await this.demandService.delete(guid);
    return this.ok(result);
  }
}
