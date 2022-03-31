import React from 'react'
import { Form, Button, Field, Cell, Dialog } from 'react-vant'
import style from './style.module.scss'
import { login } from '../service/auth'
import { useDispatch } from 'react-redux'
import { userSlice } from 'store/slices/userSlick'

export const UnauthenticatedApp = (props) => {
  const { setToken } = props
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const onFinish = async (values) => {
    //   {username: 'xxx', password: 'xxx'}
    // Send request
    const data = await login(values)
    if (data) {
      dispatch(userSlice.actions.setUser(data))
      setToken(data.token)
    } else {
      Dialog.alert({
        message: 'Hmmm, That didn.t work. Please try again'
      })
    }
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
            <Field placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Field type="password" clearable placeholder="password" />
          </Form.Item>
        </Form>
      </Cell.Group>
    </div>
  )
}
