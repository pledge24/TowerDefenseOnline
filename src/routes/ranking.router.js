import express from 'express';
import { getUserHighscoreList, getWorldRankingList } from '../db/user/user.db.js';

const router = express.Router();

// 해당 유저 점수 랭킹 조회 API.
router.get('/userHighscore', async (req, res) => {
  const userId = req.query.userId;
  console.log("userId", userId);
  try {
    const userHighscoreList = await getUserHighscoreList(userId);

    console.log("userHighscoreList", userHighscoreList);

    return res.status(200).json({ message: 'success get userHighscoreList', userHighscoreList });
  } catch (err) {
    return res.status(500).json({ err: `server Error ${err}` });
  }
});

// 월드 점수 랭킹 조회 API
router.get('/worldRanking', async (req, res) => {
  console.log('Success access worldRanking');
  try {
    const worldRankingList = await getWorldRankingList();

    console.log("worldRankingList", worldRankingList);

    return res.status(200).json({ message: 'success get worldRankingList', worldRankingList });
  } catch (err) {
    return res.status(500).json({ err: `server Error ${err}` });
  }
});

export default router;
