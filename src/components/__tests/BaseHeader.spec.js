import {
    mount,
    shallowMount,
} from '@vue/test-utils';
import {
    mountComponentWithProps
} from './helpers';

import BaseHeader from '@/components/shared/BaseHeader';

describe('BaseHeader.vue', () => {
    let BaseHeaderWrapper = mount(BaseHeader);
    let BaseHeaderShallowWrapper = shallowMount(BaseHeader);

    it('should render Vue instance', () => {
        expect(BaseHeaderWrapper.isVueInstance()).toBeTruthy();
    });

    it('should have header wrapper element', () => {
        expect(BaseHeaderShallowWrapper.find('div').exists()).toBe(true);
        expect(BaseHeaderShallowWrapper.find('.header_wrapper').exists()).toBe(true);
    });

    it('should match passed props', () => {
        const BaseHeaderProps = mountComponentWithProps(BaseHeader, {
            propsData: {
                label: 'customer form',
                level: 'medium',
                type: 'primary',
            }
        }).props();
        expect(BaseHeaderProps.type).toBeDefined();
        expect(BaseHeaderProps.type).toEqual('primary');
        expect(BaseHeaderProps.level).toBeDefined();
        expect(BaseHeaderProps.level).toEqual('medium');
        expect(BaseHeaderProps.label).toBeDefined();
        expect(BaseHeaderProps.label).toEqual('customer form');
    });
    it('should match the class based on the passed props', () => {
        const BaseHeaderProps = mountComponentWithProps(BaseHeader, {
            propsData: {
                type: 'primary',
                level: 'medium',
            }
        });
        expect(BaseHeaderProps.find('.header_color--primary').exists()).toBeTruthy();
        expect(BaseHeaderProps.find('h2').exists()).toBeTruthy();
    });
});