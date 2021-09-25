const midtransClient = require("midtrans-client");
const { Transaction } = require("../models");
const snap = require("../utils/snap");
class UserPremium {
  static register = async (req, res, next) => {
    try {
      let params = req.parameters;
      params = params
        .permit({ user: ["full_name", "email", "phone"] }, "price")
        .value();
      const { price, user } = params;
      const transaction = await Transaction.create({ user_id: user.id });
      let parameter = {
        transaction_details: {
          order_id: transaction.id,
          gross_amount: price,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: user.full_name,
          last_name: user.full_name,
          email: user.email,
          phone: user.phone,
        },
      };
      snap
        .createTransaction(parameter)
        .then((transaction) => {
          // transaction token
          const transactionToken = transaction.token;
          const redirect_url = transaction.redirect_url;
          res.status(201).json({ transactionToken, redirect_url });
        })
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = UserPremium;
