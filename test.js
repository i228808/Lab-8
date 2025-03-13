const EventPlanner = require("./app");

describe("EventPlanner Basic Functions", () => {
  let planner;
  let token;

  beforeAll(() => {
    planner = new EventPlanner();
  });

  test("Register a new user", async () => {
    const user = await planner.registerUser("testuser", "password123");
    expect(user.username).toBe("testuser");
  });

  test("Login with correct credentials", async () => {
    token = await planner.loginUser("testuser", "password123");
    expect(token).toBeDefined();
  });

  test("Fail to login with incorrect password", async () => {
    await expect(planner.loginUser("testuser", "wrongpassword")).rejects.toThrow("Invalid password");
  });

  test("Create an event for a registered user", () => {
    const eventData = {
      name: "Meeting",
      description: "Project discussion",
      date: "2025-03-15",
      time: "10:00 AM",
      category: "Meetings",
      reminder: "30 minutes before",
    };
    const event = planner.createEvent("testuser", eventData);
    expect(event.name).toBe("Meeting");
    expect(event.username).toBe("testuser");
  });

  test("View events for the user", () => {
    const events = planner.viewEvents("testuser");
    expect(events.length).toBeGreaterThan(0);
  });
});
