import feathers from '@feathersjs/client';
import rest from '@feathersjs/rest-client';

const client = feathers();

// YOU HAVE TO UPDATE THIS WITH YOUR OWN DOMAIN NAME
const restClient = rest("https://favemunchies-73riobndja-uw.a.run.app");

client.configure(restClient.fetch(window.fetch));
client.configure(feathers.authentication({
    storage: window.localStorage
}));

export default client;