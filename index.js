const express = require('express')

const app = express()

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const fileUpload = require('express-fileupload')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json())
app.use(fileUpload()) // it will provide any file upload as req.file

let courses = [
    {
        id: "11",
        name: "Reactjs",
        price: 299
    },
    {
        id: "22",
        name: "AngularJS",
        price: 399
    },
    {
        id: "33",
        name: "Django",
        price: 499
    },
]

app.get("/", (req, res) => {
    res.send("Hello")
})

app.get("/api/v1/course", (req, res) => {
    res.send("Hello from courses docs")
})

app.get("/api/v1/object", (req, res) => {
    res.send({ id: "55", name: "Backend", price: 999 })
})

app.get("/api/v1/courses", (req, res) => {
    res.send(courses)
})

app.get("/api/v1/mycourse/:courseId", (req, res) => {
    const myCourse = courses.find(course => course.id === req.params.courseId)
    res.send(myCourse)
})

app.post("/api/v1/addCourse", (req, res) => {
    console.log(req.body)
    courses.push(req.body)
    res.send(true) // to ensure that has been added
})

app.get("/api/v1/coursequery", (req, res) => {
    // name of the query being passed
    let location = req.query.location // const location has to be same as name = location in the forms(in the frontend)
    let device = req.query.device
    console.log(req.query)
    res.send({ location, device })
})

app.post("/api/v1/courseupload", (req, res) => {
    console.log(req.headers)
    const file = req.files.file // const file has to be the same name as in the frontend
    let path = __dirname + "/images/" + Date.now() + ".jpg" // here images will be stored
    // dirname -> will give the name of project directory
    // Date.now() -> to give an unique name

    file.mv(path, err => {
        if (err) {
            res.send(false)
        } else {
            res.send(true)
        }
    })
})

PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server Started on port: ${PORT}`))