import Selective from './selective'
import { defaultFieldTypes } from './selective-standard'
import {
  MDCTextField
} from '@material/textfield'
import {
  MDCRipple
} from '@material/ripple'

const configEl = document.querySelector('#config')
const configMdc = document.querySelector('.content__config .mdc-text-field')
const dataEl = document.querySelector('#data')
const dataMdc = document.querySelector('.content__data .mdc-text-field')
const fieldsEl = document.querySelector('#fields')
const guessEl = document.querySelector('.content__data__actions .mdc-button')
const guessMdc = document.querySelector('.content__data__actions .mdc-button')
const valueEl = document.querySelector('#value')
const valueMdc = document.querySelector('.content__value .mdc-text-field')

// -----------------------------------------------------------
// Basic example of using Selective.
// -----------------------------------------------------------

// TODO: Bring back the simple version when placeholders work correctly.
// const exampleSelective = new Selective(fieldsEl, JSON.parse(configEl.value))

// exampleSelective.addFieldTypes(defaultFieldTypes)
const editorConfig = JSON.parse(configEl.value)
const exampleSelective = new Selective(fieldsEl)
exampleSelective.addFieldTypes(defaultFieldTypes)
// Set the config after the default field types are added untile placeholders
// are working again.
exampleSelective.setConfig(editorConfig)

exampleSelective.data = JSON.parse(dataEl.value)


// -----------------------------------------------------------
// Functionality for making the example page function.
// -----------------------------------------------------------

// Make the object available in the global scope for ad lib testing.
window.selective = exampleSelective

// Create the example MDC components.
new MDCTextField(configMdc)
new MDCTextField(dataMdc)
new MDCTextField(valueMdc)
new MDCRipple(guessMdc)

dataEl.addEventListener('change', (e) => {
  exampleSelective.data = JSON.parse(dataEl.value)
})

guessEl.addEventListener('click', (e) => {
  const newConfig = exampleSelective.guessFields()
  exampleSelective.setConfig(newConfig)
  configEl.textContent = JSON.stringify(newConfig, null, 2)
})

const handleValueChange = (e) => {
  valueEl.textContent = JSON.stringify(exampleSelective.value, null, 2)
}
handleValueChange()
window.setInterval(handleValueChange, 2000)

window.setTimeout((e) => {
  console.log('Is Clean?', exampleSelective.isClean);
}, 3000)

// Use to test that updating part of the data works correctly.
// const handleUpdate = () => {
//   exampleSelective.update({
//     "title": "The stuff nightmares are made of.",
//     "body": "Truffle snifflers.",
//   })
//   console.log('Updated data. Is Clean?', exampleSelective.isClean);
// }
// window.setTimeout(handleUpdate, 6000)
