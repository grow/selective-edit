/**
 * Automatically guess the field configuration from data.
 */

import ConfigMixin from '../mixin/config'
import { Base, compose } from '../utility/compose'
import { autoDeepObject } from '../utility/deepObject'
import DataType from '../utility/dataType'

export default class AutoFields extends compose(ConfigMixin,)(Base) {
  constructor(data, config) {
    super()
    this.data = data
    this._data = autoDeepObject(data)
    this.setConfig(config)

    this._ignoredKeys = null
  }

  get config() {
    return {
      'fields': this.guessAll(),
    }
  }

  get ignoredKeys() {
    if (this._ignoredKeys == null) {
      const config = this.getConfig()
      this._ignoredKeys = config.get('ignoredKeys', [])
    }
    return this._ignoredKeys
  }

  _deepGuess(data, keyBase) {
    let fields = []
    keyBase = keyBase || []

    if (DataType.isArray(data)) {
      const firstValue = data.length ? data[0] : null
      fields.push(this._fieldConfig('', firstValue))
    } else {
      fields = fields.concat(this._deepGuessObject(data, keyBase))
    }

    return fields
  }

  _deepGuessObject(data, keyBase) {
    let fields = []
    keyBase = keyBase || []

    for (const key in data) {
      if (!data.hasOwnProperty(key)) {
        continue
      }

      // Skip ignored keys.
      if (this.ignoredKeys.includes(key)) {
        continue
      }

      const newKeyBase = keyBase.concat([key])
      const newData = data[key]
      if (DataType.isObject(newData)) {
        fields = fields.concat(this._deepGuessObject(newData, newKeyBase))
      } else {
        fields.push(this._deepGuessSimple(data[key], newKeyBase))
      }
    }

    return fields
  }

  _deepGuessSimple(data, keyBase) {
    const fullKey = keyBase.join('.')
    return this._fieldConfig(fullKey, data)
  }

  _fieldConfig(key, value) {
    const fieldType = this.typeFromValue(value, key)
    const label = this.labelFromKey(key)
    const fieldConfig = {
      "type": fieldType,
    }

    if (key != '') {
      fieldConfig['key'] = key
    }

    if (label != '') {
      fieldConfig['label'] = label
    }

    return fieldConfig
  }

  /**
   * Given a data key, guess the field configuration from the data.
   */
  guess(key) {
    return this._fieldConfig(
      key, this.typeFromValue(this._data.get(key), key))
  }

  /**
   * Guess all the field configuration from the data.
   */
  guessAll() {
    return this._deepGuess(this.data)
  }

  /**
   * From a key guess the label of the field.
   */
  labelFromKey(key) {
    key = key.replace(/\./g, ' ')
    key = key.replace(/\-/g, ' ')
    key = key.replace(/\_/g, ' ')
    return key.split(' ').map(function(word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ')
  }

  /**
   * From a value guess the type of field.
   */
  typeFromValue(value, key) {
    if (value === null || value === undefined) {
      return 'text'
    }
    if (DataType.isArray(value)) {
      return 'list'
    }
    if (value.length > 75) {
      return 'textarea'
    }
    return 'text'
  }
}
