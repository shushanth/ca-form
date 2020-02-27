// import {
//     mount,
//     shallowMount,
// } from '@vue/test-utils';
// import {
//     mountComponentWithProps
// } from './helpers';

// import BaseInput from '@/components/shared/BaseInput';

// describe('BaseInput.vue', () => {
//     let BaseInputWrapper = mount(BaseInput);
//     let BaseInputShallowWrapper = shallowMount(BaseInput, { sync: false });

//     it('should render Vue instance', () => {
//         expect(BaseInputWrapper.isVueInstance()).toBeTruthy();
//     });

//     it('should have input wrapper element', () => {
//         expect(BaseInputShallowWrapper.find('div').exists()).toBe(true);
//         expect(BaseInputShallowWrapper.find('.input_element').exists()).toBe(true);
//         expect(BaseInputShallowWrapper.find('.input').exists()).toBe(true);
//     });

//     it('should match passed props', () => {
//         const BaseInputProps = mountComponentWithProps(BaseInput, {
//             propsData: {
//                 label: 'your age',
//                 subLabel: 'your name',
//                 shape: 'rounded',
//                 formType: 'password',
//                 elementType: 'password',
//                 onUpdate: () => {},
//                 errors: { value: false, text: ''},
//             }
//         }).props();
//         expect(BaseInputProps.label).toBeDefined();
//         expect(BaseInputProps.label).toEqual('label');
//         expect(BaseInputProps.subLabel).toBeDefined();
//         expect(BaseInputProps.subLabel).toEqual('your name');
//         expect(BaseInputProps.shape).toBeDefined();
//         expect(BaseInputProps.shape).toEqual('rounded');
//         expect(BaseInputProps.formType).toBeDefined();
//         expect(BaseInputProps.formType).toEqual('password');
//         expect(BaseInputProps.errors).toBeDefined();
//         expect(BaseInputProps.errors.value).toEqual(false);
//         expect(BaseInputProps.errors.text).toEqual('');
//     });
//     it('should match the class based on the passed props', () => {
//         const BaseInputProps = mountComponentWithProps(BaseInputProps, {
//             propsData: {
//                 shape: 'primary',
//                 errors: {value: true, text: 'error'},
//             }
//         });
//         expect(BaseInputProps.find('.label_color--primary').exists()).toBeTruthy();
//         expect(BaseInputProps.find('p.label_item').exists()).toBeTruthy();
//     });
//     it('should match the class based on the passed props for sublabel elements', () => {
//         const BaseInputProps = mountComponentWithProps(BaseInputProps, {
//             propsData: {
//                 shape: 'error',
//                 errors: {value: true, error: 'error'}
//             }
//         });
//         expect(BaseInputProps.find('input_element--rounded').exists()).toBeTruthy();
//         expect(BaseInputProps.find('input_element--error').exists()).toBeTruthy();
//     });
// });