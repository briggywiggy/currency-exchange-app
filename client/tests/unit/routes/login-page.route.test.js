import React from 'react';
import { shallow } from 'enzyme';
import LoginPage from '../../../src/routes/LoginPage/login-page.route';

test('should render LoadingPage correctly', () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper).toMatchSnapshot();
})