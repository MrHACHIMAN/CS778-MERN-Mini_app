npm init
npm i express mongoose cors
npm i -D nodemon

//转到 /home 去，localhost:3000/ == localhost:3000/home
app.get('/', (req, res) => {
    res.redirect('/home');
})

//获取所有
app.get('/home', (req, res) => {
    TBoard.find().then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
    })
});

//指定id获取
app.post('/home/addNew', (req, res) => {
    const tbBoard = new TBoard({
        text: req.body.text,
        Time: moment(req.body.time).toDate()
    });
    tbBoard.save().then(result => {
        console.log("add success");
    }).catch(err => {
        console.log('error');
    });
    res.json(tbBoard);
});

app.delete('/home/delete/:id', async (req, res) => {
    const result = await TBoard.findByIdAndDelete(req.params.id);
    res.json(result);
    console.log("delete success");
})

//做完的task划线
app.put('/home/done/:id', async (req, res) => {
    const result = await TBoard.findById(req.params.id);
    result.Done = !result.Done;
    result.save();
    res.json(result);
    console.log("task done");
});

app.listen(3000, () => {
    console.log("Start at port 3000");
});
