import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tab from './Tab';
import './css/Tab.css';

class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.children[0].props.label, //Always active the first
    };
  }

  onClickTabItem = (label, isHidden) => {
    if (isHidden === false) {
      this.setState({ activeTab: label });
    }
  }

  render() {
    const {
      onClickTabItem,
      props: {
        children,
      },
      state: {
        activeTab,
      }
    } = this;

    return (
      <div className="tabs">
        <div className="tab-list">
          {children.map((child) => {
            const { label, isHidden } = child.props;
            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                isHidden={isHidden}
                onClick={() => onClickTabItem(label, isHidden)}
              />
            );
          })}
        </div>
        <div className="tab-content">
          {children.map((child) => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </div>
    );
  }
}

export default Tabs;