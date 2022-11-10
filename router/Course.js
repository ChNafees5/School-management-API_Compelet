const Courses = require('../model/course')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const checkAuth = require('../middleware/check-auth')
router.post('/', async (req, res) => {
    console.log('you are inside the post')
    const newCourse = new Courses({
        title:req.body.title,
        books:req.body.book})

    try {
        const savedCourse = await newCourse.save()
        res.json( savedCourse )
      //  res.status(200).json(savedCourse)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const updatedCourse = await Courses.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Courses.findByIdAndDelete(req.params.id)
        res.status(200).json('course has been deleted')
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/:id', checkAuth, async (req, res) => {
    try {
        const course = await Courses.findById(req.params.id)
        res.status(200).json(course)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/',checkAuth, async (req, res) => {
    try {
        const courses = await Courses.find()
        res.status(200).json(courses)
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router