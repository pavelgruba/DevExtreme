import { TemplateBase } from './template_base';
import { normalizeTemplateElement } from '../utils/dom';
import { when } from '../utils/deferred';

export class FunctionTemplate extends TemplateBase {
    constructor(render) {
        super();
        this._render = render;
    }

    _renderCore(options) {
        return when(this._render(options)).then(normalizeTemplateElement);
    }
}
