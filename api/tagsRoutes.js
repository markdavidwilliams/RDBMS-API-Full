const express = require('express');

const db = require('../data/db');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res, next) => {
  db('tags')
    .then(response => {
      res
        .status(200)
        .json(response)
        .end()
    })
    .catch(() => {
      next({ code: 500 })
    })
})

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  db('tags')
    .where({ id })
    .then(response => {
      if(!response[0]) {
        next({ code: 404 })
      } else {
        res
          .status(200)
          .json(response)
          .end()
      }
    })
    .catch(() => {
      next({ code: 500 })
    })
})

router.post('/:postId', (req, res, next) => {
  const { postId } = req.params;
  const tagText = req.body.tag;
  const tag = { tag: tagText, postId };
  if(!tagText) {
    next({ code: 400 })
  } else {
    db
      .insert(tag)
      .into('tags')
      .then(response => {
        res
          .status(200)
          .json(response)
          .end()
      })
      .catch(() => {
        next({ code: 500 })
      })
  }
})

router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const tag = req.body
  if(!tag.tag) {
    next({ code: 400 })
  } else {
    db('tags')
      .where({ id })
      .update(tag)
      .then(response => {
        if(!response) {
          next({ code: 404 })
        } else {
          res
            .status(200)
            .json(response)
            .end()
        }
      })
      .catch(() => {
        next({ code: 500 })
      })
  }
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  db('tags')
    .where({ id })
    .del()
    .then(response => {
      if(!response) {
        next({ code: 404 })
      } else {
        res
          .status(200)
          .json({ success: true})
          .end()
      }
    })
    .catch(() => {
      next({ code: 500 })
    })
})

module.exports = router;