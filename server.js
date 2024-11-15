const express = require('express');
const path = require('path');
const { LocalStorage } = require('node-localstorage'); 

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


const localStorage = new LocalStorage('./scratch'); 
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let taskId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1; 

console.log("Current directory:", __dirname);

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const newTask = {
        id: taskId++,
        text: req.body.text,
        completed: false
    };
    tasks.push(newTask);
    
   
    localStorage.setItem('tasks', JSON.stringify(tasks));

    res.json(newTask);
});

app.put('/tasks/:id/completed', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (task) {
        task.completed = true;
        
        
        localStorage.setItem('tasks', JSON.stringify(tasks));

        res.json(task);
    } else {
        res.status(404).send('Task not found');
    }
});

app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(task => task.id !== parseInt(req.params.id));
   
    localStorage.setItem('tasks', JSON.stringify(tasks));

    res.status(200).send();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
