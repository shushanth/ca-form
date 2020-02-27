import {
  mount,
  shallowMount,
} from '@vue/test-utils';
import { mountComponentWithProps } from './helpers';

import BaseButton from '@/components/shared/BaseButton';
describe('BaseButton.vue', () => {
  let baseButtonWrapper = mount(BaseButton);
  let baseButtonShallowWrapper = shallowMount(BaseButton);

  it('should render Vue instance', () => {
    expect(baseButtonWrapper.isVueInstance()).toBeTruthy();
  });

  it('should have button element', () => {
    expect(baseButtonShallowWrapper.find('button').exists()).toBe(true);
    expect(baseButtonShallowWrapper.find('.button').exists()).toBe(true);
  });

  it('should match passed props', () => {
    const baseButtonProps = mountComponentWithProps(BaseButton, {
      propsData: {
        label: 'submit',
        type: null,
        align: '',
        size: '',
        shape: 'round'
      }
    }).props();
    expect(baseButtonProps.label).toBeDefined();
    expect(baseButtonProps.label).toEqual('submit');
    expect(baseButtonProps.type).toBeDefined();
    expect(baseButtonProps.type).toEqual(null);
    expect(baseButtonProps.size).toBeDefined();
    expect(baseButtonProps.size).toEqual('');
    expect(baseButtonProps.shape).toBeDefined();
    expect(baseButtonProps.shape).toEqual('round');
  });
  it('should match the class based on the passed props', () => {
    const baseButtonProps = mountComponentWithProps(BaseButton, {
      propsData: {
        disabled: true,
        shape: 'rounded',
      }
    });
    expect(baseButtonProps.find('.button--disabled').exists()).toBeTruthy();
    expect(baseButtonProps.find('.button--rounded').exists()).toBeTruthy();
  });
});