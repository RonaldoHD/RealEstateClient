import Mock from "../mock";
import shortId from "shortid";



export const NotificationDB = {
  list: [
    // {
    //   id: shortId.generate(),
    //   heading: "Message",
    //   icon: { name: "chat", color: "primary" },
    //   timestamp: 1570702802573,
    //   title: "New message from Devid",
    //   subtitle: "Hello, Any progress...",
    //   path: "chat"
    // }
  ]
};

Mock.onGet("/api/notification").reply(() => {
  const response = NotificationDB.list;
  return [200, response];
});

Mock.onPost("/api/notification/add").reply(() => {
  const response = NotificationDB.list;
  return [200, response];
});

Mock.onPost("/api/notification/delete").reply((config) => {
  let { id } = JSON.parse(config.data);
  console.log(config.data);

  const response = NotificationDB.list.filter((notification) => notification.id !== id);
  NotificationDB.list = [...response];
  return [200, response];
});

Mock.onPost("/api/notification/delete-all").reply(() => {
  NotificationDB.list = [];
  const response = NotificationDB.list;
  return [200, response];
});
