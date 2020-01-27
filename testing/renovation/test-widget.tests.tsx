import Widget, { WidgetModel } from '../../js/ui/test-widget';
import React from 'react';
import { mount, shallow } from 'enzyme';

describe('Widget', () => {
    it('should be rendered', () => {
        const model = new WidgetModel();
        const tree = shallow(<Widget {...model}></Widget>);

        expect(tree.find('.dx-widget').exists())
            .toBeTruthy();
        expect(tree.find('.dx-rtl').exists())
            .not.toBeTruthy();
    });

    it('should render children', () => {
        const model = new WidgetModel();
        model.children = <div className="custom-content" />;

        const tree = shallow(<Widget {...model}></Widget>);

        expect(tree.find('.dx-widget').children().length > 0)
            .toBeTruthy();
        expect(tree.find('.custom-content').exists())
            .toBeTruthy();
    });

    it('should be init with custom dimensions', () => {
        const model = new WidgetModel();
        model.width = 50;
        model.height = 75;

        const tree = mount(<Widget {...model}></Widget>);
        const widget = tree.find('.dx-widget');

        expect(widget.props().style.width)
            .toBe(50);
        expect(widget.props().style.height)
            .toBe(75);
    });

    it('should have `disabled` state', () => {
        const model = new WidgetModel();
        model.disabled = true;
        const tree = shallow(<Widget {...model}></Widget>);

        const widget = tree.find('.dx-widget.dx-state-disabled');
        expect(widget.exists())
            .toBeTruthy();
        expect(widget.props()['aria-disabled'])
            .toBe('true');
    });

    it('should have `hidden` state', () => {
        const model = new WidgetModel();
        model.visible = false;
        const tree = shallow(<Widget {...model}></Widget>);

        const widget = tree.find('.dx-widget.dx-state-invisible');
        expect(widget.exists())
            .toBeTruthy();
        expect(widget.props().hidden)
            .toBeTruthy();
        expect(widget.props()['aria-hidden'])
            .toBe('true');
    });

    it('should pass custom ARIA attributes', () => {
        const model = new WidgetModel();
        model.aria = { label: 'custom-aria-label', role: 'button', id: 'custom-id' };
        const tree = shallow(<Widget {...model}></Widget>);

        const widget = tree.find('.dx-widget');
        expect(widget.props()['aria-label'])
            .toBe('custom-aria-label');
        expect(widget.props().role)
            .toBe('button');
        expect(widget.props().id)
            .toBe('custom-id');
    });

    it('should have `dx-rtl` css class', () => {
        const model = new WidgetModel();
        model.rtlEnabled = true;
        const tree = shallow(<Widget {...model}></Widget>);

        expect(tree.find('.dx-widget.dx-rtl').exists())
            .toBeTruthy();
    });

    it('should pass custom css class name via elementAttributes', () => {
        const model = new WidgetModel();
        model.elementAttr = { class: 'custom-class' };
        const tree = shallow(<Widget {...model}></Widget>);

        expect(tree.find('.dx-widget.custom-class').exists())
            .toBeTruthy();
    });

    it('should pass `hint` property as a title', () => {
        const model = new WidgetModel();
        model.hint = 'custom-hint';
        const tree = shallow(<Widget {...model}></Widget>);

        expect(tree.find('.dx-widget').props().title)
            .toBe('custom-hint');
    });

    it('should provide `tabIndex`', () => {
        const model = new WidgetModel();
        model.focusStateEnabled = true;
        const tree = shallow(<Widget {...model}></Widget>);

        expect(tree.find('.dx-widget.dx-state-focused').exists())
            .toBeFalsy();
        expect(tree.find('.dx-widget').props().tabIndex)
            .toBe(0);
    });

    it('should provide custom `tabIndex`', () => {
        const model = new WidgetModel();
        model.focusStateEnabled = true;
        model.tabIndex = 10;
        const tree = shallow(<Widget {...model}></Widget>);

        expect(tree.find('.dx-widget.dx-state-focused').exists())
            .toBeFalsy();
        expect(tree.find('.dx-widget').props().tabIndex)
            .toBe(10);
    });

    it('should pass `accessKey` property', () => {
        const model = new WidgetModel();
        model.accessKey = 'x';
        const tree = shallow(<Widget {...model}></Widget>);

        expect(tree.find('.dx-widget').props().accessKey)
            .toBe('x');
    });

    it('should pass `disabled` state', () => {
        const model = new WidgetModel();
        model.disabled = true;
        const tree = shallow(<Widget {...model}></Widget>);

        expect(tree.find('.dx-widget').is('.dx-widget.dx-state-disabled'))
            .toBeTruthy();
    });

    // States

    it('should not have any state css class by defaul', () => {
        const model = new WidgetModel();
        const tree = shallow(<Widget {...model}></Widget>);

        const widget = tree.find('.dx-widget');
        expect(widget.is('.dx-widget.dx-state-active')).toBeFalsy();
        expect(widget.is('.dx-widget.dx-state-hover')).toBeFalsy();
        expect(widget.is('.dx-widget.dx-state-focused')).toBeFalsy();
    });

    it('should have `dx-state-active` css class in `active` state', () => {
        const model = new WidgetModel();
        const widget = new Widget(model);
        widget._active = true;
        const tree = shallow(widget.render());

        expect(tree.find('.dx-widget').is('.dx-state-active')).toBeTruthy();
    });

    it('should have `dx-state-hover` css class in `hovered` state', () => {
        const model = new WidgetModel();
        model.hoverStateEnabled = true;
        const widget = new Widget(model);
        widget._hovered = true;
        const tree = shallow(widget.render());

        expect(tree.find('.dx-widget').is('.dx-state-hover')).toBeTruthy();
    });

    it('should not have `dx-state-hover` css class when in `hovered` and `active` states', () => {
        const model = new WidgetModel();
        model.hoverStateEnabled = true;
        const widget = new Widget(model);
        widget._hovered = true;
        widget._active = true;
        const tree = shallow(widget.render());

        expect(tree.find('.dx-widget').is('.dx-state-hover')).toBeFalsy();
    });

    it('should not have `dx-state-hover` css class if it is `disabled`', () => {
        const model = new WidgetModel();
        model.hoverStateEnabled = true;
        model.disabled = true;
        const widget = new Widget(model);
        widget._hovered = true;
        const tree = shallow(widget.render());

        expect(tree.find('.dx-widget').is('.dx-state-hover')).toBeFalsy();
    });

    it('should have `dx-state-focused` css class in `focused` state', () => {
        const model = new WidgetModel();
        model.focusStateEnabled = true;
        const widget = new Widget(model);
        widget._focused = true;
        const tree = shallow(widget.render());

        expect(tree.find('.dx-widget').is('.dx-state-focused')).toBeTruthy();
    });

    it('should not have `dx-state-hover` css class if it is `disabled`', () => {
        const model = new WidgetModel();
        model.focusStateEnabled = true;
        model.disabled = true;
        const widget = new Widget(model);
        widget._focused = true;
        const tree = shallow(widget.render());

        expect(tree.find('.dx-widget').is('.dx-state-focused')).toBeFalsy();
        expect(tree.find('.dx-widget').props().tabIndex).toBe(undefined);
    });
});
