import React, { Component } from 'react';
import { createForm } from 'rc-form';
import { List, InputItem, Button, Radio, Picker, Flex } from 'antd-mobile';
import Footer from 'footer';
import style from './index.less';

const { Item } = List;
const stocksVals = [{
  label: '华西能源',
  value: 'hx',
}, {
  label: '摩登大道',
  value: 'md',
}, {
  label: '飞马国际',
  value: 'fm',
}];
const stocks = {
  hx: {
    prePrice: 3.989,
    preCount: 900,
  },
  md: {
    prePrice: 8.243,
    preCount: 300,
  },
  fm: {
    prePrice: 7.41,
    preCount: 400,
  },
};
class Stock extends Component {
  state = {
    type: 1, // 1：给定目标股价，计算购入手数；2：给定计划购入手数，计算最终股价
    isAvoidFive: 2, // 1：免5；2：不免5
    result: '', // 最终计算结果
    stock: [], // 股票
  }

  _cal = (value) => {
    const { type, isAvoidFive } = this.state;
    let { curPrice, goal, commissionRate } = value;
    const { stock } = value;
    curPrice = Number(curPrice);
    goal = Number(goal);
    commissionRate = Number(commissionRate) / 10000;
    const { prePrice, preCount } = stocks[stock];
    let result;
    let result2;
    let commission;
    const preAmount = prePrice * preCount;
    if (type === 1) {
      commission = 5;
      // 暂不支持佣金计算
      result = Number((goal * preCount - preAmount) / (curPrice * (1 + commissionRate) - goal))
        .toFixed(0);
      result2 = Number((goal * preCount - preAmount - commission) / (curPrice - goal))
        .toFixed(0);
      if (result2 > result) {
        result = result2;
      }
    } else {
      const dealAmount = curPrice * goal;
      commission = dealAmount * commissionRate;
      if (!isAvoidFive) {
        if (commission < 5) {
          commission = 5;
        }
      }
      const allCount = goal + preCount;
      result = Number((dealAmount + commission + preAmount) / allCount).toFixed(3);
    }
    this.setState({
      result,
    });
  }

  _submit = () => {
    const { form } = this.props;
    form.validateFields((error, value) => {
      if (!error) {
        this._cal(value);
      }
    });
  }

  _reset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      result: '',
      stock: [],
    });
  }

  render() {
    const { form, history } = this.props;
    const { getFieldProps, getFieldError } = form;
    const { type, result, stock, isAvoidFive } = this.state;
    const stockInfo = stocks[stock];
    return (
      <div className={style.app}>
        <List renderHeader="计算器">
          <Picker
            data={stocksVals}
            cols={1}
            {...getFieldProps('stock', {
              onChange: (value) => {
                this.setState({
                  stock: value,
                });
              },
              rules: [
                { required: true, message: '请选择一支股票' },
              ],
            })}
          >
            <List.Item arrow="horizontal">股票</List.Item>
          </Picker>
          {getFieldError('stock') ? <div className={style.error}>{getFieldError('stock')}</div> : null}
          <Item extra={(stockInfo && stockInfo.prePrice) || ''}>原成本价</Item>
          <Item extra={(stockInfo && stockInfo.preCount) || ''}>持有数量</Item>
        </List>
        <List renderHeader="佣金设置">
          <InputItem
            {...getFieldProps('commissionRate', {
              initialValue: 2.5,
              rules: [
                { required: true, message: '请输入佣金比例' },
              ],
            })}
            clear
            placeholder="请输入佣金比例"
            type="digit"
            moneyKeyboardAlign="right"
          >佣金比例
          </InputItem>
          {getFieldError('commissionRate') ? <div className={style.error}>{getFieldError('commissionRate')}</div> : null}
        </List>
        <List renderHeader="是否免5">
          <Item>
            <Radio
              className="count"
              checked={isAvoidFive === 1}
              onChange={() => {
                this.setState({
                  isAvoidFive: 1,
                });
              }}
            >是
            </Radio>
            <Radio
              className="goal"
              checked={isAvoidFive === 2}
              onChange={() => {
                this.setState({
                  isAvoidFive: 2,
                });
              }}
            >否
            </Radio>
          </Item>
        </List>
        <List renderHeader="输入当前价格">
          <InputItem
            {...getFieldProps('curPrice', {
              rules: [
                { required: true, message: '请输入当前价格' },
              ],
            })}
            clear
            placeholder="请输入当前价格"
            type="digit"
            moneyKeyboardAlign="right"
          >当前价格
          </InputItem>
          {getFieldError('curPrice') ? <div className={style.error}>{getFieldError('curPrice')}</div> : null}
        </List>
        <List renderHeader="选择要计算的目标">
          <Item>
            <Radio
              className="count"
              checked={type === 1}
              onChange={() => {
                this.setState({
                  type: 1,
                });
              }}
            >计算需购入手数
            </Radio>
            <Radio
              className="goal"
              checked={type === 2}
              onChange={() => {
                this.setState({
                  type: 2,
                });
              }}
            >计算目标价格
            </Radio>
          </Item>
          <InputItem
            {...getFieldProps('goal', {
              rules: [
                { required: true, message: `请输入${type === 2 ? '购入手数' : '目标价格'}` },
              ],
            })}
            clear
            placeholder={`请输入${type === 2 ? '购入手数' : '目标价格'}`}
            type="digit"
            moneyKeyboardAlign="right"
          >{type === 2 ? '购入手数' : '目标价格'}
          </InputItem>
          {getFieldError('goal') ? <div className={style.error}>{getFieldError('goal')}</div> : null}
        </List>
        <List renderHeader="操作">
          <Item>
            <Flex justify="end">
              <Button type="primary" size="small" inline onClick={this._submit}>提交</Button>
              <Button className={style.btn} type="ghost" size="small" inline onClick={this._reset}>重置</Button>
            </Flex>
          </Item>
        </List>
        <List renderHeader="结果">
          <Item extra={result + (type === 2 ? '元' : '手')}>{type === 1 ? '需购入手数为' : '目标价格为'}</Item>
        </List>
        <Footer selectedTab="my" history={history} />
      </div>
    );
  }
}

export default createForm()(Stock);
