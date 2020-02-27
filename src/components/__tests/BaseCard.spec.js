import {
    mount,
    shallowMount,
} from '@vue/test-utils';
import {
    mountComponentWithProps
} from './helpers';

import BaseCard from '@/components/shared/baseCard';

describe('baseCard.vue', () => {
    let baseCardWrapper = mount(BaseCard);
    let baseCardShallowWrapper = shallowMount(BaseCard);

    it('should render Vue instance', () => {
        expect(baseCardWrapper.isVueInstance()).toBeTruthy();
    });

    it('should have card classes and  element', () => {
        expect(baseCardShallowWrapper.find('div').exists()).toBe(true);
        expect(baseCardShallowWrapper.find('.card_wrapper').exists()).toBe(true);
    });

    it('should match passed props', () => {
        const baseCardProps = mountComponentWithProps(BaseCard, {
            propsData: {
                type: 'fullPage',
                shape: 'roundedTop',
                mode: 'default',
            }
        }).props();
        expect(baseCardProps.type).toBeDefined();
        expect(baseCardProps.type).toEqual('fullPage');
        expect(baseCardProps.shape).toBeDefined();
        expect(baseCardProps.shape).toEqual('roundedTop');
        expect(baseCardProps.mode).toBeDefined();
        expect(baseCardProps.mode).toEqual('default');
    });
    it('should match the class based on the passed props', () => {
        const baseCardProps = mountComponentWithProps(BaseCard, {
            propsData: {
                type: 'fullPage',
                shape: 'roundedTop',
            }
        });
        expect(baseCardProps.find('.card_wrapper_type--page').exists()).toBeTruthy();
        expect(baseCardProps.find('.card_wrapper_shape-round--corners').exists()).toBeTruthy();
    });
});