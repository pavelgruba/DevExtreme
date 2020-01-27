import Button, { ButtonModel } from '../../js/ui/test-button';
import Widget from '../../js/ui/test-widget';

import React from 'react';
import { mount, shallow } from 'enzyme';

describe('Button', () => {

    it('should render text', () => {
        const model = new ButtonModel();
        model.text = 'My button';
        const tree = shallow(<Button {...model}></Button>);

        expect(tree.find('.dx-button-text').text()).toBe('My button');
    });

    it('should render template', () => {
        const model = new ButtonModel();
        model.text = 'My button';
        model.contentRender = ({text}) => (<div className="custom-content">{text}</div>);

        const tree = mount(<Button {...model}></Button>);

        expect(tree.find('.dx-button-content').children().props().text).toBe('My button');
        expect(tree.find('.dx-button-content .custom-content').text()).toBe('My button');
    });

    it('should have dx-widget class', () => {
        const model = new ButtonModel();
        const tree = shallow(<Button {...model}></Button>);

        expect(tree.type()).toBe(Widget);
    });

    it('should be of success type', () => {
        const model = new ButtonModel();
        model.type = 'success';
        const tree = shallow(<Button {...model}></Button>);

        expect(tree.is('.dx-button.dx-button-success')).toBeTruthy();
    });
});
