class DashboardController {
  getAll = (req, res) => {
    return res.json('dashboard').status(200)
  };
}

export default DashboardController;
