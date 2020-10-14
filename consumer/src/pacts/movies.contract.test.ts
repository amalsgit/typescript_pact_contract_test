import { Pact, Interaction } from '@pact-foundation/pact';
import { eachLike, like } from '@pact-foundation/pact/dsl/matchers';
import path from 'path';
import * as movies from '../actions';

const PORT: number = 3001;

// Create the provider instance
const provider = new Pact({
  consumer: 'Movie Consumer',
  provider: 'Movie Producer',
  port: PORT,
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), '../', 'contracts'),
  logLevel: 'info',
});

describe('Movies Service', () => {
  jest.setTimeout(30000);
  beforeAll(async () => {
    // Bring up provider mock server
    await provider.setup();

    // Define expected provider interaction
    const interaction = new Interaction()
      .given('I have a list of movies')
      .uponReceiving('a request for returning all movies')
      .withRequest({
        method: 'GET',
        path: '/movies',
      })
      .willRespondWith({
        status: 200,
        body: eachLike({
          id: like(1),
          name: like('foo bar'),
          year: like(1989),
        }),
      });
    return await provider.addInteraction(interaction);
  });

  afterEach(async () => {
    // Verify the contract
    await provider.verify();
  });

  afterAll(async () => {
    // Create the contract and kill the mock provider
    await provider.finalize();
  });

  // Test the contract
  it('returns 200', async () => {
    await new Promise(r => setTimeout(r, 10000));
    const result = await movies.getMovies();
    expect(result.status).toEqual(200);
    expect(result.data[0].id).toBe(1);
    expect(result.data[0].name).toBe('foo bar');
    expect(result.data[0].year).toBe(1989);
  });
});
