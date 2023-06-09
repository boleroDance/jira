import React from 'react'
import { Raw } from '../types/index'
import { Select } from "antd";
/**
 * 处理服务器传过来的id类型和antd默认类型不统一的情况
 * 
 * value 可以传入多种类型的值
 * onChange只会回调 number|undefined 类型
 * 当 isNaN(number(value)) 为true的时候，代表选择默认类型 Number(1a) => NaN Number(undefined) NaN
 * 当选择默认类型的时候，onChange会回调undefined
 * @param props 
 * */

type SelectProps = React.ComponentProps<typeof Select>

interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange'| 'defaultOptionName' | 'options'> {
  value?: Raw | null | undefined,
  onChange?: (value?: number) => void,
  defaultOptionName?: string,
  options?: {name: string, id: number}[]
}

export const IdSelect = (props: IdSelectProps) => {
  const {value, onChange, defaultOptionName, options, ...restProps} = props
  return <Select value={toNumber(value)} 
    onChange={ val => onChange?.(toNumber(val) || undefined)}
    {...restProps} 
    >
      {
        defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
      }
      {
        options?.map(option => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)
      } 
  </Select>
  
}

const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value)