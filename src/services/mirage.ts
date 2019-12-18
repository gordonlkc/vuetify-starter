const { Server, Model } = require('miragejs');

function getRandomInRange(from: number, to: number, fixed: number): number {
  return ((Math.random() * (to - from) + from).toFixed(fixed) as any) * 1;
  // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

const startMirage = ({ environment = 'development' } = {}) => {
  return new Server({
    environment,
    baseConfig() {
      this.namespace = 'admin';

      // the following will respond with a static JSON payload
      this.get('/sites', () => {
        const sites = [
          {
            id: '123',
            name: '123',
            address: '12412',
            latitude: '124124',
            longitude: '41asfasfasfdsadf2124',
            imageURL: '124124',
            description: '124124',
          },
          {
            id: '456',
            name: '456',
            address: '43563456',
            latitude: '5434',
            longitude: '432453253455435rdsadf2124',
            imageURL: '43534',
            description: '435345',
          },
        ];
        return { sites };
      });
      this.post('/sites', () => {
        return 'ok';
      });
      this.get('/sensors', () => {
        return { result: '456' };
      });

      // prod api
      this.passthrough('https://api.sawatermap.fleet-infra.net');
      // staging api
      this.passthrough('https://api.staging.sawatermap.fleet-infra.net');
      this.passthrough();
    },
  });
};

export { startMirage };
