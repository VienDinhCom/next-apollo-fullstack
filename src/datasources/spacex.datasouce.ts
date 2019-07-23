import { RESTDataSource } from 'apollo-datasource-rest';

export class SpaceXDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spacexdata.com/v2/';
  }
}
