# json-to-bubble-object

Convert a JSON object to a Bubble object for plugin purposes. (Bubble.is)
<br>
<br>This module relates to the following topic:
<br>https://forum.bubble.io/t/output-an-object-for-server-side-client-side/59419


### Installing
<b>Step 1.</b>
<br>You need to install the following module:

```
npm i json-to-bubble-object
```

<br>
<b>Step 2.</b>
<br>Add the convert function from the installed module:


```javascript
const {convert} = require('json-to-bubble-object');
```

<br>
<b>Step 3.</b>
<br>Now, you can convert any JSON object into a Bubble object.
<br>That may help to avoid manual preparation of a large and complex object.
<br>For example, let's use the following JSON:
<br>

```javascript
let obj = {
    "status": "success",
    "locale": "tr",
    "systemTime": 1470731191116,
    "conversationId": "123456789",
    "price": 1,
    "paidPrice": 1.2,
    "installment": 1,
    "paymentId": "26143",
    "fraudStatus": 1,
    "merchantCommissionRate": 20,
    "merchantCommissionRateAmount": 0.2,
    "iyziCommissionRateAmount": 0.0354,
    "iyziCommissionFee": 0.25,
    "cardType": "CREDIT_CARD",
    "cardAssociation": "MASTER_CARD",
    "cardFamily": "Cardfinans",
    "cardToken": "123",
    "cardUserKey": "123'",
    "binNumber": "531157",
    "basketId": "B67832",
    "currency": "TRY",
    "itemTransactions": [
        {
            "itemId": "BI101",
            "paymentTransactionId": "38226",
            "transactionStatus": 2,
            "price": 0.3,
            "paidPrice": 0.36,
            "merchantCommissionRate": 20,
            "merchantCommissionRateAmount": 0.06,
            "iyziCommissionRateAmount": 0.01062,
            "iyziCommissionFee": 0.075,
            "blockageRate": 10,
            "blockageRateAmountMerchant": 0.036,
            "blockageRateAmountSubMerchant": 0,
            "blockageResolvedDate": "2016-08-16 11:25:58",
            "subMerchantPrice": 0,
            "subMerchantPayoutRate": 0,
            "subMerchantPayoutAmount": 0,
            "merchantPayoutAmount": 0.23838,
            "convertedPayout": {
                "paidPrice": 0.36,
                "iyziCommissionRateAmount": 0.01062,
                "iyziCommissionFee": 0.075,
                "blockageRateAmountMerchant": 0.036,
                "blockageRateAmountSubMerchant": 0,
                "subMerchantPayoutAmount": 0,
                "merchantPayoutAmount": 0.23838,
                "iyziConversionRate": 0,
                "iyziConversionRateAmount": 0,
                "currency": "TRY"
            }
        }
    ],
    "token": "123",
    "callbackUrl": "https://www.merchant.com/callback",
    "paymentStatus": "SUCCESS",
    "test": {
        "a": 1,
        "b": 2,
        "c": {
            "c1": 1,
            "c2": 1,
            "c3": {
                "c31": 1,
                "c32": 2
            }
        }
    }
};
```

<br>
<b>Step 4.</b>
<br>Let's output the converted object:
<br>

```javascript
console.log(JSON.stringify(convert(obj)));
```

<br>
<b>Output:</b>
<br>

```json
{
  "_p_status": "success",
  "_p_locale": "tr",
  "_p_systemTime": 1470731191116,
  "_p_conversationId": "123456789",
  "_p_price": 1,
  "_p_paidPrice": 1.2,
  "_p_installment": 1,
  "_p_paymentId": "26143",
  "_p_fraudStatus": 1,
  "_p_merchantCommissionRate": 20,
  "_p_merchantCommissionRateAmount": 0.2,
  "_p_iyziCommissionRateAmount": 0.0354,
  "_p_iyziCommissionFee": 0.25,
  "_p_cardType": "CREDIT_CARD",
  "_p_cardAssociation": "MASTER_CARD",
  "_p_cardFamily": "Cardfinans",
  "_p_cardToken": "123",
  "_p_cardUserKey": "123'",
  "_p_binNumber": "531157",
  "_p_basketId": "B67832",
  "_p_currency": "TRY",
  "_p_itemTransactions": [
    {
      "_p_itemId": "BI101",
      "_p_paymentTransactionId": "38226",
      "_p_transactionStatus": 2,
      "_p_price": 0.3,
      "_p_paidPrice": 0.36,
      "_p_merchantCommissionRate": 20,
      "_p_merchantCommissionRateAmount": 0.06,
      "_p_iyziCommissionRateAmount": 0.01062,
      "_p_iyziCommissionFee": 0.075,
      "_p_blockageRate": 10,
      "_p_blockageRateAmountMerchant": 0.036,
      "_p_blockageResolvedDate": "2016-08-16 11:25:58",
      "_p_merchantPayoutAmount": 0.23838,
      "_p_convertedPayout.paidPrice": 0.36,
      "_p_convertedPayout.iyziCommissionRateAmount": 0.01062,
      "_p_convertedPayout.iyziCommissionFee": 0.075,
      "_p_convertedPayout.blockageRateAmountMerchant": 0.036,
      "_p_convertedPayout.merchantPayoutAmount": 0.23838,
      "_p_convertedPayout.currency": "TRY"
    }
  ],
  "_p_token": "123",
  "_p_callbackUrl": "https://www.merchant.com/callback",
  "_p_paymentStatus": "SUCCESS",
  "_p_test.a": 1,
  "_p_test.b": 2,
  "_p_test.c.c1": 1,
  "_p_test.c.c2": 1,
  "_p_test.c.c3.c31": 1,
  "_p_test.c.c3.c32": 2
}
```