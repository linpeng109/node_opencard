/**
 * Created by Mars on 2016/9/9.
 *
 */
module.exports = function (mongoose) {
    var tradeSchema = mongoose.Schema({
        /**
         * 1、交易相关
         */
        //交易码，例"100012"
        transCode: String,

        //交易名称，例"微信_主扫支付"
        transName: String,

        //交易流水号，例"005538"
        traceNo: String,

        //交易状态，例"USERPAYING"
        trade_state: String,

        //交易状态描述（标识交易不成功时的状态描述），例"等待用户输入密码"
        trade_state_desc: String,

        //交易日期，例"20160908"
        transDate: String,

        //交易时间，例"231117"
        transTime: String,

        //交易根类型（1：支付；2：对卷；3：其他，*清结算用*），例"1"
        rootTransType: String,

        //交易类型（01：主扫；02：被扫；03：撤销；04：退款），例"01"
        transType: String,

        //交易批次号，例"000279"
        batchNo: String,

        //交易参考号（本交易POSP上的交易流水号），例"231117195851"
        refNum: String,

        //交易终端号，例"61879702"
        termCode: String,

        /**
         * 2、商户相关
         */
        //商户uuid（业务系统关联主键），例"ff80808151f5906a0151f677c8b60134"
        merch_uuid: String,

        //商户号（POs），例"459603000589622"
        merchCode: String,

        //商户名称，例"宽达餐饮娱乐有限公司"
        merchName: String,

        //门店id（关联业务系统门店组件），例"ff80808151f5906a0151f679596f0147"
        shopCode: String,

        //门店名称，例"成都宽达餐饮娱乐有限公司"
        shopName: String,


        /**
         * 3、渠道相关
         */
        //渠道号（支付类型），例"03"
        issType: String,

        //子渠道号（区别同一交易渠道的不同划分：微信-连心付；微信-众联等，*清结算用*），例"11"
        channelId: String,

        //4、金额相关
        //订单号，例"7147334747761825549"
        order_no: String,

        //实际支付金额，例65700（单位：分）
        total_fee: {type: Number},

        //订单总金额，例65700（单位：分）
        order_fee: {type: Number},

        //有效标识，例0（0表示有效的，1表示已经退款、撤销、冲正）
        validFlag: Number,

        /**
         * 5、关联交易相关
         */
        //原交易名称
        origTransName: String,

        //原交易时间
        origTransTime: String,

        //原交易终端号
        origTermCode: String,

        //原交易门店的ID（跨门店退款）
        origShopCode: String,

        //原门店名称
        origShopName: String,

        //原交易批次号（和终端绑定，用于识别终端的交易流水，流水号可能重复，故加交易批次号）
        origBatchNo: String,

        //原交易参考号（原交易POSP的交易流水号）
        origRefNum: String,

        //原交易码（退款撤销时，指定原交易）
        origTransCode: String,

        //原交易流水号
        origTraceNo: String,

        //原交易日期（退款撤销时，指定原交易）
        origTransDate: String
    });

    var Trade = mongoose.module('Trade', tradeSchema);

    return {
        Trade: Trade
    }
}