const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "Hello";

class EventPlanner {
  constructor() {
    this.users = [];
    this.events = [];
  }

  async registerUser(username, password) {
    if (this.users.find((u) => u.username === username)) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword };
    this.users.push(user);
    return user;
  }

  async loginUser(username, password) {
    const user = this.users.find((u) => u.username === username);
    if (!user) {
      throw new Error("User not found");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error("Invalid password");
    }
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    return token;
  }

  createEvent(username, { name, description, date, time, category, reminder }) {
    if (!this.users.find((u) => u.username === username)) {
      throw new Error("User not found");
    }
    const newEvent = {
      id: this.events.length + 1,
      username,
      name,
      description,
      date,
      time,
      category,
      reminder,
    };
    this.events.push(newEvent);
    return newEvent;
  }

  viewEvents(username) {
    return this.events.filter((event) => event.username === username);
  }
}

module.exports = EventPlanner;
