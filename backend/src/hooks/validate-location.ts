// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { app, data } = context;

    // Capitalizes first letters of words in string
    const capitalize = (str: String, lower: Boolean) => (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());

    // If a name was not entered
    if (!data.name) {
      throw new Error("A location name is required");
    }

    // Name can't be longer than 20 characters
    let name = data.name.substring(0, 30);
    name = capitalize(name, true);

    /* Check if the location already exists*/
    const locations = await app.service('locations').find({
      query: {
        name: data.name
      }
    });

    if(locations.total > 0) {
      throw new Error("You already added that location");
    }

    // Get rid of any stray properties
    context.data = {
      name
    }

    return context;
  };
};
