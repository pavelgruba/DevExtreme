import { Component, Prop, React, JSXComponent } from "../component_declaration/common";
import { getImageSourceType } from '../core/utils/icon';

import Widget, { WidgetModel } from './test-widget';

const ICON_CLASS = 'dx-icon';
const SVG_ICON_CLASS = 'dx-svg-icon';

const getImageContainerJSX = (source: string) => {
    const type = getImageSourceType(source);
    if (type === 'image')
        return (<img src={source} className={ICON_CLASS}></img>);
    if (type === 'fontIcon')
        return (<i className={`${ICON_CLASS} ${source}`}></i>);
    if (type === 'dxIcon')
        return (<i className={`${ICON_CLASS} ${ICON_CLASS}-${source}`}></i>);
    if (type === 'svg')
        return (<i className={`${ICON_CLASS} ${SVG_ICON_CLASS}`}>{source}></i>);
    return null;
}

const getCssClasses = (model: Button) => {
    const classNames = ['dx-button'];

    if (model.props.stylingMode === 'outlined') {
        classNames.push('dx-button-mode-outlined');
    } else if (model.props.stylingMode === 'text') {
        classNames.push('dx-button-mode-text');
    } else {
        classNames.push('dx-button-mode-contained');
    }

    if (model.props.type === 'danger') {
        classNames.push('dx-button-danger');
    } else if (model.props.type === 'default') {
        classNames.push('dx-button-default');
    } else if (model.props.type === 'success') {
        classNames.push('dx-button-success');
    } else if (model.props.type === 'back') {
        classNames.push('dx-button-back');
    } else {
        classNames.push('dx-button-normal');
    }

    if (model.props.text) {
        classNames.push('dx-button-has-text');
    }
    if (model.props.icon) {
        classNames.push('dx-button-has-icon');
    }
    return classNames.concat(model.props.classNames!).join(" ");
}

export const viewModelFunction = (model: Button) => {
    let icon;
    if (model.props.icon || model.props.type === 'back') {
        icon = getImageContainerJSX(model.props.icon || 'back');
    }
    const supportedKeys = () => {
        const click = e => {
            e.preventDefault();
            model.props.onClick && model.props.onClick(e);
        };

        return { space: click, enter: click };
    }

    return {
        ...model,
        elementAttr: { ...model.props.elementAttr, role: 'button' },
        aria: { label: model.props.text && model.props.text.trim() },
        cssClasses: getCssClasses(model),
        icon,
        supportedKeys,
    };
}

export const viewFunction = (viewModel: any) => (
    <Widget

        className={viewModel.cssClasses}
        onClick={viewModel.props.onClick}
        width={viewModel.props.width}
        height={viewModel.props.height}
        rtlEnabled={viewModel.props.rtlEnabled}
        elementAttr={viewModel.props.elementAttr}
        disabled={viewModel.props.disabled}
        visible={viewModel.props.visible}
        hint={viewModel.props.hint}
        tabIndex={viewModel.props.tabIndex}
        accessKey={viewModel.props.accessKey}
        focusStateEnabled={viewModel.props.focusStateEnabled}
        hoverStateEnabled={viewModel.props.hoverStateEnabled}
        activeStateEnabled={viewModel.props.activeStateEnabled}
        supportedKeys={viewModel.props.supportedKeys}
        aria={viewModel.props.aria}
    >
        {viewModel.props.contentRender && (
            <div className="dx-button-content">
                <viewModel.props.contentRender icon={viewModel.icon} text={viewModel.props.text} />
            </div>
        ) || (
                <div className="dx-button-content">
                    {viewModel.icon}
                    {viewModel.props.text && <span className="dx-button-text">{viewModel.props.text}</span>}
                </div>
            )}
    </Widget>
);

export class ButtonModel extends WidgetModel {
    @Prop() classNames?: string[];
    @Prop() icon?: string;
    @Prop() pressed?: boolean;
    @Prop() stylingMode?: string;
    @Prop() text?: string;
    @Prop() type?: string;
    @Prop() contentRender?: any;
}

@Component({
    name: 'Button',
    viewModel: viewModelFunction,
    view: viewFunction
})
export default class Button extends JSXComponent<ButtonModel> {
}
