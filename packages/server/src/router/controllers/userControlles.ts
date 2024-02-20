import { Response, Request } from 'express'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserService } from '../../services/user.services'
import { SALT_ROUNDS, SECRETKEY } from '../../config/app.config'
import { isUndefined } from '../../utils/index'

const userService = new UserService()

/**
 * 注册
 */
export const createRegister = asyncHandler(
  async (req: Request, res: Response) => {
    const { account, email, password } = req.body
    if (isUndefined(account) || isUndefined(email) || isUndefined(password)) {
      res.status(400).json('all fields are mandatory!')
      return
    }

    const userAvailable = await userService.getUser(account)
    if (userAvailable) {
      res.status(400).json('User already registered!')
      return
    }

    bcrypt.genSalt(SALT_ROUNDS, (err: Error, salt: string) => {
      if (err) {
        throw new Error('bcrypt ??')
      } else {
        bcrypt.hash(password, salt, async (err: Error, hash: string) => {
          if (err) {
            throw new Error('bcrypt ??')
          } else {
            let user = await userService.createUser({
              username,
              email,
              password: hash,
            })
            if (user) {
              res.status(201).json({ _id: user.id, email: user.email })
            } else {
              res.status(400).json('User data us not valid')
            }
          }
        })
      }
    })
  },
)

/**
 * 登录
 */
export const createLogin = asyncHandler(async (req: Request, res: Response) => {
  const { account, password } = req.body

  if (isUndefined(account) || isUndefined(password)) {
    res.status(400).json('All fields are mandatory.')
    return
  }

  const user = await userService.getUser(account)

  // 验证密码是否匹配
  if (user && bcrypt.compare(user.password, password)) {
    const token = jwt.sign(
      {
        user: {
          account: user.account,
          id: user.id || user._id,
        },
      },
      SECRETKEY,
      { expiresIn: '24h' },
    )
    res.status(200).json({ token })
  } else {
    res.status(400).json('account or password is valid')
  }
})

/**
 * 当前用户信息
 */
export const createCurrentUserInfo = asyncHandler(
  async (req: Request, res: Response) => {
    // @ts-ignore
    res.status(200).json(req.user)
  },
)
