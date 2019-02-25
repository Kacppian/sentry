import {Link} from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'react-emotion';

import Badge from 'app/components/badge';
import HookOrDefault from 'app/components/hookOrDefault';
import Tag from 'app/views/settings/components/tag';
import TextOverflow from 'app/components/textOverflow';

class SettingsNavItem extends React.Component {
  static propTypes = {
    label: PropTypes.node.isRequired,
    badge: PropTypes.node,
    index: PropTypes.bool,
    id: PropTypes.string,
  };

  render() {
    const {badge, label, index, id, ...props} = this.props;

    let renderedBadge = '';

    const LabelHook = HookOrDefault({
      hookName: 'sidebar:item-label',
      defaultComponent: TextOverflow,
    });

    if (badge === 'new') {
      renderedBadge = (
        <StyledTag priority="attention" size="small" border={true}>
          {badge}
        </StyledTag>
      );
    } else {
      renderedBadge = <Badge text={badge} />;
    }

    return (
      <StyledNavItem onlyActiveOnIndex={index} activeClassName="active" {...props}>
        <LabelHook id={id}>{label}</LabelHook>

        {badge ? renderedBadge : null}
      </StyledNavItem>
    );
  }
}

const StyledTag = styled(Tag)`
  margin-left: 0.25em;
`;

const StyledNavItem = styled(Link)`
  display: block;
  color: ${p => p.theme.gray2};
  font-size: 14px;
  line-height: 30px;
  position: relative;
  width: 100%;

  &.active {
    color: ${p => p.theme.gray5};

    &:before {
      background: ${p => p.theme.purple};
    }
  }

  &:hover,
  &:focus,
  &:active {
    color: ${p => p.theme.gray5};
  }

  &:before {
    position: absolute;
    content: '';
    display: block;
    top: 4px;
    left: -30px;
    height: 20px;
    width: 4px;
    background: transparent;
    border-radius: 0 2px 2px 0;
  }
`;

export default SettingsNavItem;
