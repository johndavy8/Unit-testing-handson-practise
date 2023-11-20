import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import '../src/header/Header.js';

describe('loan-header', () => {
  it('renders correctly', async () => {
    const el = await fixture(html`<loan-header></loan-header>`);
    expect(el).to.exist;
    expect(el.shadowRoot.querySelector('.container')).to.exist;
    expect(el.shadowRoot.querySelector('header')).to.exist;
  });

  it('changes language to EN on button click', async () => {
    const el = await fixture(html`<loan-header></loan-header>`);
    const localeChangedStub = stub(el, 'localeChanged');

    el.shadowRoot.getElementById('en-GB').click();

    expect(localeChangedStub).to.have.been.calledOnceWithMatch({
      target: { id: 'en-GB' },
    });
  });

  it('changes language to NL on button click', async () => {
    const el = await fixture(html`<loan-header></loan-header>`);
    const localeChangedStub = stub(el, 'localeChanged');

    el.shadowRoot.getElementById('nl-NL').click();

    expect(localeChangedStub).to.have.been.calledOnceWithMatch({
      target: { id: 'nl-NL' },
    });
  });

  it('updates styles on language change to EN', async () => {
    const el = await fixture(html`<loan-header></loan-header>`);
    el.shadowRoot.getElementById('en-GB').click();

    expect(el.shadowRoot.getElementById('en-GB').classList.contains('bg-btn-color')).to.be.true;
    expect(el.shadowRoot.getElementById('nl-NL').classList.contains('bg-btn-color')).to.be.false;
  });

  it('updates styles on language change to NL', async () => {
    const el = await fixture(html`<loan-header></loan-header>`);
    el.shadowRoot.getElementById('nl-NL').click();

    expect(el.shadowRoot.getElementById('nl-NL').classList.contains('bg-btn-color')).to.be.true;
    expect(el.shadowRoot.getElementById('en-GB').classList.contains('bg-btn-color')).to.be.false;
  });
});
