import React from 'react'
import { shallow } from 'enzyme'

import Centered from '../Centered'

describe('Centered component', () => {
  describe('smoke test', () => {
    it('should render without any errors', () => {
      expect(() => {
        shallow(<Centered />)
      }).not.toThrow()
    })

    it('should render correctly', () => {
      const wrapper = shallow(<Centered />)
      expect(wrapper).toMatchSnapshot()
      expect(wrapper.dive()).toMatchSnapshot()
    })
  })

  describe('children prop test', () => {
    it('should not have children', () => {
      expect(shallow(<Centered />).children()).toHaveLength(0)
    })

    it('should have children', () => {
      const Content = () => <div>content</div>
      const wrapper = shallow(
        <Centered>
          <Content />
        </Centered>,
      )
      expect(wrapper.children()).toHaveLength(1)
      expect(wrapper.children().contains(<Content />)).toBe(true)
    })
  })

  describe('component prop test', () => {
    it('should have correct default component type', () => {
      expect(
        shallow(<Centered />)
          .dive()
          .type(),
      ).toEqual('div')
    })

    it('should custom component type', () => {
      const Custom = () => null
      expect(
        shallow(<Centered component="section" />)
          .dive()
          .type(),
      ).toEqual('section')
      expect(
        shallow(<Centered component={Custom} />)
          .dive()
          .type(),
      ).toBe(Custom)
    })
  })

  describe('className prop test', () => {
    it('should contain default className', () => {
      expect(
        shallow(<Centered />)
          .dive()
          .hasClass('root'),
      ).toBe(true)
    })

    it('should contain custom className', () => {
      const wrapper = shallow(<Centered className="customClass" />)
      expect(wrapper.dive().hasClass('root')).toBe(true)
      expect(wrapper.dive().hasClass('customClass')).toBe(true)
    })
  })

  describe('props forwarding test', () => {
    it('should forward other props', () => {
      const wrapper = shallow(<Centered custom1="foo" custom2 />)
      expect(wrapper.dive().prop('custom1')).toBe('foo')
      expect(wrapper.dive().prop('custom2')).toBe(true)
    })

    it('should not forward own props', () => {
      const wrapper = shallow(<Centered component="article" />)
      expect(wrapper.dive().prop('children')).toBeUndefined()
      expect(wrapper.dive().prop('classes')).toBeUndefined()
      expect(wrapper.dive().prop('component')).toBeUndefined()
    })
  })
})
