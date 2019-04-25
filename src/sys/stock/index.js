import React, { Component } from 'react';
import { createForm } from 'rc-form';
import { List, InputItem, Button, Radio, Picker } from 'antd-mobile';
import style from './index.less';

const { Item } = List;
const stocksVals = [{ label: '华西能源', value: 'hx' }, { label: '摩登大道', value: 'md' }];
const stocks = {
  hx: {
    prePrice: 4.25,
    preCount: 400,
  },
  md: {
    prePrice: 7.839,
    preCount: 700,
  },
};
class Stock extends Component {
  state = {
    type: 1, // 1：给定目标股价，计算购入手数；2：给定计划购入手数，计算最终股价
    result: '', // 最终计算结果
    stock: [], // 股票
  }

  _cal = (value) => {
    const { type } = this.state;
    const { curPrice, goal, stock } = value;
    const { prePrice, preCount } = stocks[stock];
    let result;
    if (type === 1) {
      result = Number((Number(goal) * preCount - prePrice * preCount) / (Number(curPrice) - Number(goal))).toFixed(0);
    } else {
      result = Number((Number(curPrice) * Number(goal) + prePrice * preCount) / (Number(goal) + preCount)).toFixed(3);
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
  }

  render() {
    const { form } = this.props;
    const { getFieldProps, getFieldError } = form;
    const { type, result, stock } = this.state;
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
          <InputItem
            {...getFieldProps('curPrice', {
              rules: [
                { required: true, message: '请输入当前价格' },
              ],
            })}
            clear
            placeholder="请输入当前价格"
            type="money"
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
            type="money"
            moneyKeyboardAlign="right"
          >{type === 2 ? '购入手数' : '目标价格'}
          </InputItem>
          {getFieldError('goal') ? <div className={style.error}>{getFieldError('goal')}</div> : null}
        </List>
        <List renderHeader="操作">
          <Item
            extra={(
              <div>
                <Button type="primary" size="small" inline onClick={this._submit}>Submit</Button>
                <Button size="small" inline style={{ marginLeft: '5px' }} onClick={this._reset}>Reset</Button>
              </div>
            )}
          >Operation
          </Item>
        </List>
        <List renderHeader="结果">
          <Item extra={result + (type === 2 ? '元' : '手')}>{type === 1 ? '需购入手数为' : '目标价格为'}</Item>
        </List>
      </div>
    );
  }
}

export default createForm()(Stock);
