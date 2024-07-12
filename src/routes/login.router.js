import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import configs from '../utils/configs.js';
import { config } from '../config/config.js';

const router = express.Router();

// 로그인 API
router.post('/login', async (req, res, next) => {
  try {
    const { id, password } = req.body;

    if (!id || !password) {
      return res.status(400).json({ errorMessage: '입력 값이 잘못되었습니다.' });
    }

    if (!/^[a-zA-Z0-9]{1,10}$/.test(id)) {
      return res
        .status(400)
        .json({ errorMessage: '아이디는 영문과 숫자로 이루어진 1~10자 길이의 문자열만 허용됩니다.' });
    }

    if (password.length < 2) {
      return res.status(400).json({ errorMessage: '비밀번호는 2글자 이상이어야 합니다.' });
    }
    const user = findUserByUserID(id);

    if (!user) {
      return res.status(404).json({ errorMessage: '존재하지 않는 아이디입니다.' });
    }

    // 비밀번호 확인
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ errorMessage: '비밀번호가 일치하지 않습니다.' });
    }

    const token = jwt.sign(
      {
        id,
      },
      config.token.tokenSecretKey,
      { expiresIn: '12h' }
    );

    localStorage.setItem("token", `Bearer ${token}`);

    return res.status(200).json({
      message: '로그인이 완료되었습니다.',
    });
  } catch (err) {
    return res.status(500).json({ errorMessage: '서버 내부 에러가 발생했습니다.' });
  }
});

// 유저 검증 API
router.get('/auth', async (req, res, next) => {
  try {
    const { authorization } = req.cookies;

    if (!authorization) {
      throw new Error('유효하지 않은 인증입니다.');
    }

    const [tokenType, token] = authorization.split(' ');

    // 토큰 타입 확인
    if (tokenType !== 'Bearer') {
      throw new Error('토큰 타입이 일치하지 않습니다.');
    }

    const decodedToken = jwt.verify(token, configs.tokenSecretKey);
    const id = decodedToken.id;

    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      res.clearCookie('authorization');
      throw new Error('토큰 사용자가 존재하지 않습니다.');
    }

    return res.status(200).json({ message: '토큰 사용자 인증이 완료되었습니다.', data: { id } });
  } catch (err) {
    res.clearCookie('authorization');

    switch (err.name) {
      case 'JsonWebTokenError':
        return res.status(400).json({ errorMessage: '토큰이 잘못되었습니다.' });
      default:
        return res.status(400).json({ errorMessage: err.message ?? '비정상적인 요청입니다.' });
    }
  }
});

export default router;
