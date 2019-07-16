import React from 'react'
import { shallow } from 'enzyme'

import ErrorMessage from '../ErrorMessage'

describe('ErrorMessage component', () => {
  describe('smoke test', () => {
    it('should render without any errors', () => {
      expect(() => {
        shallow(<ErrorMessage />)
      }).not.toThrow()
    })

    it('should render correctly', () => {
      const wrapper = shallow(<ErrorMessage />)
      expect(wrapper).toMatchSnapshot()
      expect(wrapper.dive()).toMatchSnapshot()
    })
  })

  describe('refCode test', () => {
    it('should not display ref code section if no refCode passed', () => {
      expect(
        shallow(<ErrorMessage />)
          .dive()
          .exists('.refCode'),
      ).toBe(false)
    })

    it('should not add bottom gutter if no refCode passed', () => {
      expect(
        shallow(<ErrorMessage />)
          .dive()
          .findWhere(
            (node) =>
              node.prop('variant') === 'body2' && !node.prop('gutterBottom'),
          ),
      ).toHaveLength(1)
    })

    it('should display ref code section if refCode passed', () => {
      expect(
        shallow(<ErrorMessage refCode="REF_CODE_XYZ" />)
          .dive()
          .exists('.refCode'),
      ).toBe(true)
    })

    it('should add bottom gutter if refCode passed', () => {
      expect(
        shallow(<ErrorMessage refCode="REF_CODE_XYZ" />)
          .dive()
          .findWhere(
            (node) =>
              node.prop('variant') === 'body2' && node.prop('gutterBottom'),
          ),
      ).toHaveLength(1)
    })

    it('should display correct ref', () => {
      expect(
        shallow(<ErrorMessage refCode="REF_CODE_XYZ" />)
          .dive()
          .find('.refCode')
          .find('strong')
          .text(),
      ).toBe('REF_CODE_XYZ')
    })
  })

  describe('textOnly test', () => {
    it('should display container without textOnly', () => {
      expect(
        shallow(<ErrorMessage />)
          .dive()
          .hasClass('container'),
      ).toBe(true)
    })

    it('should display without container when textOnly', () => {
      expect(
        shallow(<ErrorMessage textOnly />)
          .dive()
          .hasClass('container'),
      ).toBe(false)
    })
  })

  describe('shortText test', () => {
    it('should display long variant', () => {
      const wrapper = shallow(<ErrorMessage />)
      expect(
        wrapper.dive().findWhere((node) => node.prop('variant') === 'h6'),
      ).toHaveLength(1)
      expect(
        wrapper.dive().findWhere((node) => node.prop('variant') === 'body2'),
      ).toHaveLength(1)
    })

    it('should display long variant', () => {
      const wrapper = shallow(<ErrorMessage shortText />)
      expect(
        wrapper.dive().findWhere((node) => node.prop('variant') === 'h6'),
      ).toHaveLength(1)
      expect(
        wrapper.dive().findWhere((node) => node.prop('variant') === 'body2'),
      ).toHaveLength(0)
    })

    it('should display long variant combined with textOnly', () => {
      expect(
        shallow(<ErrorMessage textOnly />)
          .dive()
          .findWhere((node) => node.prop('variant') === 'body2')
          .first()
          .children(),
      ).toHaveLength(3)
    })

    it('should display short variant combined with textOnly', () => {
      expect(
        shallow(<ErrorMessage shortText textOnly />)
          .dive()
          .findWhere((node) => node.prop('variant') === 'body2')
          .first()
          .children(),
      ).toHaveLength(1)
    })
  })
})
