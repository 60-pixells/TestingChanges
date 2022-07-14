import {
    request,
    assert,
} from "../TestHelper";
import * as constants from "../constants";

const headers = {
    "x-metro-api-key": constants.X_METRO_API_KEY,
    "x-metro-sessiontoken": constants.X_METRO_SESSION_TOKEN,
};

describe("POST /:organisationId/routing/group", () => {
    // success case
    it("Create a priority routing group in an organisation", async () => {
        const body = {
            name : "First Group",
            members: [],
            description: "This is the first group",
        };
        const response = await request.post("/b3b7de60-cf7f-11eb-825e-f95fd9be3d8a/routing/group").set(headers).send(body);
        assert.equal(response.status, 200);
        assert.equal(response.body.success, true);
      });
    
    // TODO add a case for the invalid orgId
});

describe("GET /:organisationId/routing/group/list", () => {
    // success case
    it("Fetch all the routing groups in an organisation", async () => {
        const response = await request.get("/b3b7de60-cf7f-11eb-825e-f95fd9be3d8a/routing/group").set(headers);
        assert.equal(response.status, 200);
        assert.equal(response.body.success, true);
    });
    // TODO add a case for the invalid orgId it is returing empty data with status code 200
});

describe("GET /:organisationId/routing/group/one/:priorityRoutingGroupId", () => {
    // success case
    it("Fetch details of one priority routing group in an organistion", async () => {
        const response = await request.get("/b3b7de60-cf7f-11eb-825e-f95fd9be3d8a/routing/group/one/62b9f1732a837a3088666f62").set(headers);
        assert.equal(response.status, 200);
        assert.equal(response.body.success, true);
    });
    // TODO add a case for the invalid orgId and invalid group id it is returing empty data with status code 200
});

describe("DELETE /:organisationId/routing/group/one/:priorityRoutingGroupId", () => {
    // success case
    it("Delete a priority routing group", async () => {
        const response = await request.delete("/b3b7de60-cf7f-11eb-825e-f95fd9be3d8a/routing/group/one/62b9f1732a837a3088666f62").set(headers);
        assert.equal(response.status, 200);
        assert.equal(response.body.success, true);
    });
    // TODO add a case for the invalid orgId

    // Invalid Priority Routing GroupId
    it("Delete a priority routing group Invalid group id it should throw 1019 error code ", async () => {
        const response = await request.delete("/b3b7de60-cf7f-11eb-825e-f95fd9be3d8a/routing/group/one/62b9f1732a837a3088666f62").set(headers);
        assert.equal(response.status, 404);
        assert.equal(response.body.success, false);
        const errorMessage = JSON.parse(response.text);
        const { code, reason } = errorMessage.error || null;
        if (code) {
            assert.equal(code, 1019);
            assert.equal(reason, "Group does not exist");
        }
    });
});

describe("POST /:organisationId/routing/group/one/:priorityRoutingGroupId/primaries", () => {
    const body = {
        "vmnId": constants.VMN_ID,
    }
    // success case
    it("Assign VMN To a priority routing group", async () => {
        const response = await request.post("/b3b7de60-cf7f-11eb-825e-f95fd9be3d8a/routing/group/one/62b9f1732a837a3088666f62/primaries").set(headers).send(body);
        assert.equal(response.status, 200);
        assert.equal(response.body.success, true);
    });
    // TODO add a case for the invalid orgId

    // Invalid Priority Routing GroupId
    it("Assign VMN to Invalid group id it should throw 1019 error code ", async () => {
        const response = await request.post("/b3b7de60-cf7f-11eb-825e-f95fd9be3d8a/routing/group/one/62b9f1732a837a3088666f63/primaries").set(headers).send(body);
        assert.equal(response.status, 404);
        assert.equal(response.body.success, false);
        const errorMessage = JSON.parse(response.text);
        const { code, reason } = errorMessage.error || null;
        if (code) {
            assert.equal(code, 1019);
            assert.equal(reason, "Group does not exist");
        }
    });

    // Invalid Virtual MObile No Id 
    it("Assign VMN to priority group with invalid vmn id it should throw 1020 error code ", async () => {
        const body = {
            "vmnId": constants.INVALID_VMN_ID,
        }
        const response = await request.post("/b3b7de60-cf7f-11eb-825e-f95fd9be3d8a/routing/group/one/62b9f1732a837a3088666f63/primaries").set(headers).send(body);
        assert.equal(response.status, 404);
        assert.equal(response.body.success, false);
        const errorMessage = JSON.parse(response.text);
        const { code, reason } = errorMessage.error || null;
        if (code) {
            assert.equal(code, 1020);
            assert.equal(reason, "Virtual Number does not exist");
        }
    });
});

