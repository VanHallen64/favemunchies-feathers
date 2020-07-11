// Initializes the `restaurants` service on path `/restaurants`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Restaurants } from './restaurants.class';
import createModel from '../../models/restaurants.model';
import hooks from './restaurants.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'restaurants': Restaurants & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/restaurants', new Restaurants(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('restaurants');

  service.hooks(hooks);
}
