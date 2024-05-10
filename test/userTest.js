import {expect, use} from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";
import User from "../models/user.js";

const server = use(chaiHttp);


describe("CRUD Operation", ()=>{

    let userId;

    before(async function() {
        await User.deleteMany({});
    });

    it("should create a new User", (done) =>{

        const userData = {
            "name": "Rox Sm",
            "age": 24,
            "work": "manager",
            "mobile": "685378434",
            "email": "roxs536@gmail.com",
            "address": "jungle sfbjahsbfj",
            "salary": 7248937
        }

        server.request(app)
            .post("/user")
            .send(userData)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("_id");
                userId = res.body._id;
                done();
            });
    });

    it("Should return all users", (done)=>{
        server.request(app)
            .get("/user")
            .end((err,res) =>{
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("array");
                done();
            });
    });

    it("Should update an existing user", (done)=>{

        const updatedUserData = {
            name: "Nitesh"
        };

        server.request(app)
            .put(`/user/${userId}`)
            .send(updatedUserData)
            .end((err,res)=>{
                expect(res).to.have.status(200);
                done();
            });
    });

    it("Should delete an existing user", (done)=>{
        server.request(app)
            .delete(`/user/${userId}`)
            .end((err,res)=>{
                expect(res).to.have.status(200);
                done();
            });
    });
});