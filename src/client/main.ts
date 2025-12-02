import createGrpcClient from './grpcClient';
import { createPoll, vote, getResults, subscribeToResults } from './pollService';
import type { PollOption } from './generated/poll/PollOption';
import { StreamResultsResponse } from './generated/poll/StreamResultsResponse';
import { Poll } from './generated/poll/Poll';

async function main() {
  using client = createGrpcClient();
  console.log('gRPC Client connected to localhost:50051');

  try {
    console.log('\n--- Creating poll ---');
    const createResponse = await createPoll(client, 'Best eCom engine?', ['Magento', 'Commercetools', 'Shopify']);
    console.log('Created poll:', createResponse.poll);

    const poll = createResponse.poll! as Required<Poll>

    console.log('\n--- Voting ---');
    const voteResponse = await vote(client, poll.id, poll.options[0].id!);
    console.log('Vote success:', voteResponse.success);

    console.log('\n--- Getting results ---');
    const resultsResponse = await getResults(client, poll.id);

    console.log('Results:');
    resultsResponse.poll?.options?.forEach((opt: PollOption) => {
      console.log(`  ${opt.text}: ${opt.votes} votes`);
    });

    console.log('\n--- Subscribing to results ---');
    const subscription = subscribeToResults(
      client,
      poll.id,
      (response: StreamResultsResponse) => {
        console.log(`\n[${response.updateNumber}] Updated results:`);
        response.poll?.options?.forEach((opt: PollOption) => {
          console.log(`  ${opt.text}: ${opt.votes} votes`);
        });
      },
      (error: Error & { code?: number }) => {
        if (error.code === 1) {
          console.log('Subscription cancelled by client.');
          return;
        }

        console.error('Subscription error:', error);
      }
    );

    console.log('\n--- Simulating votes to see streaming updates ---');
    for (let i = 0; i < 20; i++) {
      const optionId = poll.options[i % poll.options.length].id!;

      await vote(client, poll.id, optionId);

      await new Promise(res => setTimeout(res, 1000));
    }

    console.log('\n\n\n\n--- Done ---');

    subscription.cancel();
  } catch (error) {
    console.error('Error:', error);
  }
}

await main();
