import React from 'react'
import { Form, Button, Field, Cell } from 'react-vant'
import style from './style.module.scss'
import { login } from '../service/auth'

export const UnauthenticatedApp = () => {
  const [form] = Form.useForm()

  const onFinish = async (values) => {
    //   {username: 'xxx', password: 'xxx'}
    // Send request
    const data = await login(values)
    console.log('data =>', data)
  }
  return (
    <div className={style.app}>
      <Cell.Group className={style['form-wrapper']}>
        <Form
          onFinish={onFinish}
          form={form}
          footer={
            <div style={{ margin: '16px 16px 0' }}>
              <Button round nativeType="submit" type="primary" block>
                Submit
              </Button>
            </div>
          }>
          <Form.Item name="username" label="Username">
            <Field />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Field type="password" />
          </Form.Item>
        </Form>
      </Cell.Group>
    </div>
  )
}
