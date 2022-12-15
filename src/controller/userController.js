const { user } = require("../entity/user");
const sequelize = require("../../db");

const addEntry = async (req, res) => {
  try {
    const resp = await user.bulkCreate(req.body);
    res.status(200).json({
      response: resp,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      response: "unable to upload data",
    });
  }
};

//delete reocrd of matched date

const deleteUser = async (req, res) => {
  try {
    //formate date
    const date = new Date();

    const formateDate = `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()}`;

    console.log(formateDate);

    await user.destroy({
      where: {
        expiry: formateDate,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      response: error,
      message: "unable to delete record",
    });
  }
};

module.exports = { addEntry, deleteUser };
