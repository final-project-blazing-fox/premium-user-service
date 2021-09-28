const midtransClient = require("midtrans-client");
const snap = require("../utils/snap");
const { Transaction } = require("../models");
const axios = require("axios");
class UserPremium {
  static register = async (req, res, next) => {
    try {
      let params = req.parameters;
      params = params
        .permit({ user: ["id", "full_name", "email", "phone"] }, "price")
        .value();
      const { price, user } = params;
      const transaction = await Transaction.create({ user_id: user.id });
      // Create Snap API instance
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
  static updatePayment = async (req, res, next) => {
    try {
      let params = req.parameters;
      params = params
        .permit("payment_type", "bank", "order_id", "channel_response_message")
        .value();
      const { payment_type, bank, order_id, channel_response_message } = params;
      const transaction = await Transaction.findByPk(order_id);
      if (transaction && channel_response_message == "Approved") {
        transaction.status = "completed";
        transaction.payment_method = `${payment_type}_${bank}`;
        await transaction.save();
        await axios({
          url: `${process.env.URL_USER}/user/${transaction.user_id}/upgrade`,
          method: "patch",
          headers: {
            "Content-Type": "application/json",
            access_token: process.env.TOKEN_ADMIN,
          },
        })
          .then(({ data }) => {
            res.status(200).json(data);
          })
          .catch((err) => {
            next(err);
          });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

module.exports = UserPremium;
