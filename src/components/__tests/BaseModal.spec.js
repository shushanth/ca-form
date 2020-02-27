import {
    mount,
    shallowMount,
} from '@vue/test-utils';
import {
    mountComponentWithProps
} from './helpers';

import BaseModal from '@/components/shared/baseModal';

describe('BaseModal.vue', () => {
    let baseModalWrapper = mount(BaseModal);
    let baseModalShallowWrapper = shallowMount(BaseModal);

    it('should render Vue instance', () => {
        expect(baseModalWrapper.isVueInstance()).toBeTruthy();
    });

    it('should have card classes and  element', () => {
        expect(baseModalShallowWrapper.find('div').exists()).toBe(true);
        expect(baseModalShallowWrapper.find('.modal_wrapper').exists()).toBe(true);
    });

    it('should match passed props', () => {
        const BaseModalProps = mountComponentWithProps(BaseModal, {
            propsData: {
                size: 'small',
                align: 'rightTopCorner',
                shape: 'small',
                type: 'default',
                id: '1'
            }
        }).props();
        expect(BaseModalProps.size).toBeDefined();
        expect(BaseModalProps.size).toEqual('small');
        expect(BaseModalProps.align).toBeDefined();
        expect(BaseModalProps.align).toEqual('rightTopCorner');
        expect(BaseModalProps.shape).toBeDefined();
        expect(BaseModalProps.type).toBeDefined();
        expect(BaseModalProps.type).toEqual('default');
    });
    it('should match the class based on the passed props', () => {
        const BaseModalProps = mountComponentWithProps(BaseModal, {
            propsData: {
                size: 'small',
                align: 'rightTopCorner',
            }
        });
        expect(BaseModalProps.find('.modal_align--right-top').exists()).toBeTruthy();
        expect(BaseModalProps.find('.modal_size--small').exists()).toBeTruthy();
    });
});