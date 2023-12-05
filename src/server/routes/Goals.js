const goalsTable = require("./../tables/GoalsTable");

const createRoutes = (router) => {
    router.post("/goals-table", async (req, res) => {
        const id = req.body.userid; 
        console.log(id);
        const goalContent = await goalsTable.fetchUserGoals(id);
        res.json(goalContent);
    });

    router.post("/addGoal", async (req, res) => {
        if (!req) {
            console.log("in goals.js be");
        }
        // const result = await registerUser(req);
        console.log(req.body);
        const result = goalsTable.insert(req.body.newGoal.category, req.body.newGoal.weight, req.body.newGoal.date, req.body.token.userid);
        res.json({status: false});

    });

    router.post("/deleteGoal", async (req, res) => {
        if (!req) {
            console.log("in goals.js be");
        }
        console.log(req.body.gid);
        const result = goalsTable.deleteGoal(req.body.gid);
        res.json({status: false});

    });
}

module.exports = createRoutes;