import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';

export default class Footer extends Component {
  render() {
    const { history, selectedTab } = this.props;
    return (
      <div className="footer">
        <TabBar
          noRenderContent
          tintColor="#ff495a"
        >
          <TabBar.Item
            title="首页"
            key="首页"
            selected={selectedTab === 'home'}
            icon={(<div className="iconfont icon iconhome" />)}
            selectedIcon={(<div className="iconfont iconActive iconhome" />)}
            onPress={() => {
              history.push('/');
            }}
          />
          <TabBar.Item
            title="我的"
            key="我的"
            selected={selectedTab === 'my'}
            icon={(<div className="iconfont icon iconperson" />)}
            selectedIcon={(<div className="iconfont iconActive iconperson" />)}
            onPress={() => {
              history.push('/stock');
            }}
          />
        </TabBar>
      </div>
    );
  }
}
