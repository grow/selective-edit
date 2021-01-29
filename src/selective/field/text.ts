import {Field, FieldConfig} from '../field';
import {TemplateResult, html} from 'lit-html';
import {DeepObject} from '../../utility/deepObject';
import {SelectiveEditor} from '../editor';
import {Types} from '../types';
import {classMap} from 'lit-html/directives/class-map';

export interface TextFieldConfig extends FieldConfig {
  /**
   * Placeholder for the text input.
   */
  placeholder?: string;
}

export class TextField extends Field {
  config: TextFieldConfig;

  constructor(types: Types, config: TextFieldConfig, fieldType = 'text') {
    super(types, config, fieldType);
    this.config = config;
  }

  templateInput(editor: SelectiveEditor, data: DeepObject): TemplateResult {
    const value = this.currentValue || '';
    return html`${this.templateHelp(editor, data)}
      <input
        class=${classMap(this.classesForInput())}
        type="text"
        id="${this.uid}"
        placeholder=${this.config.placeholder || ''}
        @input=${this.handleInput.bind(this)}
        value=${value}
      />
      ${this.templateErrors(editor, data)}`;
  }
}