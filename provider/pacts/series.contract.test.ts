import { Verifier, VerifierOptions } from '@pact-foundation/pact';
import path from 'path';
import { createConnection } from 'typeorm';
import { TvSeries } from '../src/entity/tvSeries.entity';

describe('Verify Movies Consumer', () => {
  it('should validate consumer expectation', async () => {
    jest.setTimeout(10000);

    const opts: VerifierOptions = {
      provider: 'Series Provider',
      providerVersion: '1.0.0',
      providerBaseUrl: 'http://localhost:3001',
      // pactUrls: [path.resolve(process.cwd(), '../', 'contracts', 'series_consumer-series_producer.json')],
      pactBrokerUrl: 'http://localhost:9292/',
      publishVerificationResult: true,
      logDir: path.resolve(process.cwd(), 'logs/series'),
      logLevel: 'info',

      stateHandlers: {
        'a list of tv series': async () => {
          console.log('Setting provider state');
          const newTvSeries = { name: 'Big Bang Theory 2', year: 2015, seasons: 9 };
          const connection = await createConnection();
          await connection.getRepository(TvSeries).save(newTvSeries);
          return Promise.resolve('Entry added to tv series db');
        },
      },
    };
    // Verify provider against the contract
    await new Verifier(opts).verifyProvider();
  });
});
