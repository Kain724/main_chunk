// ** React Import
import axios from 'axios'

import {
  useState
  // , useEffect
} from 'react'

// import axios from 'axios'

// ** Hooks
import { useTranslation } from 'react-i18next'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
// import { selectThemeColors } from '@utils'
// import { v4 as uuidv4 } from 'uuid'

// ** Third Party Components
import Select from 'react-select'
// import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Label, Form, Input } from 'reactstrap'

// ** Store & Actions
import {
  getAllUsers
  // , postUser
} from '../store/ActionCreators.js'
// import { addUser } from '../store/UsersSlice.js'
import { useDispatch } from 'react-redux'

// TODO : add logic

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** Store Vars
  const dispatch = useDispatch()
  // const { status, error } = useSelector((state) => state.usersSlice.data)
  // console.log(usersData)

  // ** States
  // const [data, setData] = useState(null)
  const [role, setRole] = useState('employee')
  // const [id, setId] = useState('')

  const defaultValues = {
    userRole: role,
    name: '',
    surname: '',
    dateBirth: '',
    personalPhoneNumber: '',
    actualRegAddress: '',
    iDNumber: '',
    passportNumber: '',
    DocIssueDate: '',
    expirDate: '',
    gender: '',
    citizenship: '',
    marital: '',
    file: '',
    workPhoneNumber: '',
    personalEmail: '',
    workEmail: '',
    regAddress: ''
  }

  // ** Vars
  const {
    control,

    reset,

    handleSubmit
  } = useForm({
    defaultValues,
    mode: 'onBlur'
  })

  // ** Function to handle form submit
  const onSubmit = (data) => {
    const token = JSON.parse(window.localStorage.getItem('userData'))
    // console.log(token.accessToken.slice(4))
    const tokenData = token.accessToken.slice(4)
    // const tokenData = '1jUYGwSHshQhDp4GNDdcWiQ6qK1mP6EO0utndSGN'

    const config = {
      headers: { Authorization: `Bearer ${tokenData}` }
    }

    console.log(config)
    axios.get('http://api.gate/api/hi', config).then(console.log).catch(console.log)

    console.log(data)
    reset()

    // dispatch(
    // addUser({
    //   role,
    //   id: uuidv4(),
    //   expirDate: data.expirDate,
    //   iDNumber: data.iDNumber,
    //   actualRegAddress: data.actualRegAddress,
    //   citizenship: data.citizenship,
    //   dateBirth: data.dateBirth,
    //   file: data.file,
    //   gender: data.gender,
    //   marital: data.marital,
    //   name: data.name,
    //   passportNumber: data.passportNumber,
    //   personalEmail: data.personalEmail,
    //   personalPhoneNumber: data.personalPhoneNumber,
    //   regAddress: data.regAddress,
    //   surname: data.surname,
    //   workEmail: data.workEmail,
    //   workPhoneNumber: data.workPhoneNumber
    // })
    // )

    dispatch(getAllUsers())

    // dispatch(
    //   postUser({
    //     role,
    //     id: uuidv4(),
    //     expirDate: data.expirDate,
    //     iDNumber: data.iDNumber,
    //     actualRegAddress: data.actualRegAddress,
    //     citizenship: data.citizenship,
    //     dateBirth: data.dateBirth,
    //     file: data.file,
    //     gender: data.gender,
    //     marital: data.marital,
    //     name: data.name,
    //     passportNumber: data.passportNumber,
    //     personalEmail: data.personalEmail,
    //     personalPhoneNumber: data.personalPhoneNumber,
    //     regAddress: data.regAddress,
    //     surname: data.surname,
    //     workEmail: data.workEmail,
    //     workPhoneNumber: data.workPhoneNumber
    //   })
    // )
  }

  // useEffect(() => {
  //   setId(uuidv4())
  // }, [dispatch])

  // useEffect(() => {
  //   setId(uuidv4())
  // }, [handleSubmit])

  const { t } = useTranslation()

  const handleSidebarClosed = () => {
    // for (const key in defaultValues) {
    //   setValue(key, '')
    // }
    setRole('employee')
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title={t('New User')}
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-1'>
          <Label className='form-label' for='name'>
            {t('Name')}
            <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='name'
            control={control}
            rules={{
              required: 'Введите имя!',
              pattern: {
                value: /^[A-Za-zА-Яа-я]+$/,
                message: 'Может содержать только буквы'
              },
              minLength: {
                value: 2,
                message: 'Минимум 2 символов.'
              },
              maxLength: {
                value: 20,
                message: 'Максимум 20 символов'
              }
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input id='name' placeholder={t('John')} {...field} />
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error.message}</div>}
              </>
            )}
          />
        </div>
        {/* <div className='mb-1'>
          <Label className='form-label' for='surname'>
            {t('Surname')}
            <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='surname'
            control={control}
            rules={{
              required: 'Введите фамилию!',
              pattern: {
                value: /^[A-Za-zА-Яа-я]+$/,
                message: 'Может содержать только буквы'
              },
              minLength: {
                value: 2,
                message: 'Минимум 2 символов.'
              },
              maxLength: {
                value: 20,
                message: 'Максимум 20 символов'
              }
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input id='surname' placeholder={t('Doe')} {...field} />
                {error && (
                  <div style={{ color: 'red', marginTop: '10px' }}>{error?.message || 'Error'}</div>
                )}
              </>
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='dateBirth'>
            {t('Date of Birth')}
            <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='dateBirth'
            control={control}
            rules={{
              required: 'Введите дату рождения!',
              pattern: {
                value: /^[\.0-9]*$/,
                message: 'Может содержать только цифры и точки'
              },
              minLength: {
                value: 10,
                message: 'Минимум 10 символов.'
              },
              maxLength: {
                value: 10,
                message: 'Максимум 10 символов'
              }
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input id='dateBirth' placeholder='06.06.####' {...field} />
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error.message}</div>}
              </>
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='personalPhoneNumber'>
            {t('Personal phone number')}
            <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='personalPhoneNumber'
            control={control}
            rules={{
              required: 'Введите персональный номер телефона',
              pattern: {
                value: /^[0-9\b]+$/, //TODO: with plus or not?
                message: 'Может содержать только цифры'
              },
              minLength: {
                value: 9,
                message: 'Минимум 9 символов.'
              },
              maxLength: {
                value: 9,
                message: 'Максимум 9 символов'
              }
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input type='text' id='personalPhoneNumber' placeholder='060 ## ###' {...field} />
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error.message}</div>}
              </>
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='workPhoneNumber'>
            {t('Work phone number')}
            <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='workPhoneNumber'
            control={control}
            rules={{
              required: 'Введите рабочий номер телефона',
              pattern: {
                value: /^[0-9\b]+$/, //TODO: with plus or not?
                message: 'Может содержать только цифры'
              },
              minLength: {
                value: 9,
                message: 'Минимум 9 символов.'
              },
              maxLength: {
                value: 9,
                message: 'Максимум 9 символов'
              }
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input type='number' id='workPhoneNumber' placeholder='060 ## ###' {...field} />
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error.message}</div>}
              </>
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='personalEmail'>
            {t('Personal email')}
            <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='personalEmail'
            control={control}
            rules={{
              required: 'Введите личную эл.почту',
              pattern: {
                value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                message: '@ обязательна, после . минимум 2 символа'
              },
              minLength: {
                value: 6,
                message: 'Минимум 6 символов.'
              },
              maxLength: {
                value: 40,
                message: 'Максимум 40 символов'
              }
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input id='personalEmail' placeholder='myEmail@gmail.com' {...field} />
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error.message}</div>}
              </>
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='workEmail'>
            {t('Work email')}
            <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='workEmail'
            control={control}
            rules={{
              required: 'Введите рабочую эл.почту',
              pattern: {
                value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                message: '@ обязательна, после . минимум 2 символа'
              },
              minLength: {
                value: 6,
                message: 'Минимум 6 символов.'
              },
              maxLength: {
                value: 40,
                message: 'Максимум 40 символов'
              }
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input id='workEmail' placeholder='myEmail@gmail.com' {...field} />
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error.message}</div>}
              </>
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='regAddress'>
            {t('Registration address')}
            <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='regAddress'
            control={control}
            rules={{
              required: 'Введите адрес регистрации',
              minLength: {
                value: 6,
                message: 'Минимум 6 символов.'
              },
              maxLength: {
                value: 45,
                message: 'Максимум 45 символов'
              }
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input id='regAddress' placeholder={t('Введите адрес регистрации  ')} {...field} />
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error.message}</div>}
              </>
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='actualRegAddress'>
            {t('Actual registration address')}
            <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='actualRegAddress'
            control={control}
            rules={{
              required: 'Введите актуальный адрес регистрации',
              minLength: {
                value: 6,
                message: 'Минимум 6 символов.'
              },
              maxLength: {
                value: 45,
                message: 'Максимум 45 символов'
              }
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input
                  id='actualRegAddress'
                  placeholder={t('Введите актуальный адрес регистрации')}
                  {...field}
                />
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error.message}</div>}
              </>
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='iDNumber'>
            {t('Identification number')}
            <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='iDNumber'
            control={control}
            rules={{ required: 'Введите ваш ID номер' }} //TODO: what kind data must be here?
            render={({ field, fieldState: { error } }) => (
              <>
                <Input id='iDNumber' placeholder={t('write your ID number')} {...field} />
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error.message}</div>}
              </>
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='passportNumber'>
            {t('Passport number')}
            <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='passportNumber'
            control={control}
            rules={{ required: 'Введите ваш номер паспорта' }} //TODO: what kind data must be here?
            render={({ field, fieldState: { error } }) => (
              <>
                <Input
                  id='passportNumber'
                  placeholder={t('write your number passport')}
                  {...field}
                />
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error.message}</div>}
              </>
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='DocIssueDate'>
            {t('Document issue date')}
            <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='DocIssueDate'
            control={control}
            rules={{
              //TODO: what kind data must be here?
              required: 'Введите дату',
              minLength: {
                value: 2,
                message: 'Минимум 2 символов.'
              },
              maxLength: {
                value: 10,
                message: 'Максимум 10 символов'
              }
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input type='number' id='DocIssueDate' placeholder={t('write date')} {...field} />
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error.message}</div>}
              </>
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='expirDate'>
            {t('Expiration date document')}
            <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='expirDate'
            control={control}
            rules={{ required: 'Введите дату' }}
            render={(
              { field, fieldState: { error } } //TODO: what kind data must be here?
            ) => (
              <>
                <Input type='number' id='expirDate' placeholder={t('write date')} {...field} />
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error.message}</div>}
              </>
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='gender'>
            {t('Gender')}
            <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='gender'
            control={control}
            rules={{
              required: 'Введите пол',
              minLength: {
                value: 2,
                message: 'Минимум 2 символов.'
              },
              maxLength: {
                value: 10,
                message: 'Максимум 10 символов'
              }
            }}
            render={(
              { field, fieldState: { error } } //TODO: here need  correction
            ) => (
              <>
                <Input id='gender' placeholder={t('write gender')} {...field} />
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error.message}</div>}
              </>
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='citizenship'>
            {t('Citizenship')}
            <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='citizenship'
            control={control}
            rules={{
              //TODO: here need  correction
              required: 'Введите гражданство',
              minLength: {
                value: 2,
                message: 'Минимум 5 символов.'
              },
              maxLength: {
                value: 15,
                message: 'Максимум 15 символов'
              }
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input id='citizenship' placeholder={t('write citizenship')} {...field} />
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error.message}</div>}
              </>
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='marital'>
            {t('Marital status')}
            <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='marital'
            control={control}
            rules={{
              //TODO: here need  correction
              required: 'Введите семейное положение',
              minLength: {
                value: 2,
                message: 'Минимум 2 символов.'
              },
              maxLength: {
                value: 10,
                message: 'Максимум 10 символов'
              }
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input id='marital' placeholder={t('write your status')} {...field} />
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error.message}</div>}
              </>
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='userRole'>
            {t('User Role')}
          </Label>
          <Input
            type='select'
            id='userRole'
            name='userRole'
            control={control}
            value={role}
            rules={{ required: 'Введите роль ' }}
            onChange={(e) => setRole(e.target.value)}>
            <option value='HR'>{t('HR')}</option>
            <option value='employee'>{t('Employee')}</option>
            <option value='admin'>{t('Admin')}</option>
          </Input>
        </div> 
         <div className='mb-1'>
          <Label className='form-label' for='file'>
            {t('Choose File')}
            <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='file'
            control={control}
            rules={{ required: 'Добавьте файл или файлы' }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input id='file' type='file' placeholder='add file' multiple {...field} />
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error.message}</div>}
              </>
            )}
          />
        </div>  */}
        <Button type='submit' className='me-1' color='primary'>
          {t('Submit')}
        </Button>
        <Button type='reset' color='secondary' outline onClick={(e) => toggleSidebar(e)}>
          {t('Cancel')}
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewUsers
