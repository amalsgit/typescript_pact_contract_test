import { Verifier, VerifierOptions } from '@pact-foundation/pact';
import path from 'path';

describe('Verify Movies Consumer', () => {
  it('shoule validate consumer expectation', () => {
    const opts: VerifierOptions = {
      provider: 'Movies Provider',
      providerBaseUrl: 'http://localhost:3001',
      pactUrls: [path.resolve(process.cwd(), '../', 'contracts', 'movie_consumer-movie_producer.json')],
    };
    return new Verifier(opts).verifyProvider();
  });
});
