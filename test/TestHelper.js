import supertest from "supertest";
import { assert } from "chai";

const request = supertest("http://localhost:14004/v1/internal/b/organisations");

export { request, assert };