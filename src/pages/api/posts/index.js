import dbConnect from '@/utils/db.js';
import PostDatasModel from '../../../../models/postDatasModel';

export default async function handler(req, res) {
  const { method } = req;

  try {
    await dbConnect();
  } catch (error) {
    res.status(500).json(error);
  }

  if (method === 'GET') {
    const catName = req.query.cat ? decodeURIComponent(req.query.cat) : null;
    const text = req.query.text ? decodeURIComponent(req.query.text) : null;
    const page = req.query.page;
    const paramId = req.params?.id;
    const meta = req.query?.meta;

    try {
      // 한페이지당 나오는 포스트 갯수
      const pageSize = 4;
      // 클릭한 page 숫자에 따라 계산할 예정
      let skipAmount = 0;
      // db에 있는 포스트 역순으로 재배치
      const sortOptions = { createdAt: -1 };

      let query = {};

      let totalPostsCount;

      if (paramId || meta) {
        const foundPost = await PostDatasModel.findById(paramId);

        if (!foundPost) {
          return res.status(404).json('Post not found');
        }

        if (meta) {
          // toObject() 메서드
          // 마치 마술사가 있는 상자를 다른 상자로 바꾸는 것처럼 생각해봅시다.

          // .toObject()는 Mongoose에서 가져온 상자(인스턴스)를 더 예쁜 상자(JavaScript 객체)로 바꿔줍니다.
          // 그 예쁜 상자 안에는 특별한 것들이 추가로 들어갈 수 있어요. 예를 들어, 덧셈이나 뺄셈을 하거나 다른 정보를 추가할 수 있어요.

          // _doc 프러퍼티
          // 이번에는 마술사가 있는 상자(인스턴스)를 그냥 같은 모양의 다른 상자(JavaScript 객체)로 바꾸는 것처럼 생각해봅시다.
          // ._doc은 특별한 처리 없이 그냥 같은 내용물의 상자를 주는 것이에요. 특별한 변화 없이 그냥 필요한 정보만 그대로 가져와요.
          const { text, catName, author, createdAt, updatedAt, ...others } = foundPost.toObject();

          // 쉽게 말하면, .toObject()는 뭔가 변화를 주고 싶을 때 사용하는 메서드이고,
          // ._doc은 그냥 필요한 정보만 가져오고 싶을 때 사용하는 프로퍼티입니다.
          res.status(200).json(others);
        } else {
          res.status(200).json(foundPost);
        }
      }

      if (catName) {
        query.catName = catName;
      }

      if (text) {
        // 정규표현식 대소문자 없이 구분없이 검색
        query.title = { $regex: new RegExp(text, 'i') };
      }

      if (page) {
        // 클릭한 페이지 숫자에 따라 skipAmount 결정
        skipAmount = (page - 1) * pageSize;
      }

      // 해당 쿼리에 맞는 포스트를 찾음
      let foundPosts = await PostDatasModel.find(query).sort(sortOptions).skip(skipAmount).limit(pageSize);

      totalPostsCount = await PostDatasModel.countDocuments(query);

      res.status(200).json({ posts: foundPosts, totalPostsCount });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === 'POST') {
    try {
      const newPost = new PostDatasModel({
        imgUrl: req.body.imgUrl,
        title: req.body.title,
        text: req.body.text,
        catName: req.body.catName,
        author: req.body.author,
      });

      const savedNewPost = await newPost.save();
      res.status(201).json({ savedNewPost });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
