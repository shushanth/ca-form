import {
    mount,
    shallowMount,
} from '@vue/test-utils';
import {
    mountComponentWithProps
} from './helpers';

import BaseLabel from '@/components/shared/BaseLabel';

describe('BaseLabel.vue', () => {
    let BaseLabelWrapper = mount(BaseLabel);
    let BaseLabelShallowWrapper = shallowMount(BaseLabel);

    it('should render Vue instance', () => {
        expect(BaseLabelWrapper.isVueInstance()).toBeTruthy();
    });

    it('should have header wrapper element', () => {
        expect(BaseLabelShallowWrapper.find('div').exists()).toBe(true);
        expect(BaseLabelShallowWrapper.find('.label_wrapper').exists()).toBe(true);
    });

    it('should match passed props', () => {
        const BaseHeaderProps = mountComponentWithProps(BaseLabel, {
            propsData: {
                label: 'hello',
                subLabel: 'customer app',
                labelLevel: 'primary',
                subLabelSize: 'default',
            }
        }).props();
        expect(BaseHeaderProps.label).toBeDefined();
        expect(BaseHeaderProps.label).toEqual('hello');
        expect(BaseHeaderProps.subLabel).toBeDefined();
        expect(BaseHeaderProps.subLabel).toEqual('customer app');
        expect(BaseHeaderProps.subLabelSize).toBeDefined();
        expect(BaseHeaderProps.subLabelSize).toEqual('default');
    });
    it('should match the class based on the passed props', () => {
        const BaseLabelProps = mountComponentWithProps(BaseLabel, {
            propsData: {
                labelLevel: 'primary',
                label: 'medium',
            }
        });
        expect(BaseLabelProps.find('.label_color--primary').exists()).toBeTruthy();
        expect(BaseLabelProps.find('p.label_item').exists()).toBeTruthy();
    });
    it('should match the class based on the passed props for sublabel elements', () => {
        const BaseLabelProps = mountComponentWithProps(BaseLabel, {
            propsData: {
                labelLevel: 'error',
                subLabelSize: 'small',
            }
        });
        expect(BaseLabelProps.find('p.label_subitem').exists()).toBeTruthy();
        expect(BaseLabelProps.find('p.label_error').exists()).toBeTruthy();
        expect(BaseLabelProps.find('p.label_subitem_size--small').exists()).toBeTruthy();
    });
});