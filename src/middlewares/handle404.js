const handle404 = (req, res) => {
  res.status(404).send({ status: "error", message: "Not found" });
};

module.exports = handle404;
