export { default as ElementsButton } from '../../components/elements/Button.vue'
export { default as ElementsCheckboxField } from '../../components/elements/CheckboxField.vue'
export { default as ElementsDatepicker } from '../../components/elements/Datepicker.vue'
export { default as ElementsInputField } from '../../components/elements/InputField.vue'
export { default as ElementsRadioButton } from '../../components/elements/RadioButton.vue'
export { default as ElementsSelectField } from '../../components/elements/SelectField.vue'
export { default as ElementsSwitchesField } from '../../components/elements/SwitchesField.vue'
export { default as ElementsTable } from '../../components/elements/Table.vue'
export { default as ModalAddLinkBannerModal } from '../../components/modal/AddLinkBannerModal.vue'
export { default as ModalConfirm } from '../../components/modal/ModalConfirm.vue'
export { default as ModalPreviewContentModal } from '../../components/modal/PreviewContentModal.vue'
export { default as ModalSuccessModal } from '../../components/modal/SuccessModal.vue'
export { default as ModalUploadImgModal } from '../../components/modal/UploadImgModal.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
