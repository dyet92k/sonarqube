/*
 * SonarQube
 * Copyright (C) 2009-2016 SonarSource SA
 * mailto:contact AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import Changelog from '../Changelog';
import ChangesList from '../ChangesList';

function createEvent (overrides) {
  return {
    date: '2016-01-01',
    authorName: 'John',
    action: 'ACTIVATED',
    ruleKey: 'squid1234',
    ruleName: 'Do not do this',
    params: {},
    ...overrides
  };
}

describe('Quality Profiles :: Changelog', () => {
  it('should render events', () => {
    const events = [createEvent(), createEvent()];
    const changelog = shallow(<Changelog events={events}/>);
    expect(changelog.find('tbody').find('tr')).to.have.length(2);
  });

  it('should render event date', () => {
    const events = [createEvent()];
    const changelog = shallow(<Changelog events={events}/>);
    expect(changelog.text()).to.include('2016');
  });

  it('should render author', () => {
    const events = [createEvent()];
    const changelog = shallow(<Changelog events={events}/>);
    expect(changelog.text()).to.include('John');
  });

  it('should render system author', () => {
    const events = [createEvent({ authorName: undefined })];
    const changelog = shallow(<Changelog events={events}/>);
    expect(changelog.text()).to.include('System');
  });

  it('should render action', () => {
    const events = [createEvent()];
    const changelog = shallow(<Changelog events={events}/>);
    expect(changelog.text()).to.include('ACTIVATED');
  });

  it('should render rule', () => {
    const events = [createEvent()];
    const changelog = shallow(<Changelog events={events}/>);
    expect(changelog.text()).to.include('Do not do this');
    expect(changelog.find('a').prop('href')).to.include('rule_key=squid1234');
  });

  it('should render ChangesList', () => {
    const params = { severity: 'BLOCKER' };
    const events = [createEvent({ params })];
    const changelog = shallow(<Changelog events={events}/>);
    const changesList = changelog.find(ChangesList);
    expect(changesList).to.have.length(1);
    expect(changesList.prop('changes')).to.equal(params);
  });
});
