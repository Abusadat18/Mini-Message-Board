const {Router} = require("express")

const indexRouter = Router()

const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
  ];
  

indexRouter.get("/",(req,res) => {
    res.render("index", {title: "Mini Message Board", messages: messages})
})

indexRouter.get("/new",(req,res) => {
    res.render("form")
})

indexRouter.post("/new",(req,res) => {
    const {authorName, authorMessage} = req.body
    messages.push({text: authorMessage, user: authorName, added: new Date()})
    indexRouter.get(`/${authorName}`, (req,res) => {
        res.render("singleUser", {message: messages[messages.length-1]})
    })
    res.redirect("/")
})

messages.forEach((message) => {
    indexRouter.get("/" + message.user, (req,res) => {
        res.render("singleUser", {message: message})
    })
})

module.exports = indexRouter