describe("DELETE /:organisationId/routing/group/one/:priorityRoutingGroupId/primaries/:number", () => {
    //TODO no need to send body working as expected without the body 
    const body = {
        "status": constants.DEASSIGN_STATUS,
    }
    // success case
    it("DeAssign VMN for a priority routing group", async () => {
        const response = await request.delete("/b3b7de60-cf7f-11eb-825e-f95fd9be3d8a/routing/group/one/62b9f1732a837a3088666f62/primaries/62b5b8735bac757e2bab8891").set(headers).send(body);
        assert.equal(response.status, 200);
        assert.equal(response.body.success, true);
    });
    // TODO add a case for the invalid orgId

    // Invalid Priority Routing GroupId
    it("Deassign VMN from an Invalid group id it should throw 1019 error code ", async () => {
        const response = await request.delete("/b3b7de60-cf7f-11eb-825e-f95fd9be3d8a/routing/group/one/62b9f1732a837a3088666f63/primaries/62b5b8735bac757e2bab8891").set(headers).send(body);
        assert.equal(response.status, 404);
        assert.equal(response.body.success, false);
        const errorMessage = JSON.parse(response.text);
        const { code, reason } = errorMessage.error || null;
        if (code) {
            assert.equal(code, 1019);
            assert.equal(reason, "Group does not exist");
        }
    });

    // Invalid Virtual MObile No Id 
    it("Deassign VMN from an priority group with invalid vmn id it should throw 1020 error code ", async () => {
        const response = await request.delete("/b3b7de60-cf7f-11eb-825e-f95fd9be3d8a/routing/group/one/62b9f1732a837a3088666f63/primaries/62b5b8735bac757e2bab8891").set(headers).send(body);
        assert.equal(response.status, 404);
        assert.equal(response.body.success, false);
        const errorMessage = JSON.parse(response.text);
        const { code, reason } = errorMessage.error || null;
        if (code) {
            assert.equal(code, 1020);
            assert.equal(reason, "Virtual Number does not exist");
        }
    });
    // Deassign an vmn from an group which is not yet assigned
    it("Deassign an vmn from an group which is not yet assigned it should throw 1021 error code ", async () => {
        const response = await request.delete("/b3b7de60-cf7f-11eb-825e-f95fd9be3d8a/routing/group/one/62b9f1732a837a3088666f63/primaries/62b5b8735bac757e2bab8891").set(headers).send(body);
        assert.equal(response.status, 404);
        assert.equal(response.body.success, false);
        const errorMessage = JSON.parse(response.text);
        const { code, reason } = errorMessage.error || null;
        if (code) {
            assert.equal(code, 1021);
            assert.equal(reason, "Virtual Number is not assigned");
        }
    });

});

describe("PUT /:organisationId/routing/group/one/:priorityRoutingGroupId", () => { 
    const bodyForUpdatingNameAndDescription = {
        "description": "Some Updated description",
        "name": "some updated name for the group",
    }
    const bodyForUpdatingMembersOfGroup = {
        "members": ["7780457983415446"],
    };
    // success case for updating the name and description of the group
    it("Update the priority routing group name and description", async () => {
        const response = await request.put("/b3b7de60-cf7f-11eb-825e-f95fd9be3d8a/routing/group/one/62b9f1732a837a3088666f62").set(headers).send(bodyForUpdatingNameAndDescription);
        assert.equal(response.status, 200);
        assert.equal(response.body.success, true);
    });
    // success case for updating the members of the group
    it("Update the priority routing members", async () => {
        const response = await request.put("/b3b7de60-cf7f-11eb-825e-f95fd9be3d8a/routing/group/one/62b9f1732a837a3088666f62").set(headers).send(bodyForUpdatingMembersOfGroup);
        assert.equal(response.status, 200);
        assert.equal(response.body.success, true);
    });
    // TODO add a case for the invalid orgId

    // Invalid Priority Routing GroupId
    it("update group with Invalid group id it should throw 1019 error code ", async () => {
        const response = await request.put("/b3b7de60-cf7f-11eb-825e-f95fd9be3d8a/routing/group/one/62b9f1732a837a3088666f63/primaries/62b5b8735bac757e2bab8891").set(headers).send(body);
        assert.equal(response.status, 404);
        assert.equal(response.body.success, false);
        const errorMessage = JSON.parse(response.text);
        const { code, reason } = errorMessage.error || null;
        if (code) {
            assert.equal(code, 1019);
            assert.equal(reason, "Group does not exist");
        }
    });
});

