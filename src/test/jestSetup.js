import React from 'react';
import {
  configure, shallow, mount, render
} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';


configure({ adapter: new Adapter() });

const middleware = [thunk];
const storeMock = configureMockStore(middleware);

global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.storeMock = storeMock;
global.toJson = toJson;
