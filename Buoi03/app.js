const Kernel = require("./core/kernel");

// Plugins
const contentPlugin = require("./plugins/contentPlugin");
const userPlugin = require("./plugins/userPlugin");
const analyticsPlugin = require("./plugins/analyticsPlugin");

const app = new Kernel();

// Load plugins
app.loadPlugin(contentPlugin);
app.loadPlugin(userPlugin);
app.loadPlugin(analyticsPlugin);

// Simulate requests
app.handleRequest({
    type: "createContent",
    username: "admin",
    password: "123456",
    data: { title: "Hello Microkernel CMS" }
});

app.handleRequest({
    type: "createUser",
    username: "admin",
    password: "123456",
    data: { username: "hao123" }
});

app.handleRequest({
    type: "trackEvent",
    username: "admin",
    password: "123456",
    data: { action: "visit_page" }
});

app.handleRequest({
    type: "createContent",
    username: "admin",
    password: "123456",
    data: { title: "Hello Microkernel CMS" }
});

