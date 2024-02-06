function greetHandler(req,res) {
    const name = req.query.name || 'Guest';
    res.send(`Hello, ${name}!`);
}

greetHandler(
    {
        query: {name:"John"}
    },
    {send: (message) => console.log(message) }
);

greetHandler(
    {
        query:{}
    },
    {
        send: (message) => console.log(message)
    }
);
    

