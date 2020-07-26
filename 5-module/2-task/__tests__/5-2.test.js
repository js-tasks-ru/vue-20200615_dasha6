const { shallowMount, mount } = require('@vue/test-utils');
const { getSolutionPath } = require('taskbook-test-utils');
const BaseButton = require(getSolutionPath('components/BaseButton.vue'))
  .default;
const PrimaryButton = require(getSolutionPath('components/PrimaryButton.vue'))
  .default;
const SecondaryButton = require(getSolutionPath('components/PrimaryButton.vue'))
  .default;

describe('5-module-2-task', () => {
  const slots = { default: '<i>Italic Text</i>' };

  describe('BaseButton', () => {
    it('Компонент BaseButton должен иметь логический параметр block', () => {
      const wrapper = shallowMount(BaseButton);
      expect(wrapper.vm.$options.props.block.type).toBe(Boolean);
    });

    it('Компонент BaseButton должен иметь необязательный строковый параметр tag со значением button по умолчанию', () => {
      const wrapper = shallowMount(BaseButton);
      expect(wrapper.vm.$options.props.tag.type).toBe(String);
      expect(wrapper.vm.$options.props.tag.default).toBe('button');
    });

    it('Параметр tag у BaseButton должен иметь валидатор', () => {
      const wrapper = shallowMount(BaseButton);
      const validator = wrapper.vm.$options.props.tag.validator;
      expect(validator('button')).toBe(true);
      expect(validator('a')).toBe(true);
      expect(validator('router-link')).toBe(true);
      expect(validator('input')).toBe(false);
      expect(validator('anything')).toBe(false);
    });

    it('Компонент BaseButton должен рендерить своё содержимое', () => {
      const wrapper = shallowMount(BaseButton, { slots });
      expect(wrapper.find('button').html()).toContain(slots.default);
    });

    it('Компонент BaseButton не должен иметь класс button_block', () => {
      const wrapper = shallowMount(BaseButton);
      expect(wrapper.classes('button_block')).toBe(false);
    });

    it('Компонент BaseButton должен иметь класс button_block с параметром block', () => {
      const wrapper = shallowMount(BaseButton, { propsData: { block: true } });
      expect(wrapper.classes('button_block')).toBe(true);
    });

    it('Компонент BaseButton должен рендерить ссылку с tag=a', () => {
      const wrapper = shallowMount(BaseButton, {
        slots,
        propsData: { tag: 'a' },
      });
      expect(wrapper.find('a').exists()).toBe(true);
    });

    it('Компонент BaseButton должен рендерить ссылку с tag=a c переданными href и target', () => {
      const attrs = {
        href: 'https://course-vue.javascript.ru',
        target: '_blank',
      };
      const wrapper = shallowMount(BaseButton, {
        slots,
        attrs,
        propsData: { tag: 'a' },
      });
      const button = wrapper.find('a');
      expect(button.attributes('href')).toBe(attrs.href);
      expect(button.attributes('target')).toBe(attrs.target);
    });

    it('Компонент BaseButton должен обрабатывать нативный клик', () => {
      const handler = jest.fn();
      const wrapper = shallowMount(BaseButton, {
        listeners: {
          click: () => handler(),
        },
      });
      wrapper.trigger('click');
      expect(handler).toHaveBeenCalled();
    });
  });

  describe('PrimaryButton', () => {
    it('Компонент PrimaryButton должен рендерить компонент BaseButton с тем же содержимым', () => {
      const handler = jest.fn();
      const attrs = {
        href: 'https://course-vue.javascript.ru',
        target: '_blank',
      };
      const wrapper = mount(PrimaryButton, {
        slots,
        attrs,
        propsData: { tag: 'a' },
        listeners: {
          click: () => handler(),
        },
      });
      expect(wrapper.findComponent(BaseButton).exists()).toBe(true);
      const link = wrapper.find('a');
      expect(link.attributes('href')).toBe(attrs.href);
      expect(link.attributes('target')).toBe(attrs.target);
      wrapper.trigger('click');
      expect(handler).toHaveBeenCalled();
    });

    it('Компонент PrimaryButton должен рендерить кнопку с классом button_primary', () => {
      const wrapper = shallowMount(PrimaryButton);
      expect(wrapper.classes('button_primary')).toBe(true);
    });
  });

  describe('SecondaryButton', () => {
    it('Компонент SecondaryButton должен рендерить компонент BaseButton с тем же содержимым', () => {
      const handler = jest.fn();
      const attrs = {
        href: 'https://course-vue.javascript.ru',
        target: '_blank',
      };
      const wrapper = mount(SecondaryButton, {
        slots,
        attrs,
        propsData: { tag: 'a' },
        listeners: {
          click: () => handler(),
        },
      });
      expect(wrapper.findComponent(BaseButton).exists()).toBe(true);
      const link = wrapper.find('a');
      expect(link.attributes('href')).toBe(attrs.href);
      expect(link.attributes('target')).toBe(attrs.target);
      wrapper.trigger('click');
      expect(handler).toHaveBeenCalled();
    });

    it('Компонент SecondaryButton должен рендерить кнопку с классом button_secondary', () => {
      const wrapper = shallowMount(SecondaryButton);
      expect(wrapper.classes('button_primary')).toBe(true);
    });
  });
});
