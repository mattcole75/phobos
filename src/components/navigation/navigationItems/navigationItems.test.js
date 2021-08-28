import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './navigationItems';
import NavigationItem from './navigationItem/navigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should render two <NavigationItem /> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem /> elements if authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render a "Log in" <NavigationItem /> element if not authenticated', () => {
        expect(wrapper.contains(<NavigationItem link="/auth">Log in</NavigationItem>)).toEqual(true);
    });

    it('should render a "Log out" <NavigationItem /> element if authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link="/auth">Log out</NavigationItem>)).toEqual(true);
    });

});