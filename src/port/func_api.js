const Professional = require("../application/func_service");
const Utils = require("../utils/utils");

const route = "/func";

module.exports = (app) => {
  app.post(`${route}/create`, async (req, res) => {
    const response = await Professional.create(req.body);
    res.status(Utils.responseStatus(response.name));
    res.json(response);
  });
  app.put(`${route}/update`, async (req, res) => {
    const response = await Professional.update(req.body);
    res.status(Utils.responseStatus(response.name));
    res.json(response);
  });
  app.get(`${route}/list`, async (req, res) => {
    const response = await Professional.list();
    res.status(Utils.responseStatus(response.name));
    res.json(response);
  });
  app.patch(`${route}/listFunc`, async (req, res) => {
    const response = await Professional.listByEmail(req.body);
    res.status(Utils.responseStatus(response.name));
    res.json(response);
  });
  app.delete(`${route}/delete/:email`, async (req, res) => {
    const data = req.body;
    const { email } = req.params;
    data.email = email;
    const response = await Professional.delete(data);
    res.status(Utils.responseStatus(response.name));
    res.json(response);
  });
  app.post(`${route}/login`, async (req, res) => {
    const data = req.body;

    const response = await Professional.login(data);

    res.cookie("Token", response);
    res.sendStatus(200);
  });
};
