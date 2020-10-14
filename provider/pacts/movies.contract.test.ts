import { Verifier, VerifierOptions } from '@pact-foundation/pact';
import path from 'path';

describe('Verify Movies Consumer', () => {
  it('shoule validate consumer expectation', () => {
    // Define contract tests configs
    const opts: VerifierOptions = {
      provider: 'Movies Provider',
      providerBaseUrl: 'http://localhost:3001',
      pactUrls: [path.resolve(process.cwd(), '../', 'contracts', 'movie_consumer-movie_producer.json')],
    };
    // Verify provider against the contarct
    return new Verifier(opts).verifyProvider();
  });
});
