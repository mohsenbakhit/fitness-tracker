const notificationsTable = require("./../tables/NotificationsTable");

const createRoutes = (router) => {
    router.post("/notifications-table", async (req, res) => {
        const id = req.body.userid; 
        console.log(id);
        const notificationContent = await notificationsTable.fetchUserNotifications(id);
        res.json(notificationContent);
    });

    router.post("/deleteNotification", async (req, res) => {
        if (!req) {
            console.log("in notification.js be");
        }
        console.log(req.body.rid);
        const result = notificationsTable.deleteNotification(req.body.rid);
        res.json({status: false});

    });
}

module.exports = createRoutes;