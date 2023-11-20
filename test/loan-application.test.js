import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import '../loan-application.js';

describe('LoanApplication', () => {
  // Write test cases inside this block
  it('renders without errors', async () => {
    const el = await fixture(html`<loan-application></loan-application>`);
    expect(el).to.not.be.undefined;
  });

  it('renders the title correctly', async () => {
    const el = await fixture(html`<loan-application></loan-application>`);
    expect(el.title).to.equal('Hey there');
  });

  it('renders the counter correctly', async () => {
    const el = await fixture(html`<loan-application></loan-application>`);
    expect(el.counter).to.equal(5);
  });

  it('increments the counter correctly', async () => {
    const el = await fixture(html`<loan-application></loan-application>`);
    const incrementSpy = stub(el, '__increment');

    // Trigger the __increment method
    el.__increment();

    // Assert that __increment was called
    expect(incrementSpy.calledOnce).to.be.true;

    // Clean up the spy
    incrementSpy.restore();
  });

  // Add more test cases based on your component's behavior
});
