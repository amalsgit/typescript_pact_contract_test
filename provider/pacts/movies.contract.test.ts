import { Verifier, VerifierOptions } from '@pact-foundation/pact';
import path from 'path';

describe('Verify Movies Consumer', () => {
  jest.setTimeout(10000);
  it('should validate consumer expectation', () => {
    // Define contract tests configs
    const opts: VerifierOptions = {
      logDir: path.resolve(process.cwd(), 'logs/movies'),
      logLevel: 'info',
      provider: 'Movie Provider',
      providerVersion: '1.0.0',
      providerBaseUrl: 'http://localhost:3001',
      pactUrls: [path.resolve(process.cwd(), '../', 'contracts', 'movie_consumer-movie_producer.json')],
      pactBrokerUrl: 'http://localhost:9292/',
      publishVerificationResult: true,
    };
    // Verify provider against the contract
    return new Verifier(opts).verifyProvider();
  });
});
