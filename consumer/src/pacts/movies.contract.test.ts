import { Pact, Interaction, Publisher } from '@pact-foundation/pact';
import { PublisherOptions } from '@pact-foundation/pact-node';
import { eachLike, like } from '@pact-foundation/pact/dsl/matchers';
import path from 'path';
import * as movies from '../actions';

// Define the PACT configs
const provider = new Pact({
  consumer: 'Movie Consumer',
  provider: 'Movie Provider',
  port: 3001,
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), '../', 'contracts'),
  logLevel: 'info',
});

describe('Movie Service Provider', () => {
  beforeAll(async () => {
    // Bring up provider mock server
    await provider.setup();
  });

  afterEach(async () => {
    // Verify the contract
    await provider.verify();
  });

  afterAll(async () => {
    // Create the contract and kill the mock server
    await provider.finalize();

    // Configs to publish contract to pact broker
    const opts: PublisherOptions = {
      pactFilesOrDirs: [path.resolve(process.cwd(), '../', 'contracts')],
      pactBroker: 'http://localhost:9292/',
      consumerVersion: '1.0.0',
      tags: ['development'],
    };
    // Publish the contract to broker
    await new Publisher(opts).publishPacts();
  });

  it('should return list of movies', async () => {
    // Define expected provider interaction
    const interaction = new Interaction()
      .given('a list of movies')
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
    await provider.addInteraction(interaction);

    // Test against mock provider
    const result = await movies.getMovies();
    expect(result.status).toEqual(200);
    expect(result.data[0].id).toBe(1);
    expect(result.data[0].name).toBe('foo bar');
    expect(result.data[0].year).toBe(1989);
  });

  it('should return a movie', async () => {
    // Define expected provider interaction
    const interaction = new Interaction()
      .given('movie with id 2 exist')
      .uponReceiving('a request to return movie with id 2')
      .withRequest({
        method: 'GET',
        path: '/movie/2',
      })
      .willRespondWith({
        status: 200,
        body: like({
          id: 2,
          name: 'Titanic',
          year: 1995,
        }),
      });
    await provider.addInteraction(interaction);

    // Test against mock provider
    const result = await movies.getMovieById(2);
    expect(result.status).toEqual(200);
    expect(result.data.id).toBe(2);
    expect(result.data.name).toBe('Titanic');
    expect(result.data.year).toBe(1995);
  });

  it('should return error when id does not exist', async () => {
    // Define expected provider interaction
    const interaction = new Interaction()
      .given('movie with id 999 does not exist')
      .uponReceiving('a request to return movie with id 999')
      .withRequest({
        method: 'GET',
        path: '/movie/999',
      })
      .willRespondWith({
        status: 404,
      });
    await provider.addInteraction(interaction);

    // Test against mock provider
    await expect(movies.getMovieById(999)).rejects.toThrow('Request failed with status code 404');
  });
});
