/* eslint-disable */

const db = require('../models')
const Article = db.Article
const User = db.User


const articleController = {
    index: async(req, res) => {
        let articles = null
        try{
            articles = await Article.findAll({
                where: {
                    is_deleted: null
                },
                order:[
                    ['id', 'DESC']
                ], 
                limit: 5
            })
        }catch(err) {
            return console.log(err)
        }

        res.render('index', {
            articles,
            page: null
        })

        /*
        Article.findAll({
            where: {
                is_deleted: null
            },
            order:[
                ['id', 'DESC']
            ], 
            limit: 5
        }).then(articles => {
            res.render('index', {
                articles,
                page: null
            })
        })
        */
    },

    post: (req, res) => {
        res.render('post')
    },

    handlePost: async(req, res) => {
        const userName = req.session.username
        const {title, content} = req.body
        if(!title || !content) {
            req.flash('errMessage', '缺少必要欄位')
            return res.redirect('back')
        }

        let article = null
        try{
            article = await Article.create({
                title,
                content,
                userName
            })
        }catch(err) {
            return console.log(err)
        }

        return res.redirect('/')

        /*
        Article.create({
            title,
            content,
            userName
        }).then(() => {
            return res.redirect('/')
        })
        */
    },

    blog: async(req, res) => {
        const id = req.query.id

        let article = null
        try {
            article = await Article.findOne({
                where: {
                    id,
                    is_deleted: null
                }
            })
        }catch(err) {
            return console.log(err)
        }

        res.render('blog', {
            article
        })

        /*
        Article.findOne({
            where: {
                id,
                is_deleted: null
            }
        }).then(article => {
            res.render('blog', {
                article
            })
        }).catch(() => {
            return res.redirect('/')
        })
        */
    },

    edit: async(req, res) => {
        const id = req.query.id

        let article = null
        try{
            article = await Article.findOne({
                where: {
                    id,
                    is_deleted: null
                },
            })
        }catch(err) {
            return console.log(err)
        }

        res.render('edit',{
            article
        })

        /*
        Article.findOne({
            where: {
                id,
                is_deleted: null
            },
        }).then(article => {
            res.render('edit',{
                article
            })
        }).catch(() => {
            return res.redirect('/')
        })
        */
    },

    handleEdit: async(req, res) => {
        const {title, content} = req.body
        const id = req.query.id
        const username = req.session.username

        if(!title || !content) {
            req.flash('errMessage', '缺少必要欄位')
            return res.redirect('back')
        }

        if(!id) {
            return res.redirect('back')
        }

        let article = null
        try {
            article = await Article.update({title, content}, {
                where: {
                    id, 
                    userName: username
                }
            })
        }catch(err) {
            return console.log(err)
        }

        res.redirect('/')

        /*
        Article.update({title, content}, {
            where: {
                id, 
                userName: username
            }
        }).then(() => {
            res.redirect('/')
        }).catch(err => {
            res.redirect('/')
        })
        */
    },

    admin: async(req, res) => {
        const username = req.session.username
        if(!username) {
            return res.render('login')
        }

        let articles = null
        try{
            articles = await Article.findAll({
                where: {
                    userName: username,
                    is_deleted: null
                },
                order:[
                    ['id', 'DESC']
                ]
            })
        }catch(err) {
            return console.log(err)
        }

        res.render('admin', {
            articles
        })

        /*
        Article.findAll({
            where: {
                userName: username,
                is_deleted: null
            },
            order:[
                ['id', 'DESC']
            ]
        }).then(articles => {
            res.render('admin', {
                articles
            })
        })
        */
    },

    delete: async(req, res) => {
        const username = req.session.username
        const id = req.query.id

        if(!username || !id) {
            return res.redirect('back')
        }

        let article = null
        try {
            article = await Article.update({is_deleted: 1}, {
                where: {
                    id, 
                    userName: username
                }
            })
        }catch(err) {
            return console.log(err)
        }

        res.redirect('back')

        /*
        Article.update({is_deleted: 1}, {
            where: {
                id, 
                userName: username
            }
        }).then(() => {
            res.redirect('back')
        }).catch(()=> {
            res.redirect('back')
        })
        */
    },

    list: async(req, res) => {
        const page = req.query.page
        const limit = 3
        const offset = (page - 1) * limit


        let result = null
        try{
            result = await Article.findAndCountAll({
                where: {
                    is_deleted: null
                },
                order:[
                    ['id', 'DESC']
                ],
                limit,
                offset
            })
        }catch(err) {
            return console.log(err)
        }

        const count = result.count
        const totalPage = Math.ceil(count / limit)
        const articles =  result.rows

        res.render('index', {
            page,
            count,
            totalPage,
            articles,
        })

        /*
        Article.findAndCountAll({
            where: {
                is_deleted: null
            },
            order:[
                ['id', 'DESC']
            ],
            limit,
            offset
        }).then(result => {
            const count = result.count
            const totalPage = Math.ceil(count / limit)
            const articles =  result.rows

            res.render('index', {
                page,
                count,
                totalPage,
                articles,
            })
        })
        */
    }

}

module.exports = articleController