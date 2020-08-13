import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from '../../../src/routes/NotFoundPage/not-found-page.route';

test('should render LoadingPage correctly', () => {
    const wrapper = shallow(<NotFoundPage />);
    expect(wrapper).toMatchSnapshot();
})