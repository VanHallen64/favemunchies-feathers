// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { app, data } = context;

    // If a name was not entered
    if (!data.name) {
      throw new Error("A restaurant name is needed");
    }

    // Name can't be longer than 30 characters
    let name = data.name.substring(0, 30);

    // Capitalizes first letters of words in string
    const capitalize = (str: String, lower: Boolean) => (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
    name = capitalize(name, true);

    /* Check if the restaurant already exists*/
    const restaurants = await app.service('restaurants').find({
      query: {
        name: data.name
      }
    });

    if(restaurants.total > 0) {
      for(let restaurant of restaurants.data ) {
        if (restaurant.location == data.location) {
          throw new Error("You already added that restaurant at that location");
        }
      }
    }

    // Get rid of any stray properties
    context.data = {
      name,
      location: data.location
    }
    return context;
  };
};