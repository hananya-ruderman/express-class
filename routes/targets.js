import express from "express"
import { getSpesificDetailsById, getTarget, getTargets, getWithHeaders, getTargetsWithParams, postTargets, searchTarget } from "../controlers/targets.js"


const ruoter = express.Router()


ruoter.route("/")
    .get(getWithHeaders, getTargetsWithParams, getTargets)
    .post(postTargets)

ruoter.route("/:id")
    .get(getTarget)

ruoter.route("/intel/ping")
    .get(getTargetsWithParams, getTargets)

ruoter.route("/:id/brief")
    .get(getSpesificDetailsById)

ruoter.route("/search/:params")
    .get(searchTarget)

export default ruoter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   