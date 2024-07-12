import { createUser } from "../db/user/user.db.js";

router.post('/signUp', async (req, res, next) => {
  try {
    const { id, password } = req.body;

    if (!id || !password) {
      return res.status(400).json({ errorMessage: '충분히 입력 되지 않았습니다.' });
    }

    if (!/^[a-zA-Z0-9]{1,10}$/.test(id)) {
      return res
        .status(400)
        .json({ errorMessage: '아이디는 영문과 숫자로 이루어진 1~10자 길이의 문자열만 허용됩니다.' });
    }

    if (password.length < 2) {
      return res.status(400).json({ errorMessage: '비밀번호는 2글자 이상이어야 합니다.' });
    }

    // 아이디 중복 확인 테스트
    const isExistUser = await prisma.user.findUnique({
      where: { id },
    });
    if (isExistUser) {
      return res.status(409).json({ errorMessage: '이미 존재하는 아이디입니다.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 유저 생성
    createUser(id, password);
    
    return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
  } catch (err) {
    return res.status(500).json({ err });
  }
});