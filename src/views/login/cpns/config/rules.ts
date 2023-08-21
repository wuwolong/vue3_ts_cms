export const accountRules: any = {
  name: [
    {
      required: true,
      message: 'Please input Activity userName',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9a-z]{5,15}$/,
      message: 'Length should be 5 to 15',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: 'Please input Activity password',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9a-z]{5,}$/,
      message: 'Length should be 5',
      trigger: 'blur'
    }
  ]
}
// export default rules
export const phoneRule = {
  phone: [
    {
      required: true,
      message: 'Please input Activity password',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9]{11}$/,
      message: 'Length should be 5',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: 'Please input Activity password',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9a-z]{3,}$/,
      message: 'Length should be 5',
      trigger: 'blur'
    }
  ]
}
